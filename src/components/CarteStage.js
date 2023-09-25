import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/Colors.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ThematiqueIcon from "../components/ThematiqueIcon";
import Thematiques from "../components/Thematiques";

const CarteStage = ({ id, title,disponible, link, fallbackUrl, imageUrl }) => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [publicationSousThematiques, setPublicationSousThematiques] = useState(
    []
  );
  const [publicationChercheur, setPublicationChercheur] = useState([]);
  const [allThematique, setAllThematique] = useState([]);
  const [extractedThematiques, setExtractedThematiques] = useState([]);

  useEffect(() => {
    setPlayAnimation(true);
    return () => {
      setPlayAnimation(false);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/publication/thematiques/${id}`)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setPublicationSousThematiques(res.data);
        }
      });

      axios
      .get(`http://localhost:3001/publication/chercheur/${id}`)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setPublicationChercheur(res.data);
        }
      });
  }, [id]);

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
      for (const publication of publicationSousThematiques) {
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
  }, [publicationSousThematiques, allThematique]);
  


  return (
    // <PageLink to={link}>
      <CardContainer playAnimation={playAnimation}>
        <CardImage src={imageUrl} fallbackUrl={fallbackUrl} />
        <CardContent>
          <StageTitle>{title}</StageTitle>
          <StageInfos>
            <UsernameContainer> {/*<FaUserAlt/>*/}{publicationChercheur.map((publication) => {
              return (
                <Username href={`chercheur/${publication.Personnel.id}`}>
                  
                  {publication.Personnel.username}
                </Username>
              )
            }) }</UsernameContainer>
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
            <EventLocation isDisponible={disponible===true}>{disponible ? "Disponible " : "Non disponible"}</EventLocation>
          </StageInfos>
        </CardContent>
      </CardContainer>
    // </PageLink>
  );
};

const Username = styled.a`
  color: var(--color1);
  font-size: medium;
  font-style: italic;

`
const ThematiquesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: -5%;
  margin-bottom: 5%;
`;
const PageLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardImage = styled.img`
  background-position: center;
  width: 100%;
  height: 30%;
`;

const CardContainer = styled.div`
margin-top: 10%;
  background-color: whitesmoke;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 600px;
  width: 400px;
  animation: ${(props) =>
    props.playAnimation ? "rotate 0.5s ease, zoom 0.5s ease" : "none"};
  @keyframes rotate {
    from {
      transform: rotateY(30deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }
  @keyframes zoom {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1);
    }
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(10, 10, 10, 0.5);
  }
`;
const UsernameContainer = styled.div`
  color: var(--color1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardContent = styled.div`
  position: relative; /* Add this to create a new stacking context */
  z-index: 1; /* Position the content above the gradient layer */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
`;

const StageTitle = styled.h2`
  font-size: 1rem;
  color: var(--color1);
  font-weight: bold;
  margin-left: 3%;
  margin-right: 3%;
  line-height: 2.5rem;
  justify-content: center;
`;

const StageInfos = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
  justify-content: space-between;
  margin-right: 5%;
  margin-bottom: 5%;
`;

const EventType = styled.span`
  margin-right: 8px;
  padding: 4px 8px;
  background-color: var(--color3);
  border-radius: 4px;
  color: var(--color2);
  font-weight: bold;
`;

const EventLocation = styled.span`
  color: var(--color3);
  /* background-color: rgba(128, 128, 128, 0.7); */
  background-color: ${(props) => (props.isDisponible ? "green" : "red")};
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bolder;
  font-size: large;
`;

export default CarteStage;
