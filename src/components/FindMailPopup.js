import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PopupContainer,
  Title,
  CloseButton,
  PopupContent,
  ResetButton,
  ButtonContainer,
  Input,
  Label,
  InputSection,
} from "../styles/CreatePubPopup";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Ul = styled.ul`
  list-style-type: circle;
  margin: 0;
  padding: 0;
  background-color: white;
  border: 1px solid #e7e7e7;
  max-height: 200px; /* Ajustez la hauteur maximale selon vos besoins */
  overflow-y: scroll; /* Ajoute une barre de défilement si nécessaire */
`;

const Li = styled.li`
  display: block; /* Affiche chaque élément de la liste sur une ligne distincte */
  color: black;
  font-size: 1rem;
`;

const FindMailPopup = ({  onClose }) => {
  const [nom, setNom] = useState("");
  const [emailsPerso, setEmailsPerso] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/perso/emails`).then((res) => {
      setEmailsPerso(res.data);
    });
  }, []);

  // Fonction de mise à jour des suggestions
  useEffect(() => {
    if (nom.trim() === "") {
      setSuggestions([]); // Aucune suggestion si le champ est vide
    } else {
      const filteredSuggestions = emailsPerso.filter((email) =>
        email.username.trim().toLowerCase().includes(nom.trim().toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [nom, emailsPerso]);

  const handleResetChanges = () => {
    setNom("");
    setSuggestions([]);
  };

  return (
    <PopupContainer>
      <PopupContent>
        <Title>Trouver votre email</Title>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <InputSection>
          <Label>Nom:</Label>
          <Input
            onChange={(e) => {
              setNom(e.target.value);
            }}
            type="text"
            placeholder="Insérer votre nom"
            value={nom}
          />
        </InputSection>
        <Ul>
          {suggestions.map((suggestion) => (
            <Li key={suggestion.username}>{suggestion.email}</Li>
          ))}
        </Ul>
        <ButtonContainer>
          <ResetButton onClick={handleResetChanges}>Réinitialiser</ResetButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default FindMailPopup;
