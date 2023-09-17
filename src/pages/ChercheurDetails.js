import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import Footer from "../components/Footer";
import CartePerso from "../components/CartePerso";
import Thematiques from "../components/Thematiques";
import ThematiqueIcon from "../components/ThematiqueIcon";
import CartePublication from "../components/CartePublication";
const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;
const OtherInfos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ChercheurEtabs = styled.h2`
  margin-left: 5%;
  color: Colors;
`;

const Etab= styled.a`
  font-size: 20px;
  font-weight: lighter;
`;
const publications=styled.h2` 
  margin-left: 5%;
  font-size: 20px;
  margin-top: 15%;
  font-weight: normal;
`;

const ChercheurName = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: black;
  margin-top: 10%;
  margin-left: 5%;
`;

const EventFieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-left: 20px;
  gap: 20px;
`;
const DateText = styled.div`
  text-transform: capitalize;
`;

const EventIcon = styled.div`
  width: 24px;
  height: 24px;
  color: red;
`;

const EventLocation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #555;
`;

const ContactSection = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-left: 20px;
  gap: 10px;
`;

const ContactTitle = styled.h3`
  font-weight: bold;
  color: red;
`;

const ContactInfo = styled.div`
  font-style: italic;
`;
const ContactName = styled.div`
  font-weight: 600;
`;

const EventImage = styled.img`
  max-width: 100%;
  height: 500px;
  margin-top: 20px;
  width: 80%;
  border-radius: 10% 0%;
  align-self: center;
`;

const EventDescription = styled.p`
  margin-top: 20px;
  font-size: 20px;
  text-align: left; /* Alignement à gauche */
  overflow-wrap: break-word; /* Gestion du débordement de contenu */
`;
const EventLink = styled.a`
  color: var(--color3);
  background-color: var(--color2);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color1);
  }
`;
const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  justify-content: center;
  padding-top: 15px;
