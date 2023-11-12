import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "../components/Footer";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import CarteStage from "../components/CarteStage";
import { InputSection, Input, StyledSelect } from "../styles/Agenda";
import { FaSearch } from "react-icons/fa";
import { HeaderContent, HeaderLinkStyle } from "../styles/Header.style";


const StageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;
`;

const StageCardContainer = styled.div`
  width: 100%;
  max-width: 500px; /* Limit the card width for smaller screens */
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
  height: 800px; /* Modify the height as needed */
  margin-bottom: 100px;
`;

const ReinitialiserButton = styled.button`
  margin-top: 30px;
`;

function StageEtEmploi() {
  const [stages, setStages] = useState([]);
  const [emplois, setEmplois] = useState([]);
  const [currentPageStage, setCurrentPageStage] = useState(1);
  const [currentPageEmploi, setCurrentPageEmploi] = useState(1);
  const [stageFilter, setStageFilter] = useState("");
  const [emploiFilter, setEmploiFilter] = useState("");

  useEffect(() => {
    axios.get(`https://back.r3mob.fr/stages`).then((res) => {
      setStages(res.data);
    });
    axios.get(`https://back.r3mob.fr/emplois`).then((res) => {
      setEmplois(res.data);
    });
  }, []);

  const filteredStages = stages.filter((stage) =>
  stage.description.toLowerCase().includes(stageFilter.trim().toLowerCase())
);

