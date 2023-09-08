import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import styled from "styled-components";
import axios from "axios";
import CarteProjet from "../components/CarteProjet";
import Thematiques from "../components/Thematiques";
import { FaSearch } from "react-icons/fa";
import { InputSection, FilterTitle, Input, StyledSelect } from "../styles/Projet";
import Footer from "../components/Footer";

const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;
  
`;
const HorizontalLine = styled.hr`
  background-color: lightgray;
  border: 0cap;

  width: 100px;
  margin-right: 10px;
`;

const EventCardContainer = styled.div`
  @media (min-width: 2189px) {
    height: auto;
    width: auto;;
  }
  width: 45%;
`;
const ReinitialiserButton = styled.button`
  margin-top: 30px;
`;

const ExtendedFiltres = styled.div`
  /* Ajoutez des styles CSS pour les filtres étendus ici */
  display: none; /* Masquez les filtres par défaut */
  @media (max-width: 990px) {
    /* Affichez les filtres lorsque la largeur de l'écran est inférieure à 866px */
    display: flex;
    flex-direction: column;
  }
`;
const ExtendedInput = styled(Input)`
  width: 100%;
`;
function Projet() {
  /* Déclaration Projets */
  const [etatFilter, setEtatFilter] = useState("");
  const [projets, setProjets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projetTitleFilter, setProjetTitleFilter] = useState("");
  const [etablissementFilter, setEtablissementFilter] = useState("");
  const [thematiqueFilter, setThematiqueFilter] = useState("");
  const [sousThematiqueFilter, setSousThematiqueFilter] = useState("");
  // pour la liste des Thematiques dans la liste déroulante
  const [allSousThematiques, setAllSousThematiques] = useState([]);
  // pour la liste des sous Thematiques dans la liste déroulante
  const [sousThematiquesSelectFilter, setSousThematiquesSelectFilter] =
    useState([]);

  const [allEnjeux, setAllEnjeux] = useState([]);
  const [enjeuxFilter, setEnjeuxFilter] = useState("");
  /*Déclaration AAP */
  const [aap, setAap] = useState([]);

  const currentHash = window.location.hash;
  useEffect(() => {
    if (currentHash === "#projets") {
      // Si l'ancre est "#videos", faites défiler jusqu'à la section "videos"
      const projetsSection = document.getElementById("projets");
      if (projetsSection) {
        projetsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentHash === "#aap") {
      // Si l'ancre est "#publications", faites défiler jusqu'à la section "publications"
      const aapSection = document.getElementById("aap");
      if (aapSection) {
        aapSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentHash]);

  useEffect(() => {
    axios.get(`http://localhost:3001/projet`).then((res) => {
      setProjets(res.data);
    });
    axios.get(`http://localhost:3001/sousThematique`).then((res) => {
      setAllSousThematiques(res.data);
    });
    axios.get(`http://localhost:3001/enjeux`).then((res) => {
      setAllEnjeux(res.data);
    }
    );
  }, []);
  const filteredProjets = projets
    .filter((projet) => {
      const projetTitleMatches = projet.nom
        .toLowerCase()
        .includes(projetTitleFilter.toLowerCase());
      return projetTitleMatches;
    })
    .filter((projet) =>
      projet.etablissements.some((etablissement) => {
        const etablissementNames = etablissement.split(" "); // Split the full name into parts
        const filterValue = etablissementFilter.toLowerCase();

        // Check if any part of the name starts with the filter value
        return etablissementNames.some((part) =>
          part.toLowerCase().startsWith(filterValue)
        );
      })
    )
    .filter((projet) => {
      if (thematiqueFilter === "") {
        return true; // No filter, show all publications
      }

      // Check if the publication's thematiques include the selected thematique
      return projet.Thematique_projets.some((thematiqueProjet) => {
        const thematiqueNom =
          thematiqueProjet.SousThematique?.Thematique?.nom || "";
        return thematiqueNom.toLowerCase() === thematiqueFilter.toLowerCase();
      });
    })
    .filter((projet) => {
      if (sousThematiqueFilter === "") {
        return true; // Pas de filtre, afficher tous les projets
      }

      // Filtrage par sous-thématique
      return projet.Thematique_projets.some((thematiqueProjet) => {
        const sousThematiqueNom = thematiqueProjet.SousThematique?.nom || "";
        return (
          sousThematiqueNom.toLowerCase() === sousThematiqueFilter.toLowerCase()
        );
      });
    }).filter((projet) => {
      if (etatFilter === "") {
        return true; // Pas de filtre, afficher tous les projets
      }

      // Filtrage par état
      return projet.etat === etatFilter;
    }).filter((projet) => {
      if (enjeuxFilter === "") {
        return true; // Pas de filtre, afficher tous les projets
      }

      // Filtrage par enjeux
      return projet.Enjeux_projets.some((enjeuxProjet) => {
        const enjeuxNom = enjeuxProjet.Enjeux?.nom || "";
        return enjeuxNom.toLowerCase() === enjeuxFilter.toLowerCase();
      });
    });


  const projetsPerPage = 6;
  const totalPages = Math.ceil(filteredProjets.length / projetsPerPage);

  const indexOfLastProjet = currentPage * projetsPerPage;
  const indexOfFirstProjet = indexOfLastProjet - projetsPerPage;
  const currentProjets = filteredProjets.slice(
    indexOfFirstProjet,
    indexOfLastProjet
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Fonctions pour gérer les changements de filtres
  const handleProjetTitleFilterChange = (title) => {
    setProjetTitleFilter(title.target.value);
    setCurrentPage(1);
  };

  const handleEtablissementNameFilterChange = (chercheur) => {
    setEtablissementFilter(chercheur.target.value);
    setCurrentPage(1);
  };
  const handleThematiqueFilterChange = (selectedThematique) => {
    setThematiqueFilter(selectedThematique);
    // Filtrer les sous-thématiques en fonction de la thématique sélectionnée
    const sousThematiquesFiltrees = allSousThematiques.filter(
      (sousThematique) => {
        return sousThematique.Thematique.nom === selectedThematique;
      }
    );

    setSousThematiquesSelectFilter(sousThematiquesFiltrees);
    setCurrentPage(1);
  };

  const handleEtatFilterChange = (selectedEtat) => {
    setEtatFilter(selectedEtat);
    setCurrentPage(1);
  };

  const handleSousThematiqueFilterChange = (selectedSousThematique) => {
    setSousThematiqueFilter(selectedSousThematique);

    setCurrentPage(1);
  };
  const handleEnjeuxFilterChange = (selectedEnjeux) => {
    setEnjeuxFilter(selectedEnjeux);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setProjetTitleFilter("");
    setEtablissementFilter("");
    setThematiqueFilter("");
    setEtatFilter("");
    setSousThematiqueFilter("");
    setSousThematiquesSelectFilter([]);
    setEnjeuxFilter("");
    setCurrentPage(1);
  };
  const maxPageButtons = 3; // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  /******************* Partie AAP  */
  useEffect(() => {
    axios.get(`http://localhost:3001/aap`).then((res) => {
      setAap(res.data);
    });
  }, []);

  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">
          <FilterTitle
          >
            Filtrer par <HorizontalLine />
          </FilterTitle>
          <InputSection>
            <div style={{ position: "relative" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <Input
                type="text"
                value={projetTitleFilter}
                onChange={handleProjetTitleFilterChange}
                placeholder="Recherche par titre"
              />
            </div>
          </InputSection>

          <InputSection>
            <div style={{ position: "relative" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <Input
                type="text"
                value={etablissementFilter}
                onChange={handleEtablissementNameFilterChange}
                placeholder="Recherche par établissement"
              />
            </div>
          </InputSection>
          <StyledSelect
            value={thematiqueFilter}
            onChange={(e) => handleThematiqueFilterChange(e.target.value)}
          >
            <option value="">Toutes les thematiques</option>
            {Thematiques.map((thematique, index) => (
              <option key={index} value={thematique.nom}>
                {thematique.nom}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            value={sousThematiqueFilter}
            onChange={(e) => handleSousThematiqueFilterChange(e.target.value)}
          >
            <option value="">Toutes les sous-thématiques</option>
            {sousThematiquesSelectFilter.map((sousThematique) => (
              <option key={sousThematique.id} value={sousThematique.nom}>
                {sousThematique.nom}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            value={enjeuxFilter}
            onChange={(e) => handleEnjeuxFilterChange(e.target.value)}
          >
            <option value="">Tous les Enjeux</option>
            {allEnjeux.map((enjeux, index) => (
              <option key={index} value={enjeux.nom}>
                {enjeux.nom}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            value={etatFilter}
            onChange={(e) => handleEtatFilterChange(e.target.value)}
          >
            <option value="">Tous les projets</option>
            <option value="EC">En cours </option>
            <option value="F">Futur </option>
            <option value="P">Passé </option>
            <option value="A">Non renseigné </option>
          </StyledSelect>

          <ReinitialiserButton onClick={handleResetFilters}>
            Réinitialiser les filtres
          </ReinitialiserButton>
        </aside>
        <main id="projets">
          <ExtendedFiltres>
          <FilterTitle
          >
            Filtrer par <HorizontalLine />
          </FilterTitle>
          <InputSection>
            <div style={{ position: "relative" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <Input
                type="text"
                value={projetTitleFilter}
                onChange={handleProjetTitleFilterChange}
                placeholder="Recherche par titre"
              />
            </div>
          </InputSection>

          <InputSection>
            <div style={{ position: "relative" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <Input
                type="text"
                value={etablissementFilter}
                onChange={handleEtablissementNameFilterChange}
                placeholder="Recherche par établissement"
              />
            </div>
          </InputSection>
          <StyledSelect
            value={thematiqueFilter}
            onChange={(e) => handleThematiqueFilterChange(e.target.value)}
          >
            <option value="">Toutes les thematiques</option>
            {Thematiques.map((thematique, index) => (
              <option key={index} value={thematique.nom}>
                {thematique.nom}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            value={sousThematiqueFilter}
            onChange={(e) => handleSousThematiqueFilterChange(e.target.value)}
          >
            <option value="">Toutes les sous-thématiques</option>
            {sousThematiquesSelectFilter.map((sousThematique) => (
              <option key={sousThematique.id} value={sousThematique.nom}>
                {sousThematique.nom}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            value={enjeuxFilter}
            onChange={(e) => handleEnjeuxFilterChange(e.target.value)}
          >
            <option value="">Tous les Enjeux</option>
            {allEnjeux.map((enjeux, index) => (
              <option key={index} value={enjeux.nom}>
                {enjeux.nom}
              </option>
            ))}
          </StyledSelect>
          <StyledSelect
            value={etatFilter}
            onChange={(e) => handleEtatFilterChange(e.target.value)}
          >
            <option value="">Tous les projets</option>
            <option value="EC">En cours </option>
            <option value="F">Futur </option>
            <option value="P">Passé </option>
            <option value="A">Non renseigné </option>
          </StyledSelect>

          <ReinitialiserButton onClick={handleResetFilters}>
            Réinitialiser les filtres
          </ReinitialiserButton>
          </ExtendedFiltres>
          <h1 className="mainTitle">Projets</h1>
          <EventGrid>
            {currentProjets.map((value, key) => {
              return (
                <EventCardContainer key={key}>
                  <CarteProjet
                    id={value.id}
                    title={value.nom}
                    imageUrl="projet.png"
                    fallbackUrl="../default_user.png"
                    etablissements={value.etablissements}
                    enjeux={value.Enjeux_projets}
                  />
                </EventCardContainer>
              );
            })}
          </EventGrid>

          <div>
            {/* Display first page */}
            {startPage > 1 && (
              <button
                className="indexPageBtn"
                onClick={() => handlePageClick(1)}
              >
                1
              </button>
            )}

            {/* Display ellipsis if needed */}
            {startPage > 2 && <span className="ellipsis">...</span>}

            {/* Display page buttons within the range */}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                className={`indexPageBtn ${
                  startPage + index === currentPage ? "active" : ""
                }`}
                key={startPage + index}
                onClick={() => handlePageClick(startPage + index)}
              >
                {startPage + index}
              </button>
            ))}

            {/* Display ellipsis if needed */}
            {endPage < totalPages - 1 && <span className="ellipsis">...</span>}

            {/* Display last page */}
            {endPage < totalPages && (
              <button
                className="indexPageBtn"
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>

          {/*Appel à projet*/}
          <h1 className="mainTitle" id="aap">
            Appel à projets
          </h1>
          <EventGrid>
            {aap.map((value, key) => {
              return (
                <EventCardContainer key={key}>
                  <CarteProjet
                    id={value.id}
                    title={value.nom}
                    imageUrl="aap.png"
                    fallbackUrl="../default_user.png"
                    etablissements={value.etablissements}
                  />
                </EventCardContainer>
              );
            })}
          </EventGrid>
        </main>
        <aside className="right">
          <ScrollButton />
          <CarteButton />
        </aside>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Projet;
