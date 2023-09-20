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

const 
ResetPasswordPopup = ({ onSave, onClose }) => {
  const [email, setEmail] = useState(null);
  const handleSaveChanges = () => {
    axios.post("http://localhost:3001/auth/reset-password", {
      email: email,
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        onClose();
      } else {
        alert("Un email a été envoyé à l'adresse indiquée. Veuillez vérifier votre boîte de réception. Si vous ne recevez pas l'email, veuillez vérifier votre dossier de courrier indésirable.");
        onSave();
      }
    });
    
  };

  

  return (
    <PopupContainer>
      <PopupContent>
        <Title style={{
          color: "#000000",
        }}>Réinitialisation du mot de passe</Title>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <InputSection>
          <Label>Email</Label>
          <p style={{
            color: "#000000",
            fontSize: "14px",
          }}>Saisissez l'adresse e-mail que vous avez utilisée pour vous enregistrer auprès de nous. Nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
          <Input
            type="text"
            placeholder="Votre Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputSection>

        <ButtonContainer>
          <ConfirmButton onClick={handleSaveChanges}>Envoyer</ConfirmButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
}

export default ResetPasswordPopup;
