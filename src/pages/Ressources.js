import CartePublication from "../components/CartePublication";

import React, { useState, useEffect,useContext } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import styled, { css } from "styled-components";import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import Thematiques from "../components/Thematiques";
import Colors from "../styles/Colors";
import CreatePubPopup from "../components/CreatePubPopup";
import Footer from "../components/Footer";
import { AuthContext } from "../helpers/AuthContext";

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  padding-right: 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  @media (max-width: 990px) {
    font-size: 12px;
  }
`;

export const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  margin-top: 20px;
  background-color: white;
  color: gray;
  @media (max-width: 990px) {
    font-size: 12px;
  }

  ${(props) =>
    props.isMobile &&
    css`
      width: 70%; 
      font-size: 10px; 
    `}
`;

const PublicationGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px ;
  justify-content: center;
  padding-top: 15px;
`;

const PublicationCardContainer = styled.div`
  width: 500px;
`;

const HorizontalLine = styled.hr`
  background-color: lightgray;
  border: 0;
  width: 100px;
  margin-right: 10px;
`;

const VideoContainer = styled.div`
  align-items: center;
  width: 100%;
  height: 700px; 
  margin-bottom: 100px;
  @media (max-width: 1700px) {
    height: 600px;
  }
  @media (max-width: 1224px) {
    height: 400px;
  }
  @media (max-width: 950px) {
    height: 300px;
  }
  @media (max-width: 990px) {
    height: 400px;
  }
`;
const SelectOption = styled.option`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 5px;

  @media (max-width: 950px) {
    font-size: 0.6rem;

  }
  @media (max-width: 990px) {
    font-size: 0.6rem;
  }
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

