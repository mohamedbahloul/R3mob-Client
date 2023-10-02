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
import { HeaderContent, HeaderLinkStyle } from "../styles/Header.style";

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
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  width: 100;
  height: 60vh;
  margin-top: 100px;
  animation: ${(props) =>
    props.playAnimation ? "rotate 0.5s ease, zoom 0.5s ease" : "none"};
  position: relative;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 70%;
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
  margin-left:10%;
  /* overflow: hidden; Empêche le débordement du contenu */
`;

const Title = styled.h2`
  color: red;
  font-size: 1.2rem;
  margin-top: 0;
  @media (max-width: 990px) {
    font-size: 0.9rem;
  }
`;
const Paragraph = styled.p`
  color: #333;
  font-size: 0.8rem;
  margin-bottom: 0; /* Ajustez la marge selon vos besoins */
@media (max-width: 990px) {
    font-size: 0.5rem;
  }
`;

const StyledSpan = styled.span`
  color: red;
  font-weight: bold;
`;

function Home() {
  const [currentImage, setCurrentImage] = useState(1);
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
    axios.get(`https://back.r3mob.fr/perso/pilote`).then((res) => {
      setPilotes(res.data);
      console.log(res.data);
    });
    axios.get(`https://back.r3mob.fr/etablissement`).then((res) => {
      setEtablissements(res.data);
      console.log(res.data);
    });
    axios.get(`https://back.r3mob.fr/event/3recent`).then((res) => {
      setEvents(res.data);
    });
    axios.get(`https://back.r3mob.fr/publication/3recent`).then((res) => {
      setPublications(res.data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === 1 ? 2 : 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="body">
      <HeaderContent
        style={{
          marginTop: "50px",
        }}
      >
        <HeaderLinkStyle
          style={{
            marginLeft: "50px",
          }}
        >
          {"> "}Accueil
        </HeaderLinkStyle>
      </HeaderContent>
      {/* <ParticlesBg  type="cobweb" bg={true} num={150} /> */}
      <div>
        <CardContainer
          imageUrl={images[currentImage - 1].src}
          alt={`Image ${currentImage}`}
        >
          <TextContainer>
            <Title>{images[currentImage - 1].title}</Title>
            <Paragraph>
              {images[currentImage - 1].span && (
                <StyledSpan>{images[currentImage - 1].span}</StyledSpan>
              )}
              {images[currentImage - 1].text}
              {images[currentImage - 1].elem1 &&
                images[currentImage - 1].elem2 && (
                  <ul>
                    <li>{images[currentImage - 1].elem1}</li>
                    <li>{images[currentImage - 1].elem2}</li>
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
          {pilotes.length > 0 && (
            <>
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
          </>
          )}
          {events.length > 0 && (
            <>
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
            </>
          )}
          {publications.length > 0 && (
            <>
          <SecondaryTitle>Les publications récentes</SecondaryTitle>
          <PublicationGrid>
            {publications.map((value, key) => {
              return (
                <PublicationCardContainer key={key}>
                  <CartePublication
                    id={value.id}
                    title={value.nom}
                    url={value.url}
                    imageUrl={value.imageName}
                    fallbackUrl="mob.jpg"
                  />
                </PublicationCardContainer>
              );
            })}
          </PublicationGrid>
          </>
          )}
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

export default Home;
