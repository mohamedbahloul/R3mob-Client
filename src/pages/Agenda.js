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
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

import { InputSection, Label, Input, StyledSelect } from "../styles/Agenda";
import Footer from "../components/Footer";

const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;

  @media (max-width: 2189px) {
    gap: 20px 100px ; 
  }
  @media (max-width: 1608px) {
    gap: 25px;
  }
  @media (max-width: 1075px ) {
    gap: 10px;
  }

  
`;

const EventCardContainer = styled.div`
  width: 400px;

  @media (min-width: 2189px) {
    height: auto;
    width: auto;;
  }
  @media (max-width: 2189px) {
    gap: 20px 100px ;
    width : auto;
  }
  @media (max-width: 1608px) {
    gap: 5px;
    width: auto;
  }
  @media (max-width: 990px) {
    width: auto;
    
  }
`;

const StyledSearchIcon = styled(FaSearch)`

  font-size: 16px; 

`;
const DatePickerContainer = styled.div`
  position: relative;
  font-size: 16px; 

  @media (max-width: 1075px) {
    font-size : 10px;
  }


  .react-datepicker-wrapper {
    width: 100%;
    @media (max-width: 1075px) {
    font-size : 10px;
  }
    
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    @media (max-width: 1075px) {
    font-size : 10px;
  }
  }

  .react-datepicker__clear-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.7;
    
    @media (max-width: 1075px) {
    font-size : 10px;
  }

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
const pageNumberBtn = styled.button`
  
`;