const filteredEmplois = emplois.filter((emploi) =>
  emploi.description.toLowerCase().includes(emploiFilter.trim().toLowerCase())
);

  const cardPerPage = 2;
  const totalPages = Math.ceil(stages.length / cardPerPage);

  const maxPageButtons = 3; // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxPageButtons / 2);

  /*Pages pour les stages*/
  const indexOfLastStage = currentPageStage * cardPerPage;
  const indexOfFirstStage = indexOfLastStage - cardPerPage;
  const currentStages = filteredStages.slice(indexOfFirstStage, indexOfLastStage);

  let startPageStage = Math.max(currentPageStage - halfMaxButtons, 1);
  let endPageStage = Math.min(startPageStage + maxPageButtons - 1, totalPages);

  if (endPageStage - startPageStage + 1 < maxPageButtons) {
    startPageStage = Math.max(endPageStage - maxPageButtons + 1, 1);
  }
  /*Pages pour les emplois*/
  const totalPagesEmploi = Math.ceil(emplois.length / cardPerPage);

  const indexOfLastEmploi = currentPageEmploi * cardPerPage;
  const indexOfFirstEmploi = indexOfLastEmploi - cardPerPage;
  const currentEmploi = filteredEmplois.slice(indexOfFirstEmploi, indexOfLastEmploi);

  let startPageEmploi = Math.max(currentPageEmploi - halfMaxButtons, 1);
  let endPageEmploi = Math.min(
    startPageEmploi + maxPageButtons - 1,
    totalPagesEmploi
  );

  if (endPageEmploi - startPageEmploi + 1 < maxPageButtons) {
    startPageEmploi = Math.max(endPageEmploi - maxPageButtons + 1, 1);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPageStage(pageNumber);
  };
  const handlePageClickEmploi = (pageNumber) => {
    setCurrentPageEmploi(pageNumber);
  };
  const handleStageFilterChange = (event) => {
    setStageFilter(event.target.value);
  };

  const handleEmploiFilterChange = (event) => {
    setEmploiFilter(event.target.value);
  };
  const handleResetFiltersStages = () => {
    setStageFilter("");
    setCurrentPageStage(1);
  };
  const handleResetFiltersEmplois = () => {
    setEmploiFilter("");
    setCurrentPageEmploi(1);
  };

  return (
    <div className="body">
      <header>
      <HeaderContent>
        <HeaderLinkStyle href="\">{"> "}Accueil</HeaderLinkStyle>
        <HeaderLinkStyle >{"> "} Stage & emploi</HeaderLinkStyle>
      </HeaderContent>
      </header>
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
                placeholder="Recherche par description"
                value={stageFilter}
                onChange={handleStageFilterChange} // Gestionnaire de changement pour les stages
              />
            </div>
          </InputSection>
          <ReinitialiserButton onClick={handleStageFilterChange}>
            Réinitialiser les filtres
          </ReinitialiserButton>
          <p
            style={{
              color: "gray",
              fontSize: "16px",
              marginTop: "850px",
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
                placeholder="Recherche par description"
                value={emploiFilter}
                onChange={handleEmploiFilterChange} // Gestionnaire de changement pour les emplois
              />
            </div>
          </InputSection>
          <ReinitialiserButton onClick={handleEmploiFilterChange}>
            Réinitialiser les filtres
          </ReinitialiserButton>
        </aside>
        <main id="stages">
          <h1 className="mainTitle">Stages</h1>
          {currentStages.length != 0 ? (
            <StageGrid>
              {currentStages.map((value, key) => {
                return (
                  <StageCardContainer key={key}>
                    <CarteStage
                      id={value.id}
                      title={value.description}
                      disponible={value.disponible}
                      imageUrl="stages.png"
                      fallbackUrl="../default_user.png"
                      disponibilite={value.disponible}
                    />
                    
                  </StageCardContainer>
                );
              })}
              
            </StageGrid>
          ) : (
            <p>Aucun stage trouvé</p>
          )}
          <div>
            {/* Display first page */}
            {startPageStage > 1 && (
              <button
                className="indexPageBtn"
                onClick={() => handlePageClick(1)}
              >
                1
              </button>
            )}

            {/* Display ellipsis if needed */}
            {startPageStage > 2 && <span className="ellipsis">...</span>}

            {/* Display page buttons within the range */}
            {Array.from(
              { length: endPageStage - startPageStage + 1 },
              (_, index) => (
                <button
                  className={`indexPageBtn ${
                    startPageStage + index === currentPageStage ? "active" : ""
                  }`}
                  key={startPageStage + index}
                  onClick={() => handlePageClick(startPageStage + index)}
                >
                  {startPageStage + index}
                </button>
              )
            )}

            {/* Display ellipsis if needed */}
            {endPageStage < totalPages - 1 && (
              <span className="ellipsis">...</span>
            )}

            {/* Display last page */}
            {endPageStage < totalPages && (
              <button
                className="indexPageBtn"
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>
          <h1 className="mainTitle">Emplois</h1>
          {currentEmploi.length != 0 ? (
            <StageGrid>
              {currentEmploi.map((value, key) => {
                console.log(value);
                return (
                  <StageCardContainer key={key}>
                    <CarteStage
                      id={value.id}
                      title={value.description}
                      imageUrl="emploi.jpg"
                      fallbackUrl="../default_user.png"
                    />
                  </StageCardContainer>
                );
              })}
            </StageGrid>
          ) : (
            <p>Aucun emploi trouvé</p>
          )}
          <div>
            {/* Display first page */}
            {startPageEmploi > 1 && (
              <button
                className="indexPageBtn"
                onClick={() => handlePageClickEmploi(1)}
              >
                1
              </button>
            )}

            {/* Display ellipsis if needed */}
            {startPageEmploi > 2 && <span className="ellipsis">...</span>}

            {/* Display page buttons within the range */}
            {Array.from(
              { length: endPageEmploi - startPageEmploi + 1 },
              (_, index) => (
                <button
                  className={`indexPageBtn ${
                    startPageEmploi + index === currentPageEmploi ? "active" : ""
                  }`}
                  key={startPageEmploi + index}
                  onClick={() => handlePageClickEmploi(startPageEmploi + index)}
                >
                  {startPageEmploi + index}
                </button>
              )
            )}

            {/* Display ellipsis if needed */}
            {endPageEmploi < totalPagesEmploi - 1 && (
              <span className="ellipsis">...</span>
            )}

            {/* Display last page */}
            {endPageEmploi < totalPagesEmploi && (
              <button
                className="indexPageBtn"
                onClick={() => handlePageClickEmploi(totalPagesEmploi)}
              >
                {totalPagesEmploi}
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
  );
}

export default StageEtEmploi;
