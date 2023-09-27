import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import "../styles/Colors.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ThematiqueIcon from "../components/ThematiqueIcon";
import Thematiques from "../components/Thematiques";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditPubPopup from "./EditPubPopup";
import { AuthContext } from "../helpers/AuthContext";
import ConfirmationPopup from "./ConfirmationPopup";

const DeleteConfirmationPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeleteConfirmationPopupButton = styled.button`
  margin-top: 10px;
`;

const CartePublication = ({
  id,
  url,
  title,
  link,
  fallbackUrl,
  imageUrl,
  reload,
  idChercheur,
}) => {
  const { authState } = useContext(AuthContext);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [publicationSousThematiques, setPublicationSousThematiques] = useState(
    []
  );
  const [publicationChercheur, setPublicationChercheur] = useState([]);
  const [allThematique, setAllThematique] = useState([]);
  const [extractedThematiques, setExtractedThematiques] = useState([]);
  const [image, setImage] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedPublication, setEditedPublication] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const formattedUrl =
    url && (url.startsWith("http://") || url.startsWith("https://"))
      ? url
      : `http://${url}`;

  const handleEditEvent = (publication) => {
    setIsEditPopupOpen(true);
    setEditedPublication(publication);
  };

  const handleCloseEditPopup = () => {
    console.log("close");
    setIsEditPopupOpen(false);
    setEditedPublication(null);
    reload();
    setReloadPage(!reloadPage);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/createPublication/${id}`);
      reload();
      // Gérez la réponse ici
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici
    }
  };

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

    axios
      .get(`http://localhost:3001/publication/image/${imageUrl}`)
      .then((res) => {
        if (res.data && res.data !== null) {
          // Vérifiez que res.data n'est pas nul
          setImage(`data:image/png;base64,${res.data}`);
        } else {
          setImage(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, imageUrl,reloadPage]);

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
        let thematicId = publication.SousThematique? publication.SousThematique.ThematiqueId : null;
        let thematic = allThematique.find(
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

         thematicId = publication.ThematiqueId ? publication.ThematiqueId : null;
        if(!thematicId) continue;
         thematic = allThematique.find((thematique) => thematique.id === thematicId);
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
  const handleShowDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    try {
      // Appeler la fonction de suppression réelle ici
      await axios.delete(`http://localhost:3001/createPublication/${id}`);
      reload();
      // Masquer la popup de confirmation
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici
      // Masquer la popup de confirmation en cas d'erreur si nécessaire
      setShowDeleteConfirmation(false);
    }
  };

  const backgroundImage = image ? `${image}` : `${fallbackUrl}`;

  return (
    <>
      {console.log(authState.username, idChercheur)}
      {authState.status && authState.username === idChercheur && (
        <ButtonContainer>
          <ButtonEdit onClick={() => handleEditEvent(id)}>
            <FontAwesomeIcon icon={faEdit} />
          </ButtonEdit>
          <ButtonDelete onClick={() => handleShowDeleteConfirmation()}>
            <FontAwesomeIcon icon={faTrash} />
          </ButtonDelete>
        </ButtonContainer>
      )}
      <a
        href={url && url !== "" ? formattedUrl : undefined}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <CardContainer playAnimation={playAnimation}>
          <CardImage src={backgroundImage} />
          <CardContent>
            <PublicationTitle>{title}</PublicationTitle>
            <PublicationInfos>
              <UsernameContainer>
                {publicationChercheur.map((publication) => (
                  <Username
                    key={publication.Personnel.id}
                    href={
                      authState.status
                        ? `chercheur/${publication.Personnel.id}`
                        : undefined
                    }
                  >
                    {publication.Personnel.username}
                  </Username>
                ))}
              </UsernameContainer>
              <ThematiquesContainer>
                {extractedThematiques.map((publicationSousThematiques) => (
                  <ThematiqueIcon
                    key={publicationSousThematiques.thematique.nom}
                    icon={
                      "../thematiques/" +
                      publicationSousThematiques.thematique.icon
                    }
                    backgroundColor={
                      publicationSousThematiques.thematique.backgroundColor
                    }
                    subThematiques={publicationSousThematiques.sousThematique}
                  />
                ))}
              </ThematiquesContainer>
            </PublicationInfos>
          </CardContent>
        </CardContainer>
      </a>
      {isEditPopupOpen && (
        <EditPubPopup
          pubId={id}
          title={title}
          pubUrl={formattedUrl}
          publication={editedPublication}
          onSave={() => {
            handleCloseEditPopup();
          }}
          onClose={handleCloseEditPopup}
        />
      )}
      {showDeleteConfirmation && (
        <ConfirmationPopup
          onClose={() => setShowDeleteConfirmation(false)}
          onSave={handleConfirmDelete}
        />
      )}
    </>
  );
};

export const ButtonDelete = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: -20px;
  right: 100px;
  width: fit-content;
`;

export const ButtonEdit = styled.button`
  background-color: #ffc107;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: -20px;
  right: 150px;
  width: fit-content;
`;
const ButtonContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`;

const Username = styled.a`
  color: var(--color1);
  font-size: 0.9rem; /* Use relative font size units like rem or em */
  font-style: italic;
`;
const ThematiquesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: -5%;
  margin-bottom: 5%;
  gap: 5px;
`;
const PageLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const CardImage = styled.img`
  background-position: center;
  width: 100%;
  height: 30%;
`;

const CardContainer = styled.div`
  max-width: 400px;
  margin-top: 6%; /* Adjust the margin as needed */
  background-color: whitesmoke;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%; /* Use 100% to match the container height */
  width: 100%; /* Use 100% to match the container width */
  height: 500px;
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

const PublicationTitle = styled.h2`
  font-size: 1rem; /* Use relative font size units like rem or em */
  color: var(--color1);
  font-weight: bold;
  margin-left: 3%;
  margin-right: 3%;
  line-height: 2.5rem;
  justify-content: center;
`;

const PublicationInfos = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
  justify-content: space-between;
  margin-right: 5%;
  margin-bottom: 5%;
`;

export default CartePublication;
