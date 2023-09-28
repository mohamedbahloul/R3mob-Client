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
  ConfirmButton,
  ButtonContainer,
  ImageSection,
  UploadArea,
  FileInput,
  FileInputLabel,
  FileInputContainer,

} from "../styles/CreatePubPopup";

import { AuthContext } from "../helpers/AuthContext";
import Chercheur from "../pages/Chercheur";

const ChangerPhotoPopup = ({ chercheurId,onSave, onClose }) => {
  const { authState } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);


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


  const handleSaveChanges = async () => {
    console.log("handleSaveChanges");
    const formData = new FormData();
    formData.append("selectedImage", selectedImage);
    formData.append("userId", authState.id);

    try {
      await axios.put(`http://localhost:3001/perso/changeImage/${chercheurId}`, formData, {
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






  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  return (
    <PopupContainer>
      <PopupContent>
        <Title>Modifier votre photo de profile</Title>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
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
          <ConfirmButton onClick={handleSaveChanges}>Confirmer</ConfirmButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default ChangerPhotoPopup;
