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

function Chercheur() {
  const [persos, setPersos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [eventNameFilter, setEventNameFilter] = useState("");
  const [sortType, setSortType] = useState("ascending"); // Par défaut, tri croissant
  const [etablissementFilter, setEtablissementFilter] = useState("");
  const [etablissements, setEtablissements] = useState([]);
  const [personnelTypeFilter, setPersonnelTypeFilter] = useState("Tous");

  useEffect(() => {
    axios.get(`http://localhost:3001/etablissement`).then((res) => {
      setEtablissements(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/perso`).then((res) => {
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

    return (
      perso.username.toLowerCase().includes(eventNameFilter.toLowerCase()) &&
      etablissementNames.some((name) =>
        name.includes(etablissementFilter.toLowerCase())
      ) &&
      (personnelTypeFilter === "Tous" || perso.Type_personnels.some(type => type.type === personnelTypeFilter))
    
    );
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
    setEventNameFilter(event.target.value);
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

  const maxPageButtons = 3; // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }
  
  return (
    <div className="body">
      <header>header</header>
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
                value={eventNameFilter}
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
          <h1 className="mainTitle">Personnels</h1>
          <EventGrid>
            {currentPageContent.map((value, key) => {
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
                    phone={value.phone ? value.phone : "Pas indiqué"}
                    address={etablissementNames.join(", ")} // Join establishment names with commas
                    imageData={value.imageData}
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
        </main>
        <aside className="right">
          <ScrollButton />
          <CarteButton />
        </aside>
      </div>
       <footer><Footer/></footer> 
    </div>
  );
}

export default Chercheur;
