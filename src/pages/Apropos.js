import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import styled from "styled-components";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import Footer from "../components/Footer";
import CartePerso from "../components/CartePerso";
import axios from "axios";
import EventCard from "../components/EventCard";
import CartePublication from "../components/CartePublication";
import Colors from "../styles/Colors";
import ParticlesBg from "particles-bg";
import "../styles/Apropos.css";

const SecondaryTitle = styled.h2`
  color: ${Colors.color2};
  font-size: 2rem;
  margin-top: 70px;
  align-self: left;
`;
const PublicationGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;
`;

const PublicationCardContainer = styled.div`
  width: 500px;
  margin-bottom: 20px;
`;

const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;

  @media (max-width: 2189px) {
    gap: 20px 100px;
  }
  @media (max-width: 1608px) {
    gap: 25px;
  }
  @media (max-width: 1075px) {
    gap: 10px;
  }
`;

const EventCardContainer = styled.div`
  width: 400px;

  @media (min-width: 2189px) {
    height: auto;
    width: auto;
  }
  @media (max-width: 2189px) {
    gap: 20px 100px;
    width: auto;
  }
  @media (max-width: 1608px) {
    gap: 5px;
    width: auto;
  }
  @media (max-width: 990px) {
    width: auto;
  }
`;

const PersoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  justify-content: center;
  padding-top: 15px;
`;

const PersoCardContainer = styled.div`
  width: auto;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  margin-top: 100px;
  overflow: hidden;
`;

const SlideImage = styled.img`
  position: absolute;
  top: 0;
  left: ${(props) => (props.slideOut ? "0" : "100%")};
  transition: left 0.5s ease-in-out;
  width: 100%;
  height: 100%;


`;


const TextContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30%;
  background-color: white;
  z-index: 1;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
  opacity: 0.8;
  /* overflow: hidden; Empêche le débordement du contenu */
`;

const Title = styled.h2`
  color: red;
  font-size: 1.2rem;
  margin-top: 0;
`;
const Paragraph = styled.p`
  color: #333;
  font-size: 0.8rem;
  margin-bottom: 0; /* Ajustez la marge selon vos besoins */
`;

const StyledSpan = styled.span`
  color: red;
  font-weight: bold;
`;

function Apropos() {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1); // L'image suivante

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pilotes, setPilotes] = useState([]);
  const [etablissements, setEtablissements] = useState([]);
  const [events, setEvents] = useState([]);
  const [publications, setPublications] = useState([]);
  const images = [
    {
      src: "img_accueil1.jpg",
      title: "Réseau régional de recherche mobilités",
      span: "R3MOB",
      text: " vise à favoriser la collaboration entre porteurs et chercheurs spécialisés dans l'énergie ou des sujets connexes, afin de trouver des solutions pour améliorer les transports et leur système d'alimentation.",
    },
    {
      src: "img_accueil2.jpg",
      title: "Objectifs du réseau",
      span: "",
      text: "Le réseau R3MOB a pour objectif de :",
      elem1:
        "Coordonner les forces académiques et les projets sur le thème des nouvelles mobilités",
      elem2:
        "Développer des coopérations et des coordinations concrètes sur le long terme entre académiques et entreprises de la filière aménagement, mobilité, transport.",
    },
  ];

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

  useEffect(() => {
    axios.get(`http://localhost:3001/perso/pilote`).then((res) => {
      setPilotes(res.data);
      console.log(res.data);
    });
    axios.get(`http://localhost:3001/etablissement`).then((res) => {
      setEtablissements(res.data);
      console.log(res.data);
    });
    axios.get(`http://localhost:3001/event/3recent`).then((res) => {
      setEvents(res.data);
    });
    axios.get(`http://localhost:3001/publication/3recent`).then((res) => {
      setPublications(res.data);
    });
  }, []);

  const [isReverseTransition, setIsReverseTransition] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setNextImage((prevImage) => (prevImage === 0 ? 1 : 0)); // Changer vers l'autre image
    }, 5000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  

  return (
    <div className="body body2" id="body">
      {/* <ParticlesBg  type="cobweb" bg={true} num={150} /> */}
      <div>
      <CardContainer>
  <SlideImage
    src={images[currentImageIndex].src}
    alt={`Image ${currentImageIndex + 1}`}
    className={`slide-out ${isReverseTransition ? "visible" : ""}`}
  />
  <SlideImage
    src={images[nextImage].src}
    alt={`Image ${nextImage + 1}`}
    className={`slide-in ${!isReverseTransition ? "visible" : ""}`}
  />
  <TextContainer>
    <Title>{images[currentImage].title}</Title>
    <Paragraph>
      {images[currentImage].span && (
        <StyledSpan>{images[currentImage].span}</StyledSpan>
      )}
      {images[currentImage].text}
      {images[currentImage].elem1 &&
        images[currentImage].elem2 && (
          <ul>
            <li>{images[currentImage].elem1}</li>
            <li>{images[currentImage].elem2}</li>
          </ul>
        )}
    </Paragraph>
  </TextContainer>
</CardContainer>

      </div>
      <header>header</header>
      <div className="main">
        <aside className="left"></aside>
        <main>
          <SecondaryTitle>L'équipe du réseau : </SecondaryTitle>
          <PersoGrid>
            {pilotes.map((value, key) => {
              const etablissementNames = value.Chercheur_etabs.map(
                (chercheurEtab) => {
                  const etablissement = etablissements.find(
                    (etab) => etab.id === chercheurEtab.EtablissementId
                  );
                  return etablissement ? etablissement.nom : "Pas indiqué";
                }
              );

              return (
                <PersoCardContainer key={key}>
                  <CartePerso
                    id={value.id}
                    name={value.username}
                    email={value.email ? value.email : "Pas indiqué"}
                    phone={value.phone ? value.phone : "Pas indiqué"}
                    address={etablissementNames.join(", ")} // Join establishment names with commas
                    imageData={value.imageData}
                  />
                </PersoCardContainer>
              );
            })}
          </PersoGrid>
          <SecondaryTitle>Les événements récents : </SecondaryTitle>
          <EventGrid>
            {events.map((value, key) => {
              return (
                <EventCardContainer key={key}>
                  <EventCard
                    id={value.id}
                    date={formatDate(value.startDateTime)}
                    title={value.nom}
                    locationType={value.locationType}
                    eventType={value.eventType}
                    location={
                      value.locationType === "Visio"
                        ? "En ligne"
                        : value.location
                    }
                    registrationLink={value.lienInscription}
                    imageUrl={`events_imgs/${value.id}.jpg`}
                    fallbackImageUrl={"events_imgs/event_default.jpg"}
                  />
                </EventCardContainer>
              );
            })}
          </EventGrid>
          <SecondaryTitle>Les publications récentes</SecondaryTitle>
          <PublicationGrid>
            {publications.map((value, key) => {
              return (
                <PublicationCardContainer key={key}>
                  <CartePublication
                    id={value.id}
                    title={value.nom}
                    imageUrl={value.imageName}
                    fallbackUrl="mob.jpg"
                  />
                </PublicationCardContainer>
              );
            })}
          </PublicationGrid>
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

export default Apropos;