export const Button = styled.button`
  background-color: ${Colors.color2};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    background-color: ${Colors.color1};
  }
`;

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: 20px;
`;

function Ressources() {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Ajoutez des états pour les filtres
  const [publicationTitleFilter, setPublicationTitleFilter] = useState("");
  const [ResearcherFilter, setResearcherFilter] = useState("");
  const [thematiqueFilter, setThematiqueFilter] = useState("");
  const [sousThematiqueFilter, setSousThematiqueFilter] = useState("");
  // pour la liste des Thematiques dans la liste déroulante
  const [allSousThematiques, setAllSousThematiques] = useState([]);
  // pour la liste des sous Thematiques dans la liste déroulante
  const [sousThematiquesSelectFilter, setSousThematiquesSelectFilter] =
    useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [shouldReloadPage, setShouldReloadPage] = useState(false);
  const { authState } = useContext(AuthContext);



  const currentHash = window.location.hash;
  useEffect(() => {
    if (currentHash === "#videos") {
      // Si l'ancre est "#videos", faites défiler jusqu'à la section "videos"
      const videosSection = document.getElementById("videos");
      if (videosSection) {
        videosSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentHash === "#publications") {
      // Si l'ancre est "#publications", faites défiler jusqu'à la section "publications"
      const publicationsSection = document.getElementById("publications");
      if (publicationsSection) {
        publicationsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentHash]);
  useEffect(() => {
    axios.get(`http://localhost:3001/sousThematique`).then((res) => {
      setAllSousThematiques(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/publication`).then((res) => {
      setPublications(res.data);
    });

  }, [shouldReloadPage]);

  const filteredPublications = publications
    .filter((publication) => {
      const publicationTitleMatches = publication.nom
        .toLowerCase()
        .includes(publicationTitleFilter.toLowerCase());
      return publicationTitleMatches;
    })
    .filter((publication) =>
      publication.chercheurs.some((chercheur) => {
        const chercheurNames = chercheur.split(" "); // Split the full name into parts
        const filterValue = ResearcherFilter.toLowerCase();

        // Check if any part of the name starts with the filter value
        return chercheurNames.some((part) =>
          part.toLowerCase().startsWith(filterValue)
        );
      })
    )
    .filter((publication) => {
      if (thematiqueFilter === "") {
        return true; // No filter, show all publications
      }

      // Check if the publication's thematiques include the selected thematique
      return publication.Thematique_publications.some(
        (thematiquePublication) => {
          const thematiqueNom =
            thematiquePublication.SousThematique?.Thematique?.nom || "";
          return thematiqueNom.toLowerCase() === thematiqueFilter.toLowerCase();
        }
      );
    })
    .filter((publication) => {
      if (sousThematiqueFilter === "") {
        return true; // Pas de filtre, afficher tous les projets
      }

      // Filtrage par sous-thématique
      return publication.Thematique_publications.some((thematiqueProjet) => {
        const sousThematiqueNom = thematiqueProjet.SousThematique?.nom || "";
        return (
          sousThematiqueNom.toLowerCase() === sousThematiqueFilter.toLowerCase()
        );
      });
    });

  const eventsPerPage = 6;
  const totalPages = Math.ceil(filteredPublications.length / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredPublications.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fonctions pour gérer les changements de filtres
  const handlePublicationTitleFilterChange = (title) => {
    setPublicationTitleFilter(title.target.value);
    setCurrentPage(1);
  };

  const handleResearcherNameFilterChange = (chercheur) => {
    setResearcherFilter(chercheur.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setPublicationTitleFilter("");
    setResearcherFilter("");
    setThematiqueFilter("");
    setSousThematiquesSelectFilter([]);
    setSousThematiqueFilter("");
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
  const handleCloseCreatePopup = () => {
    setShowCreatePopup(false);
  };
  const handleCreateCustomPublication = async (createdEvent) => {
    setShowCreatePopup(false);
    try {
      setShouldReloadPage(!shouldReloadPage);
    } catch (error) {
      console.error(error);
    }
  };

  const reload = () => {
    setShouldReloadPage(!shouldReloadPage);
  };

  const maxPageButtons = 3; // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  const videoUrl = "https://www.youtube.com/watch?v=R-YPZiCC-b0";
  const videoId = videoUrl.match(
    /(?:\?v=|\/embed\/|\/vi\/|\/e\/|\/v\/|\/watch\?v=|\/watch\?feature=player_embedded&v=|\/embed\?feature=player_embedded&v=)([^#\&\?]*).*/
  )[1];

  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">
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
              />
              <Input
                type="text"
                value={publicationTitleFilter}
                onChange={handlePublicationTitleFilterChange}
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
                value={ResearcherFilter}
                onChange={handleResearcherNameFilterChange}
                placeholder="Recherche par chercheur"
              />
            </div>
          </InputSection>
          <StyledSelect
            value={thematiqueFilter}
            onChange={(e) => handleThematiqueFilterChange(e.target.value)}
          >
            <SelectOption value="">Toutes les thematiques</SelectOption>
            {Thematiques.map((thematique, index) => (
              <SelectOption key={index} value={thematique.nom}>
                {thematique.nom}
              </SelectOption>
            ))}
          </StyledSelect>
          <StyledSelect
            value={sousThematiqueFilter}
            onChange={(e) => handleSousThematiqueFilterChange(e.target.value)}
          >
            <SelectOption value="">Toutes les sous-thématiques</SelectOption>
            {sousThematiquesSelectFilter.map((sousThematique) => (
              <SelectOption key={sousThematique.id} value={sousThematique.nom}>
                {sousThematique.nom}
              </SelectOption>
            ))}
          </StyledSelect>
          <ReinitialiserButton onClick={handleResetFilters}>
            Réinitialiser les filtres
          </ReinitialiserButton>
        </aside>
        <main id="publications">
          {authState.status && (
          <CreateButtonContainer>
          <Button onClick={() =>{
            setShowCreatePopup(true)
          }}>
            Ajouter une publication
          </Button>
          </CreateButtonContainer>
          )}
        {/* <CarteButton /> */}
          {/* Filtres étendus pour les écrans de téléphone */}
          <ExtendedFiltres>
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
                />
                <ExtendedInput
                  type="text"
                  value={publicationTitleFilter}
                  onChange={handlePublicationTitleFilterChange}
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
                <ExtendedInput
                  type="text"
                  value={ResearcherFilter}
                  onChange={handleResearcherNameFilterChange}
                  placeholder="Recherche par chercheur"
                />
              </div>
            </InputSection>
            <StyledSelect
              value={thematiqueFilter}
              onChange={(e) => handleThematiqueFilterChange(e.target.value)}
              isMobile={true} // Appliquez des styles spécifiques aux écrans mobiles
            >
            <SelectOption value="">Toutes les thematiques</SelectOption>
            {Thematiques.map((thematique, index) => (
              <SelectOption key={index} value={thematique.nom}>
                {thematique.nom}
              </SelectOption>
            ))}
          </StyledSelect>
          <StyledSelect
              value={sousThematiqueFilter}
              onChange={(e) => handleSousThematiqueFilterChange(e.target.value)}
              isMobile={true} // Appliquez des styles spécifiques aux écrans mobiles
            >
            <SelectOption value="">Toutes les sous-thématiques</SelectOption>
            {sousThematiquesSelectFilter.map((sousThematique) => (
              <SelectOption key={sousThematique.id} value={sousThematique.nom}>
                {sousThematique.nom}
              </SelectOption>
            ))}
         </StyledSelect>
            <ReinitialiserButton onClick={handleResetFilters}>
              Réinitialiser les filtres
            </ReinitialiserButton>
          </ExtendedFiltres>
          <h1 className="mainTitle">Publications</h1>
          {currentEvents.length != 0 ? (
            <PublicationGrid>
              {currentEvents.map((value, key) => {
                return (
                  <PublicationCardContainer key={key}>
                    <CartePublication
                      id={value.id}
                      url={value.url}
                      title={value.nom}
                      imageUrl={value.imageName}
                      fallbackUrl="mob.jpg"
                      reload={reload}
                      idChercheur={value.chercheurs[0]}
                    />
                    {/* {console.log(value)} */}
                  </PublicationCardContainer>
                );
              })}
            </PublicationGrid>
          ) : (
            <p>Aucune publication ne correspond aux filtres sélectionnés.</p>
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
          <h1 id="videos" className="mainTitle">
            Vidéos
          </h1>
          <VideoContainer>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </VideoContainer>
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
      {showCreatePopup && (
        <CreatePubPopup
          onSave={handleCreateCustomPublication}
          onClose={handleCloseCreatePopup}
        />
      )}
    </div>
  );
}

export default Ressources;