`;

const ChercheurImage = styled.div`
  width: 300px;
  height: 300px;
  background-image: ${({ backgroundImage }) => `${backgroundImage}`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5%;
`;
const SimilarEventsTitle = styled.h3`
  margin-top: 100px;
`;
const ThematiquesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: -5%;
  margin-bottom: 5%;
  margin-top: 10%;

`;

const PublicationGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 75px;
`;

const PublicationCardContainer = styled.div`
  width: 500px;
`;
function ChercheurDetails() {
  const { chercheurId } = useParams();
  const [chercheur, setChercheur] = useState({});
  const [etablissement, setEtablissement] = useState([]);
  const [publications, setPublications] = useState([]);
  const [allThematique, setAllThematique] = useState([]);
  const [extractedThematiques, setExtractedThematiques] = useState([]);
  const [chercheurSousThematiques, setChercheurSousThematiques] = useState(
    []
  );
  const [shouldReloadPage, setShouldReloadPage] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/detailsChercheur/${chercheurId}`)
      .then((res) => {
        if (res.data !== null) {
          setChercheur(res.data);
          setChercheurSousThematiques(res.data.Thematique_chercheurs);
        } else {
          window.location.replace("/404");
        }
      });

    axios
      .get(`http://localhost:3001/etablissement/chercheur/${chercheurId}`)
      .then((res) => {
        if (res.data !== null) {
          setEtablissement(res.data);
        }
      });
    axios.get(`http://localhost:3001/publication/personnel/${chercheurId}`).then((res) => {
      if (res.data !== null) {
        setPublications(res.data);
      }
    }
    );
  }, [chercheurId,shouldReloadPage]);
  useEffect(() => {
    axios.get(`http://localhost:3001/thematique`).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        setAllThematique(res.data);
      }
    });
  }, []);

  useEffect(() => {
    // Define an async function to fetch the thematic data
    const fetchThematiqueData = async () => {
      const thematicData = [];
      for (const publication of chercheurSousThematiques) {
        const thematicId = publication.SousThematique.ThematiqueId;
        const thematic = allThematique.find((thematique) => thematique.id === thematicId);
        if (thematic) {
          const thematiqueIndex = thematicData.findIndex((data) => data.thematique.nom === thematic.nom);
          if (thematiqueIndex !== -1) {
            // If the thematique already exists, update the sousThematique field
            thematicData[thematiqueIndex].sousThematique.push(" , ",publication.SousThematique.nom);
          } else {
            // If the thematique doesn't exist, add it to the array
            const them = Thematiques.find((thematique) => thematique.nom === thematic.nom);
            thematicData.push({ thematique: them, sousThematique: [publication.SousThematique.nom] });
          }
        }
      }
      setExtractedThematiques(thematicData);
    };
  
    fetchThematiqueData();
  }, [chercheurSousThematiques, allThematique]);

  const formattedDate = new Date(chercheur.startDateTime).toLocaleDateString(
    "fr-FR",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const reload = () => {
    setShouldReloadPage(!shouldReloadPage);
  };

  const defaultImage = "../default_user.png";
  const backgroundImage = chercheur.imageData
    ? `url(data:image/png;base64,${chercheur.imageData})`
    : `url(${defaultImage})`;

  return (
    <div className="body">
      <header>header</header>
      <div className="main" style={{marginTop:"100px"}}>
        <aside className="left">left</aside>
        <main>
          <HeaderContainer>
            <ChercheurImage backgroundImage={backgroundImage} />
            <Infos>
              <ChercheurName>{chercheur.username}</ChercheurName>
              <OtherInfos>

              
              <ChercheurEtabs>
                {etablissement.map((etab, index) => {
                  return (
                    <Etab key={etab.EtablissementId}>
                      {etab.Etablissement.nom}
                      {index < etablissement.length - 1 ? ", " : ""}
                    </Etab>
                  );
                })}
              </ChercheurEtabs>
              
              </OtherInfos>
            </Infos>
            <RightSide>
            <ThematiquesContainer>
              { extractedThematiques.map((publicationSousThematiques) =>
                    <ThematiqueIcon
                      key={publicationSousThematiques.thematique.nom}
                      icon={"../thematiques/" + publicationSousThematiques.thematique.icon}
                      backgroundColor={publicationSousThematiques.thematique.backgroundColor}
                      subThematiques={publicationSousThematiques.sousThematique}
                    />
                    )
              }
            </ThematiquesContainer>
              <publications>Nombre de publications liées à R3MOB: {publications.length } </publications>

            </RightSide>
            
              

          </HeaderContainer>
          <DetailsContainer>
            <div>

              <EventFieldContainer>
                <EventLink href={`/login/${chercheurId}`}>Se Connecter</EventLink>
              </EventFieldContainer>
             
            </div>
            {/* <RightSide>
              <EventImage alt="Image de l'événement" />

              <EventDescription></EventDescription>
            </RightSide> */}
          </DetailsContainer>
          <SimilarEventsTitle>
            {publications.length != 0 ? (
              <>
              <p>Les Publications de {chercheur.username}</p>

            <PublicationGrid>
                                        

              {publications.map((value, key) => {
                return (
                  <PublicationCardContainer key={key}>
                    <CartePublication
                      id={value.id}
                      url={value.url}
                      title={value.nom}
                      imageUrl={value.imageName}
                      fallbackUrl="../mob.jpg"
                      idChercheur={value.chercheurs[0]}
                      reload={reload}
                    />
                  </PublicationCardContainer>
                );
              })}
              
            </PublicationGrid>
            </>
          ) : (
            <p>Aucune publication pour {chercheur.username}.</p>
          )}
          
          </SimilarEventsTitle>
          <EventGrid>
            {/* {similarEvents.map((value, key) => (
              <EventCardContainer key={key}>
                <EventCard
                  id={value.id}
                  date={formatDate(value.startDateTime)}
                  title={value.nom}
                  eventType={value.locationType}
                  location={
                    value.locationType === "Visio"
                      ? "En ligne"
                      : value.location
                  }
                  registrationLink={value.lienInscription}
                  imageUrl = {`../events_imgs/${value.id}.jpg`}
                    fallbackImageUrl = {"../events_imgs/event_default.jpg"}
                />
              </EventCardContainer>
            ))} */}
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

export default ChercheurDetails;
