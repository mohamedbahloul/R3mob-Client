import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import EventCard from "../components/EventCard";
import styled from "styled-components";
import axios from "axios";
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
function Projet() {
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

  useEffect(() => {
    axios.get(`http://localhost:3001/projet`).then((res) => {
      setEvents(res.data);
      console.log(res.data)
    });
  }, []);

  const eventsPerPage = 6;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Obtenir les événements à afficher sur la page actuelle
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">left</aside>
        <main>
          <h1 className="mainTitle">Projets</h1>
          <EventGrid>
            {currentEvents.map((value, key) => {
              return (
                <EventCardContainer key={key}>
                  <EventCard
                    date={formatDate(value.startDateTime)}
                    title={value.nom}
                    description={value.description}
                    eventType={value.locationType}
                 
                  location={ value.locationType==="Visio" ? "En ligne" : value.location}
                    registrationLink={value.lienInscription}
                  />
                </EventCardContainer>
              );
            })}
          </EventGrid>

          <div>
            {/* Affichage des numéros de page */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button className="indexPageBtn" key={index} onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </main>
        <aside className="right">
          <ScrollButton />
          <CarteButton />
        </aside>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default Projet;
/* <EventCardContainer>
              <EventCard
                date="11/12/2024"
                title="Atelier de développement web"
                description="Un atelier pratique pour apprendre à développer des sites web."
                eventType="Présentiel"
                location="Paris, France"
                registrationLink="https://example.com/inscription"
              />
            </EventCardContainer> */

            // function Projet() {
            //   const formatDate = (dateString) => {
            //     const date = new Date(dateString);
            //     const day = date.getDate();
            //     const month = date.getMonth() + 1;
            //     const year = date.getFullYear();
            
            //     // Ajoute un zéro devant le jour et le mois si nécessaire
            //     const formattedDay = day < 10 ? `0${day}` : day;
            //     const formattedMonth = month < 10 ? `0${month}` : month;
            
            //     return `${formattedDay}/${formattedMonth}/${year}`;
            //   };
            
            //   const [events, setEvents] = useState([]);
            //   const [currentPage, setCurrentPage] = useState(1);
            
            //   // Filtres
            //   const [dateFilter, setDateFilter] = useState("");
            //   const [descriptionFilter, setDescriptionFilter] = useState("");
            //   const [statusFilter, setStatusFilter] = useState("");
            
            //   useEffect(() => {
            //     axios.get(`http://localhost:3001/event`).then((res) => {
            //       setEvents(res.data);
            //     });
            //   }, []);
            
            //   // Appliquer les filtres et obtenir les événements filtrés
            //   const filteredEvents = events.filter((event) => {
            //     // Filtre par date
            //     if (dateFilter && event.startDateTime < dateFilter) {
            //       return false;
            //     }
            
            //     // Filtre par description textuelle
            //     if (descriptionFilter && !event.nom.toLowerCase().includes(descriptionFilter.toLowerCase())) {
            //       return false;
            //     }
            
            //     // Filtre par statut (passé ou à venir)
            //     const startDateTime = new Date(event.startDateTime);
            //     if (statusFilter === "past" && startDateTime >= new Date() ) {
            //       return false;
            //     }
            //     if (statusFilter === "upcoming" && startDateTime < new Date()) {
            //       return false;
            //     }
            
            //     return true;
            //   });
            
            //   const eventsPerPage = 6;
            //   const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
            
            //   // Obtenir les événements à afficher sur la page actuelle
            //   const indexOfLastEvent = currentPage * eventsPerPage;
            //   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
            //   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
            
            //   const handlePageClick = (pageNumber) => {
            //     setCurrentPage(pageNumber);
            //   };
            
            //   const handleDateFilterChange = (e) => {
            //     setDateFilter(e.target.value);
            //   };
            
            //   const handleDescriptionFilterChange = (e) => {
            //     setDescriptionFilter(e.target.value);
            //   };
            
            //   const handleStatusFilterChange = (e) => {
            //     setStatusFilter(e.target.value);
            //     console.log(e.target.value);
            //   };
            
            //   return (
            //     <div className="body">
            //       <header>header</header>
            //       <div className="main">
            //         <aside className="left">
            //           {/* Filtres */}
            //           <label htmlFor="dateFilter">Date :</label>
            //           <input type="date" id="dateFilter" value={dateFilter} onChange={handleDateFilterChange} />
            
            //           <label htmlFor="descriptionFilter">Description :</label>
            //           <input type="text" id="descriptionFilter" value={descriptionFilter} onChange={handleDescriptionFilterChange} />
            
            //           <label htmlFor="statusFilter">Statut :</label>
            //           <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange}>
            //             <option value="">Tous</option>
            //             <option value="past">Passé</option>
            //             <option value="upcoming">À venir</option>
            //           </select>
            //         </aside>
            //         <main>
            //           <h1 className="mainTitle">Évènements</h1>
            //           <EventGrid>
            //             {currentEvents.map((value, key) => {
            //               return (
            //                 <EventCardContainer key={key}>
            //                   <EventCard
            //                     date={formatDate(value.startDateTime)}
            //                     title={value.nom}
            //                     description={value.description}
            //                     eventType={value.locationType}
            //                     location={value.locationType === "Visio" ? "En ligne" : value.location}
            //                     registrationLink={value.lienInscription}
            //                   />
            //                 </EventCardContainer>
            //               );
            //             })}
            //           </EventGrid>
            
            //           <div>
            //             {/* Affichage des numéros de page */}
            //             {Array.from({ length: totalPages }, (_, index) => (
            //               <button className="indexPageBtn" key={index} onClick={() => handlePageClick(index + 1)}>
            //                 {index + 1}
            //               </button>
            //             ))}
            //           </div>
            //         </main>
            //         <aside className="right">
            //           <ScrollButton />
            //           <CarteButton />
            //         </aside>
            //       </div>
            //       <footer>footer</footer>
            //     </div>
            //   );
            // }
            
            // export default Projet;