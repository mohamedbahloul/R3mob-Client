import React, { useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
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
} from "../styles/EditEventPopup";

const EditEventPopup = ({ event, onSave, onClose }) => {
  const [nom, setNom] = useState(event.nom);
  const [startDateTime, setStartDateTime] = useState(new Date(event.startDateTime));
  const [location, setLocation] = useState(event.location);
  const [id, setId] = useState(event.id);
  const [description, setDescription] = useState(event.description);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    setSelectedImage(e.target.files[0]);
    if (!selectedImage) return; // No file selected, do nothing
  };

  const handleResetChanges = () => {
    setNom(event.nom);
    setStartDateTime(new Date(event.startDateTime));
    setLocation(event.location);
    setDescription(event.description);
    setSelectedImage(null);
  };

  const handleSaveChanges = () => {
    // Combine date and time into a single string with the desired format
    const formattedDateTime = startDateTime.toISOString().slice(0, 16);

    const updatedEvent = {
      ...event,
      nom,
      startDateTime: formattedDateTime,
      location,
      description,
      selectedImage,
    };

    onSave(updatedEvent);
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

  return (
    <PopupContainer>
      <PopupContent>
        <Title>Changer l'événement</Title>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <InputSection>
          <Label>Nom:</Label>
          <Input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </InputSection>
        <InputSection>
          <Label>Date et Heure de début:</Label>
          <DatePicker
            selected={startDateTime}
            onChange={(date) => setStartDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="2021-05-20 18:00"
          />
        </InputSection>
        <InputSection>
          <Label>Location:</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </InputSection>
        <InputSection>
          <Label>Description:</Label>
          <Textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputSection>
        <ImageSection>
          <ImageField src={imageUrl} alt="Event Image" />
          <UploadArea>
            <FileInputContainer>
              <FileInputLabel>
                Sélectionner une image
                <FileInput onChange={handleImageUpload} />
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
}

export default EditEventPopup;