function Agenda() {
  const [sortType, setSortType] = useState("ascending"); // Par défaut, tri croissant
  const [eventStatusFilter, setEventStatusFilter] = useState("Tous"); // "Tous" to show all events by default

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Ajoute un zéro devant le jour et le mois si nécessaire
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Ajoutez des états pour les filtres
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [eventLocationFilter, setEventLocationFilter] = useState("Tous"); // "Tous" pour afficher tous les types d'événements par défaut

  useEffect(() => {
    axios.get(`http://localhost:3001/event/combined`).then((res) => {
      setEvents(res.data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [eventStatusFilter]);


  const currentDate = new Date();
  // Obtenir les événements à afficher sur la page actuelle avec filtres appliqués
  const filteredEvents = events
    .filter((event) => {
      // Appliquer les filtres ici
      const eventNameMatches = event.nom
        .toLowerCase()
        .includes(eventNameFilter.toLowerCase());
      const dateMatches =
        dateFilter === "" ||
        formatDate(event.startDateTime) === formatDate(dateFilter);
      const eventLocationMatches =
        eventLocationFilter === "Tous" ||
        event.locationType === eventLocationFilter;
      return eventNameMatches && dateMatches && eventLocationMatches;
    })
    .filter((event) => {
      // Apply the event status filter
      if (eventStatusFilter === "Passés") {
        return new Date(event.startDateTime) < currentDate;
      } else if (eventStatusFilter === "Futurs") {
        return new Date(event.startDateTime) > currentDate;
      } else if (eventStatusFilter === "En cours") {
        return (
          new Date(event.startDateTime) <= currentDate &&
          new Date(event.endDateTime) >= currentDate
        );
      }
      return true; // Show all events when "Tous" is selected
    })
    .sort((a, b) => {
      // Tri des événements en fonction du type de tri
      if (sortType === "ascending") {
        return new Date(a.startDateTime) - new Date(b.startDateTime);
      } else {
        return new Date(b.startDateTime) - new Date(a.startDateTime);
      }
    });

    const eventsPerPage = 6;
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fonctions pour gérer les changements de filtres
  const handleEventNameFilterChange = (event) => {
    setEventNameFilter(event.target.value);
    setCurrentPage(1); 
  };

  const handleDateFilterChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      setDateFilter(formattedDate);
    } else {
      setDateFilter("");
    }
    setCurrentPage(1);
  };

  const handleEventLocationFilterChange = (event) => {
    setEventLocationFilter(event.target.value);
    setCurrentPage(1);
  };
  const handleResetFilters = () => {
    setEventNameFilter("");
    setDateFilter("");
    setEventLocationFilter("Tous");
    setEventStatusFilter("Tous");
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
              <StyledSearchIcon
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
                onChange={handleEventNameFilterChange}
                placeholder="Rechercher par mot clé"
              />
            </div>
          </InputSection>
          <div style={{ position: "relative" }}>
            <DatePickerContainer>
              <DatePicker
                selected={dateFilter !== "" ? new Date(dateFilter) : null}
                onChange={(date) => handleDateFilterChange(date)}
                dateFormat="dd/MM/yyyy"
                startDate={new Date()}
                placeholderText="Rechercher par date"
              />
              {dateFilter === "" && (
                <FaCalendarAlt
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "gray",
                    cursor: "pointer",
                  }}
                  onClick={() => console.log("Calendar clicked")}
                />
              )}
              {dateFilter !== "" && (
                <span
                  className="react-datepicker__clear-icon"
                  onClick={() => handleDateFilterChange(null)}
                >
                  x
                </span>
              )}
            </DatePickerContainer>
          </div>

          <div>
            <StyledSelect
              value={eventLocationFilter}
              onChange={handleEventLocationFilterChange}
            >
              <option value="Tous">Visio et Présentiel</option>
              <option value="Visio">Visio</option>
              <option value="Présentiel">Présentiel</option>
            </StyledSelect>
            <StyledSelect
              value={eventStatusFilter}
              onChange={(e) => setEventStatusFilter(e.target.value)}
            >
              <option value="Tous">Tous les évènements</option>
              <option value="Passés">Événements passés</option>
              <option value="Futurs">Événements futurs</option>
              <option value="En cours">Événements en cours</option>
            </StyledSelect>
          </div>
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
          <StyledSelect
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="ascending">Date croissante</option>
            <option value="descending">Date décroissante</option>
          </StyledSelect>
        </aside>
        <main>
        <ExtendedFiltres>
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
              <StyledSearchIcon
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
                // Remplacez cela par votre logique de recherche
              />
              <ExtendedInput
                type="text"
                value={eventNameFilter}
                onChange={handleEventNameFilterChange}
                placeholder="Rechercher par mot clé"
              />
            </div>
          </InputSection>
          <div style={{ position: "relative" }}>
            <DatePickerContainer>
              <DatePicker
                selected={dateFilter !== "" ? new Date(dateFilter) : null}
                onChange={(date) => handleDateFilterChange(date)}
                dateFormat="dd/MM/yyyy"
                startDate={new Date()}
                placeholderText="Rechercher par date"
              />
              {dateFilter === "" && (
                <FaCalendarAlt
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "gray",
                    cursor: "pointer",
                  }}
                  onClick={() => console.log("Calendar clicked")}
                />
              )}
              {dateFilter !== "" && (
                <span
                  className="react-datepicker__clear-icon"
                  onClick={() => handleDateFilterChange(null)}
                >
                  x
                </span>
              )}
            </DatePickerContainer>
          </div>

          <div>
            <StyledSelect
              value={eventLocationFilter}
              onChange={handleEventLocationFilterChange}
            >
              <option value="Tous">Visio et Présentiel</option>
              <option value="Visio">Visio</option>
              <option value="Présentiel">Présentiel</option>
            </StyledSelect>
            <StyledSelect
              value={eventStatusFilter}
              onChange={(e) => setEventStatusFilter(e.target.value)}
            >
              <option value="Tous">Tous les évènements</option>
              <option value="Passés">Événements passés</option>
              <option value="Futurs">Événements futurs</option>
              <option value="En cours">Événements en cours</option>
            </StyledSelect>
          </div>
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
          <StyledSelect
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="ascending">Date croissante</option>
            <option value="descending">Date décroissante</option>
          </StyledSelect>
            
          </ExtendedFiltres>
        <h1 className="mainTitle">Évènements</h1>
  {currentEvents.length === 0 ? (
    <p>Aucun événement à afficher pour les filtres sélectionnés.</p>
  ) : (
    <EventGrid>
      {currentEvents.map((value, key) => {
        return (
          <EventCardContainer key={key}>
            <EventCard
              id={value.id}
              date={formatDate(value.startDateTime)}
              title={value.nom}
              //description={value.description}
              locationType={value.locationType}
              eventType={value.eventType}
              location={
                value.locationType === "Visio" ? "En ligne" : value.location
              }
              registrationLink={value.lienInscription}
              imageUrl={`events_imgs/${value.id}.jpg`}
              fallbackImageUrl={"events_imgs/event_default.jpg"}
            />
          </EventCardContainer>
        );
      })}
    </EventGrid>
  )}

          <div>
          {/* Display first page */}
          {startPage > 1 && (
            <button className="indexPageBtn" onClick={() => handlePageClick(1)}>
              1
            </button>
          )}

          {/* Display ellipsis if needed */}
          {startPage > 2 && <span className="ellipsis">...</span>}

          {/* Display page buttons within the range */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              className={`indexPageBtn ${startPage + index === currentPage ? "active" : ""}`}
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
            <button className="indexPageBtn" onClick={() => handlePageClick(totalPages)}>
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

export default Agenda;
