import React from "react";
import styled from "styled-components";

export const ButtonContainer = styled.div`
`;

export const SelectedThematiqueContainer = styled.div`
  background-color: whitesmoke;
  padding: 2px 5px 5px 5px;
  color: white;
  border: none;
  width: fit-content;
  font-size: x-small;
  word-wrap: break-word;
  margin-bottom: 10px;
  flex-direction: row;
    display: flex;

`;
export const Icon = styled.img`
  color: white;
  background-image: ${({ icon }) => `url(${icon})`};
  height:60%;
  width: 60%;

  
`;


const Label = styled.p`
    margin-bottom: 5px;
    text-align: center;
    color: black;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  font-size: 12px;
  width: fit-content;
  height: fit-content;
  
  
  cursor: pointer;
  &:hover {
    color: #c82333;
  }
`;
function SelectedThematique({ subThematiquesId,subThematiquesName, onRemove }) {

  return (
    <div>
      <SelectedThematiqueContainer>
          <Label>{subThematiquesName}</Label>
          <DeleteButton onClick={() => onRemove(subThematiquesId)}>X</DeleteButton>      </SelectedThematiqueContainer>
      </div>
  );
}

export default SelectedThematique;
