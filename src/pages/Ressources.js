import CartePublication from "../components/CartePublication";

import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import styled from "styled-components";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import Thematiques from "../components/Thematiques";

import { InputSection, Label, Input, StyledSelect } from "../styles/Agenda";
import Footer from "../components/Footer";

const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;
`;

const EventCardContainer = styled.div`
  width: 500px;
`;

const HorizontalLine = styled.hr`
  background-color: lightgray;
  border: 0cap;

  width: 100px;
  margin-right: 10px;
`;
const VideoContainer = styled.div`
align-items: center;
  width: 100%;
  height: 800px; /* Modifiez la hauteur en fonction de vos besoins */
`;

function Ressources() {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Ajoutez des états pour les filtres
  const [publicationTitleFilter, setPublicationTitleFilter] = useState("");
  const [ResearcherFilter, setResearcherFilter] = useState("");
  const [thematiqueFilter, setThematiqueFilter] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/publication`).then((res) => {
      setPublications(res.data);
    });
  }, []);

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
  const maxPageButtons = 3; // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  const videoUrl = 'https://www.youtube.com/watch?v=R-YPZiCC-b0';
  const videoId = videoUrl.match(/(?:\?v=|\/embed\/|\/vi\/|\/e\/|\/v\/|\/watch\?v=|\/watch\?feature=player_embedded&v=|\/embed\?feature=player_embedded&v=)([^#\&\?]*).*/)[1];

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
            onChange={(e) => setThematiqueFilter(e.target.value)}
          >
            <option value="">Toutes les thematiques</option>
            {Thematiques.map((thematique, index) => (
              <option key={index} value={thematique.nom}>
                {thematique.nom}
              </option>
            ))}
          </StyledSelect>
        </aside>
        <main>
          <h1 className="mainTitle">Publications</h1>
          <EventGrid>
            {currentEvents.map((value, key) => {
              return (
                <EventCardContainer key={key}>
                  <CartePublication
                    id={value.id}
                    title={value.nom}
                    imageUrl="mob.jpg"
                    fallbackUrl="../default_user.png"
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
          <h1 className="mainTitle">Videos</h1>
          <VideoContainer>
          <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
      </VideoContainer>
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

export default Ressources;
