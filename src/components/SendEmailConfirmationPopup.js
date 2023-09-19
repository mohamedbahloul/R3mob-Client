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
  LeaveButton,
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

const SendEmailConfirmationPopup = ({ onClose }) => {
    return (
      <PopupContainer>
        <PopupContent>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <Title>Un email vous a été envoyé. Veuillez consulter votre boîte de réception.</Title>
          <p style={{
            color: "black",
            fontSize: "1rem",
          }}>
            Si vous ne trouvez pas l'email dans votre boîte de réception, veuillez vérifier votre dossier de spam.
            Si vous avez encore des problèmes, veuillez nous contacter à l'adresse suivante :{" "}
            <a href="mailto:cedrik.ferrero@bordeaux-inp.fr">cedrik.ferrero@bordeaux-inp.fr</a>.
          </p>
          <ButtonContainer>
            <LeaveButton onClick={onClose}>Quitter</LeaveButton>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    );
  };
  
  export default SendEmailConfirmationPopup;
  
