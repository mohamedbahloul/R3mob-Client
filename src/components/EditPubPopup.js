import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for react-datepicker
import {
  PopupContainer,
  Title,
  CloseButton,
  PopupContent,
  PopupButtons,
  ConfirmButton,
  ResetButton,
  ButtonContainer,
  Input,
  Textarea,
  Label,
  ImageSection,
  InputSection,
  ImageField,
  UploadButton,
  UploadArea,
  FileInput,
  FileInputLabel,
  FileInputContainer,
  StyledSelect,
  SelectedThematiqueContainer,
  ErrorMessage,
} from "../styles/CreatePubPopup";
import Thematiques from "./Thematiques";
import SelectedThematique from "./SelectedThematique";
import { AuthContext } from "../helpers/AuthContext";
import { set } from "date-fns";

const EditPubPopup = ({ pubId,title,pubUrl,onSave, onClose }) => {
  const [isSaveClicked, setIsSaveClicked] = useState(false); // Ajoutez cette ligne
  const { authState, setAuthState } = useContext(AuthContext);
  const [nom, setNom] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [id, setId] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allSousThematiques, setAllSousThematiques] = useState([]);
  const [allThematiques, setAllThematiques] = useState([]);
  const [selectedThematique, setSelectedThematique] = useState("");
  const [selectedSousThematiques, setSelectedSousThematiques] = useState([]);
  const [sousThematiquesFiltrees, setSousThematiquesFiltrees] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/sousThematique`).then((res) => {
      setAllSousThematiques(res.data);
      //setSousThematiquesFiltrees(res.data); // Initialisez avec toutes les sous-thématiques
    });
    setNom(title);
    setUrl(pubUrl);

  }, []);
  const handleImageUpload = async (e) => {
    setSelectedImage(e.target.files[0]);
    if (!selectedImage) return; // No file selected, do nothing
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setSelectedImage(droppedFile);
    console.log(droppedFile);
  };

  const handleResetChanges = () => {
    // Reset all the fields here
    setNom(title);
    setStartDateTime(null);
    setLocation(null);
    setDescription(null);
    setSelectedImage(null);
    setUrl(pubUrl);
  };

  const handleSaveChanges = async () => {
    console.log("handleSaveChanges");
    setIsSaveClicked(true); // Marquez le bouton "Confirmer" comme cliqué
    if (!nom || nom === "") {
      //console.error("Le nom de la publication est obligatoire.");
      return; // Ne pas continuer l'envoi des données
    }
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("url", url);
    formData.append("description", description);
    formData.append("selectedThematique", selectedThematique);

    // Nettoyez les IDs en transformant en une seule chaîne de caractères, séparée par des virgules
    const selectedSousThematiqueIds = selectedSousThematiques
      .map((sousThematique) => sousThematique.id)
      .join(",");

    formData.append("selectedSousThematiques", selectedSousThematiqueIds);

    formData.append("selectedImage", selectedImage);
    formData.append("userId", authState.id);

    try {
      await axios.put(`http://localhost:3001/createPublication/${pubId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onSave(); // Fermez la popup
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici
    }
  };

  const [imageUrl, setImageUrl] = useState("events_imgs/event_default.jpg");

  function checkImageExists(imageUrl) {
    const img = new Image();
    img.onload = () => {
      setImageUrl(imageUrl);
    };
    img.onerror = () => {};

    img.src = imageUrl; // Set the source to the image URL
  }

  const imageExists = checkImageExists("events_imgs/" + id + ".jpg");
  function handleThematiqueSelectedChange(thematique) {
    setSelectedThematique(thematique);

    // Si une thématique est sélectionnée, filtrez les sous-thématiques, sinon affichez toutes les sous-thématiques
    if (thematique) {
      const sousThematiquesFiltrees = allSousThematiques.filter(
        (sousThematique) => {
          return sousThematique.Thematique.nom === thematique;
        }
      );
      setSousThematiquesFiltrees(sousThematiquesFiltrees);
    } else {
      setSousThematiquesFiltrees(allSousThematiques);
    }
  }

  function handleSousThematiqueSelectedChange(sousThematiqueId) {
    // Vérifiez si la sous-thématique est déjà sélectionnée en vérifiant si son ID existe déjà dans la liste
    const isAlreadySelected = selectedSousThematiques.some(
      (sousThematique) => sousThematique.id === sousThematiqueId
    );

    if (!isAlreadySelected) {
      // Si elle n'est pas déjà sélectionnée, ajoutez son ID à la liste
      const sousThematiqueNom = sousThematiquesFiltrees.find(
        (sousThematique) => sousThematique.id === sousThematiqueId
      ).nom;

      setSelectedSousThematiques([
        ...selectedSousThematiques,
        { id: sousThematiqueId, nom: sousThematiqueNom },
      ]);

      console.log(selectedSousThematiques);
    }
  }
  /*supprimer une sous thematique*/
  function removeSelectedSousThematique(sousThematique) {
    const updatedSelectedSousThematiques = selectedSousThematiques.filter(
      (selected) => selected.id !== sousThematique
    );
    setSelectedSousThematiques(updatedSelectedSousThematiques);
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  return (
    <PopupContainer>
      <PopupContent>
        <Title>Modifier la publication</Title>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <InputSection>
          {isSaveClicked &&
            (nom === null || nom === "") && ( // Afficher le message seulement si le bouton "Confirmer" a été cliqué
              <ErrorMessage>
                Le nom de la publication est obligatoire.
              </ErrorMessage>
            )}
          <Textarea
            rows="4"
            placeholder="Titre de la publication"
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
              setIsSaveClicked(false); // Réinitialisez le message d'erreur
            }}
          />
          <Input
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url}
            style={{ marginTop: "20px" }}
            type="text"
            placeholder="Url de la publication..."
          />
        </InputSection>
        <StyledSelect
          value={selectedThematique}
          onChange={(e) => handleThematiqueSelectedChange(e.target.value)}
        >
          <option value="">Toutes les thematiques</option>
          {Thematiques.map((thematique, index) => (
            <option key={index} value={thematique.nom}>
              {thematique.nom}
            </option>
          ))}
        </StyledSelect>
        <SelectedThematiqueContainer>
          {selectedSousThematiques.map((sousThematique, index) => (
            <SelectedThematique
              onRemove={removeSelectedSousThematique}
              subThematiquesName={sousThematique.nom}
              subThematiquesId={sousThematique.id}
              key={sousThematique.id}
            >
              {sousThematique.nom}
            </SelectedThematique>
          ))}
        </SelectedThematiqueContainer>
        {sousThematiquesFiltrees.length > 0 && (
          <StyledSelect
            value=""
            onChange={(e) => handleSousThematiqueSelectedChange(e.target.value)}
          >
            <option value="" disabled>
              Sélectionner une sous-thématique
            </option>
            {sousThematiquesFiltrees
              .filter(
                (sousThematique) =>
                  !selectedSousThematiques.includes(sousThematique.id)
              )
              .map((sousThematique) => (
                <option key={sousThematique.id} value={sousThematique.id}>
                  {sousThematique.nom}
                </option>
              ))}
          </StyledSelect>
        )}

        <ImageSection
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageDrop}
          onClick={handleFileInputClick}
        >
          {/* <ImageField src={imageUrl} alt="Event Image" /> */}
          <UploadArea>
            <FileInputContainer>
              <FileInputLabel>
                Cliquez ou glissez une image ici
                <FileInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </FileInputLabel>
            </FileInputContainer>
          </UploadArea>
        </ImageSection>

        <ButtonContainer>
          <ResetButton onClick={handleResetChanges}>Réinitialiser</ResetButton>
          <ConfirmButton onClick={handleSaveChanges}>Confirmer</ConfirmButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default EditPubPopup;
