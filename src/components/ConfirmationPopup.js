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

const ConfirmationPopup = ({onSave, onClose }) => {

  return (
    <PopupContainer>
      <PopupContent>
        <Title>Voulez vous vraiment suprimer cette publication?</Title>
        <ButtonContainer>
          <ResetButton onClick={onClose}>Annuler</ResetButton>
          <ConfirmButton onClick={onSave}>Confirmer</ConfirmButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default ConfirmationPopup;
