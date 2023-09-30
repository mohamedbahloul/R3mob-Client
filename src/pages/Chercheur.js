import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import EventCard from "../components/EventCard";
import styled from "styled-components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaFilter } from "react-icons/fa";
import CartePerso from "../components/CartePerso";
import Thematiques from "../components/Thematiques";
import { InputSection, Label, Input, StyledSelect } from "../styles/Agenda";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Navigate } from "react-router-dom";
import { HeaderContent, HeaderLinkStyle } from "../styles/Header.style";


const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  justify-content: center;
  padding-top: 15px;
`;

const EventCardContainer = styled.div`
  width: auto;
`;
const DatePickerContainer = styled.div`
  position: relative;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .react-datepicker__clear-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;
const HorizontalLine = styled.hr`
  background-color: lightgray;
  border: 0cap;

  width: 100px; /* Adjust the width of the horizontal line as needed */
  margin-right: 10px; /* Add some right margin to separate the line from the text */
`;

const ReinitialiserButton = styled.button`
margin-top: 30px;
`;

function Chercheur() {
  const [persos, setPersos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [chercheurNameFilter, setchercheurNameFilter] = useState("");
  const [sortType, setSortType] = useState("ascending"); // Par défaut, tri croissant
  const [etablissementFilter, setEtablissementFilter] = useState("");
  const [etablissements, setEtablissements] = useState([]);
  const [personnelTypeFilter, setPersonnelTypeFilter] = useState("Tous");
  const [comiteTypeFilter, setComiteTypeFilter] = useState("Tous");
  //filtres pour les thematiques et sousThematiques
  const [thematiqueFilter, setThematiqueFilter] = useState("");
  const [sousThematiqueFilter, setSousThematiqueFilter] = useState("");
  // pour la liste des Thematiques dans la liste déroulante
  const [allSousThematiques, setAllSousThematiques] = useState([]);

  // pour la liste des sous Thematiques dans la liste déroulante
  const [sousThematiquesSelectFilter, setSousThematiquesSelectFilter] =
    useState([]);
    const { authState } = useContext(AuthContext);


  useEffect(() => {
    axios.get(`http://back.r3mob.fr/etablissement`).then((res) => {
      setEtablissements(res.data);
      console.log(res.data);
    });
    axios.get(`http://back.r3mob.fr/sousThematique`).then((res) => {
      setAllSousThematiques(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://back.r3mob.fr/perso`).then((res) => {
      setPersos(res.data);
      console.log(res.data);
    });
  }, []);

  const filteredPersos = persos.filter((perso) => {
    const etablissementNames = perso.Chercheur_etabs.map((chercheurEtab) => {
      const etablissement = etablissements.find(
        (etab) => etab.id === chercheurEtab.EtablissementId
      );
      return etablissement ? etablissement.nom.toLowerCase() : "";
    });
  
    // Ajoutez une condition pour inclure les chercheurs sans établissement
    const hasNoEtablissement = etablissementNames.length === 0;
  
    return (
      perso.username
        .toLowerCase()
        .includes(chercheurNameFilter.trim().toLowerCase()) &&
      (hasNoEtablissement || etablissementNames.some((name) =>
        name.trim().includes(etablissementFilter.trim().toLowerCase())
      )) &&
      (personnelTypeFilter === "Tous" ||
        perso.Type_personnels.some((type) => type.type === personnelTypeFilter)) &&
        (comiteTypeFilter === "Tous" ||
      (comiteTypeFilter === "CE" && perso.isComiteExecutif) ||
      (comiteTypeFilter === "CP" && perso.isComitePilotage))
      
    );
  }).filter((chercheur) => {
    if (thematiqueFilter === "") {
      return true; // No filter, show all chercheurs
    }

    // Check if the chercheur has Thematique_chercheurs and then filter by thematique
    if (chercheur.Thematique_chercheurs) {
      return chercheur.Thematique_chercheurs.some(
        (thematiqueChercheur) => {

          const thematiqueNom =
            thematiqueChercheur.SousThematique?.Thematique?.nom || "";
          return thematiqueNom.toLowerCase() === thematiqueFilter.toLowerCase() || thematiqueChercheur.Thematique?.nom.toLowerCase() === thematiqueFilter.toLowerCase();
      }
      );
    }

    return false; // If Thematique_chercheurs is not present, exclude this chercheur
}).filter((chercheur) => {
    if (sousThematiqueFilter === "") {
      return true; // Pas de filtre, afficher tous les projets
    }

    // Filtrage par sous-thématique
    return chercheur.Thematique_chercheurs.some((thematiqueChercheur) => {
      const sousThematiqueNom = thematiqueChercheur.SousThematique?.nom || "";
      return (
        sousThematiqueNom.toLowerCase() === sousThematiqueFilter.toLowerCase()
      );
    });
  });

  const sortedPersos = filteredPersos.sort((a, b) => {
    if (sortType === "ascending") {
      return a.username.localeCompare(b.username);
    } else {
      return b.username.localeCompare(a.username);
    }
  });

  const eventsPerPage = 9;
  const totalPages = Math.ceil(sortedPersos.length / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentPageContent = sortedPersos.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchInputChange = (event) => {
    setchercheurNameFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
    setCurrentPage(1);
  };

  const handleEtablissementFilterChange = (event) => {
    setEtablissementFilter(event.target.value);
    setCurrentPage(1);
  };
  const handlePersonnelTypeFilterChange = (event) => {
    setPersonnelTypeFilter(event.target.value);
    setCurrentPage(1);
  };
  const handleComiteTypeFilterChange = (event) => {
    setComiteTypeFilter(event.target.value);
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

  const handleSousThematiqueFilterChange = (selectedSousThematique) => {
    setSousThematiqueFilter(selectedSousThematique);

    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setchercheurNameFilter("");
    setEtablissementFilter("");
    setPersonnelTypeFilter("Tous");
    setComiteTypeFilter("Tous");
    setThematiqueFilter("");
    setSousThematiquesSelectFilter([]);
    setSousThematiqueFilter("");
    setCurrentPage(1);
  };

  const maxPageButtons = 3; // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  return (

    authState.status==true ? (

    
    <div className="body">
      <header>
      <HeaderContent>
        <HeaderLinkStyle href="\">{"> "}Accueil</HeaderLinkStyle>
        <HeaderLinkStyle href="\annuaires" >{"> "} Annuaire</HeaderLinkStyle>
        <HeaderLinkStyle >{"> "} Acteurs R3MOB</HeaderLinkStyle>
      </HeaderContent>
      </header>
      <div className="main">
        <aside className="left">
          <p
            style={{
              color: "gray",
              fontSize: "16px",
              marginBottom: "25px",
              display: "flex",
              alignItems: "left",
              fontWeight: "bold",
              marginTop: "150px",
            }}
          >
            Filtrer par <HorizontalLine />
          </p>
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
                // Remplacez cela par votre logique de recherche
              />

              <Input
                type="text"
                value={chercheurNameFilter}
                onChange={handleSearchInputChange}
                placeholder="Rechercher par nom"
              />
            </div>
          </InputSection>

          <InputSection>
            <div style={{ position: "relative" }}>
              <FaFilter
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
                onChange={handleEtablissementFilterChange}
                placeholder="Filtrer par établissement"
              />
            </div>
          </InputSection>
          <StyledSelect
            value={personnelTypeFilter}
            onChange={handlePersonnelTypeFilterChange}
          >
            <option value="Tous">Tous</option>
            <option value="C">Enseignant Chercheur</option>
            <option value="D">Directions</option>
            <option value="A">Autres Personnels</option>
          </StyledSelect>
          <StyledSelect
            value={comiteTypeFilter}
            onChange={handleComiteTypeFilterChange}
          >
            <option value="Tous">Tous</option>
            <option value="CE">Comité Exécutif</option>
            <option value="CP">Comité pilotage</option>
          </StyledSelect>
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
          <ReinitialiserButton onClick={handleResetFilters}>Réinitialiser les filtres</ReinitialiserButton>

          <p
            style={{
              color: "gray",
              fontSize: "16px",
              marginTop: "70px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "left",
              fontWeight: "bold",
            }}
          >
            Trier par <HorizontalLine />
          </p>
          <StyledSelect value={sortType} onChange={handleSortChange}>
            <option value="ascending">Nom croissant</option>
            <option value="descending">Nom décroissant</option>
          </StyledSelect>
        </aside>
        <main>
          <h1 className="mainTitle">Acteurs R3MOB</h1>
          {currentPageContent.length != 0 ? (
          <EventGrid>
          
            {currentPageContent.map((value, key) => {
              console.log(value);
              const etablissementNames = value.Chercheur_etabs.map(
                (chercheurEtab) => {
                  const etablissement = etablissements.find(
                    (etab) => etab.id === chercheurEtab.EtablissementId
                  );
                  return etablissement ? etablissement.nom : "Pas indiqué";
                }
              );

              return (
                <EventCardContainer key={key}>
                  <CartePerso
                    id={value.id}
                    name={value.username}
                    email={value.email ? value.email : "Pas indiqué"}
                    // phone={value.phone ? value.phone : "Pas indiqué"}
                    address={etablissementNames.join(", ")} // Join establishment names with commas
                    imageData={value.imageData}
                  />
                </EventCardContainer>
              );
            })}
          </EventGrid>
          ) : (
            <p>Aucun acteur R3MOB ne correspond aux filtres sélectionnés.</p>
          )}

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
          <div className="mobile">
          <CarteButton />
          </div>
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
    ):(
      <Navigate to="/login" />
    )
  );
}

export default Chercheur;
