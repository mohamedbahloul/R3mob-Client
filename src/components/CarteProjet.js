import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/Colors.css";
import { FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
import Colors from "../styles/Colors";
import axios from "axios";
import ThematiqueIcon from "../components/ThematiqueIcon";
import Thematiques from "../components/Thematiques";

const CarteProjet = ({
  id,
  title,
  link,
  fallbackUrl,
  imageUrl,
  etablissements,
  enjeux,
}) => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [publicationSousThematiques, setPublicationSousThematiques] = useState(
    []
  );
  const [allThematique, setAllThematique] = useState([]);
  const [extractedThematiques, setExtractedThematiques] = useState([]);

  useEffect(() => {
    setPlayAnimation(true);
    return () => {
      setPlayAnimation(false);
    };
  }, []);

  useEffect(() => {
    axios.get(`https://back.r3mob.fr/projet/thematiques/${id}`).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        setPublicationSousThematiques(res.data);
      }
    });
  }, [id]);

  useEffect(() => {
    axios.get(`https://back.r3mob.fr/thematique`).then((res) => {
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
        const thematicId = publication.SousThematiqueId!==null ? publication.SousThematique.ThematiqueId : null;
        const thematic = allThematique.find(
          (thematique) => thematique.id === thematicId
        );
        if (thematic) {
          const thematiqueIndex = thematicData.findIndex(
            (data) => data.thematique.nom === thematic.nom
          );
          if (thematiqueIndex !== -1) {
            // If the thematique already exists, update the sousThematique field
            thematicData[thematiqueIndex].sousThematique.push(
              " , ",
              publication.SousThematique.nom
            );
          } else {
            // If the thematique doesn't exist, add it to the array
            const them = Thematiques.find(
              (thematique) => thematique.nom === thematic.nom
            );
            thematicData.push({
              thematique: them,
              sousThematique: [publication.SousThematique.nom],
            });
          }
        }
      }

      //Extraire les Thematiques 
      for (const publication of publicationSousThematiques) {
        const thematicId = publication.ThematiqueId ? publication.ThematiqueId : null;
        if(!thematicId) continue;
        const thematic = allThematique.find((thematique) => thematique.id === thematicId);
        if (thematic) {
          const thematiqueIndex = thematicData.findIndex((data) => data.thematique.nom === thematic.nom);
          // If the thematique doesn't exist, add it to the array
          if (thematiqueIndex === -1) {
            
            const them = Thematiques.find((thematique) => thematique.nom === thematic.nom);
            thematicData.push({ thematique: them, sousThematique: [them.nom] });
          }
        }
      }
      setExtractedThematiques(thematicData);
    };

    fetchThematiqueData();
  }, [publicationSousThematiques, allThematique]);

  return (
    <CardContainer playAnimation={playAnimation}>
      <CardContent>
        <CardContentTop>
          <ThematiquesContainer>
            {extractedThematiques.map((publicationSousThematiques) => (
              <ThematiqueIcon
                key={publicationSousThematiques.thematique.nom}
                icon={
                  "../thematiques/" + publicationSousThematiques.thematique.icon
                }
                backgroundColor={
                  publicationSousThematiques.thematique.backgroundColor
                }
                subThematiques={publicationSousThematiques.sousThematique}
              />
            ))}
          </ThematiquesContainer>
          <EventTitle>{title}</EventTitle>
        </CardContentTop>
        <CardContentBottom>
          {etablissements.map((etablissement) => (
            <Username key={etablissement}>
              <FaUniversity />
              <Span>{etablissement}</Span>
            </Username>
          ))}
        </CardContentBottom>
      </CardContent>
      <CardContent>
        <CardImage src={imageUrl} fallbackUrl={fallbackUrl} />
        {enjeux && enjeux.length > 0 && (
          <Span>
            Enjeux :{" "}
            {enjeux.map((enjeu, index) => (
              <React.Fragment key={enjeu.id}>
                {enjeu.Enjeux.nom}
                {index < enjeux.length - 1 && " / "}
              </React.Fragment>
            ))}
          </Span>
        )}
      </CardContent>
    </CardContainer>
  );
};

const Span = styled.span`
  margin-left: 5px;
  color: var(--color1);
  font-size: small;
  font-style: italic;
  @media (max-width: 1966px) {
    font-size: x-small;
  }
  @media (max-width: 1465px) {
    font-size: 8px;
  }
  @media (max-width: 1210px) {
    font-size: 6px;
  }

`;
const CardContentTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60%;
  @media (max-width: 1465px) {
    height: 55%;
  }
  @media (max-width: 1210px) {
    height: 70%;
  }

`;

const CardContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Username = styled.a`
  margin-left: 10px;
  color: var(--color1);
  font-size: medium;
  font-style: italic;
  @media (max-width: 1966px) {
    font-size: x-small;
  }
  @media (max-width: 1465px) {
    font-size: xx-small;
  }
  @media (max-width: 1210px) {
    font-size: 6px;
  }
  @media (max-width: 990px) {
    font-size: xx-small;
  }
`;
const ThematiquesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 5%;
  @media (max-width: 1329px) {
    margin-bottom: 1px;
  }
  gap: 5px;

`;
const PageLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardImage = styled.img`
  background-position: center;
  width: 100%;
  height: 90%;
  float: left;
  float: inline-end;
`;

const CardContainer = styled.div`
  margin-top: 10px; /* Ajoutez un espace en haut */
  margin-bottom: 20px; /* Ajoutez un espace en bas */
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 300px;
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
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
  @media (max-width: 1966px) {
    width: 400px;
    height: 250px;
  }
   @media (max-width: 1465px) {
    width: 350px;
    height: 200px;
  }
  @media (max-width: 1329px) {
    width: 300px;
    height: 170px;
  }
  @media (max-width: 1210px) {
    width: 250px;
    height: 150px;
  }
  @media (max-width: 990px) {
    width: 300px;
    height: 170px;
  }
  /*
  @media (max-width: 1075px) {
    width: 160px;
    height: 120px;
  }
  @media (max-width: 866px) {
    width: 250px;
    height: 150px;
  } */
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
  width: 50%; /* Définit la largeur à 50% pour occuper la moitié droite de la carte */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Ajuste la hauteur pour occuper la hauteur complète de la carte */
  padding: 10px; /* Ajoute une marge intérieure pour espacer le contenu du bord de l'image */
  
`;

const EventTitle = styled.h2`
  font-size: 20px;
  color: var(--color1);
  font-weight: bold;
  line-height: 2.5rem;
  justify-content: center;
  @media (max-width: 1966px) {
    line-height: 1.5rem;
    font-size: 14px;
  }
  @media (max-width: 1465px) {
    line-height: 1rem;
    font-size: 12px;
  }
  @media (max-width: 1329px) {
    font-size: 11px;
  }
  @media (max-width: 1210px) {
    line-height: 0.8rem;
    font-size: 9px;
  }
  @media (max-width: 990px) {
    font-size: 11px;
  }
`;



export default CarteProjet;
