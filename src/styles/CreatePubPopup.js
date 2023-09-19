import styled, { keyframes } from "styled-components";
export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 8px;
  font-size: 12px;
  align-content: left;
`;

export const SelectedThematiqueContainer = styled.div`
  
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;
`;

export const StyledSelect = styled.select`
padding: 8px;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 14px;
width : 100%;
background-color: white;
color: gray;
@media (max-width: 1075px) {
  font-size : 10px;
}
margin-bottom: 20px;
`;
export const FileInputContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

// Créez un label personnalisé pour l'input file
export const FileInputLabel = styled.label`
  margin-top: 25%;
  border: 1px solid #ccc;
  color: gray;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  height: 48px; /* Ajustez la hauteur du bouton */
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Créez un input file masqué (display: none) pour gérer le téléchargement de l'image
export const FileInput = styled.input.attrs({ type: 'file', accept: 'image/*' })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const ImageSection = styled.div`
  align-items: center;
  gap: 150px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  height: 200px;
`;

export const UploadArea = styled.div`
 // je veux que le contenu soit l'une sur l'autre

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

`;

export const ImageField = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10%;
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Light gray background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-in-out;
`;




export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
export const Title = styled.h1`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
    color: black;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const ConfirmButton = styled.button`
   width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: blue;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#0056b3" : props.danger ? "#c82333" : "#e0e0e0"};
  }
`;
export const UploadButton = styled.button`
   width: 200px;
  height: 45px;
  border: none;
  background-color: blue;
  color: white;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#0056b3" : props.danger ? "#c82333" : "#e0e0e0"};
  }
`;

export const ResetButton = styled.button`
   width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: #ffc907;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#0056b3" : props.danger ? "#c82333" : "#e0e0e0"};
  }
`;
export const LeaveButton = styled.button`
   width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: red;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#0056b3" : props.danger ? "#c82333" : "#e0e0e0"};
  }
`;



export const PopupContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 10px 10px 10px rgba(0.2, 0.2, 0.2, 0.2);
  max-width: 800px;
  width: 70%; /* Adjust the width as per your requirements */
  position: relative; /* Add position relative */
  margin-top: 100px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  position: absolute;
  top: 10px;
  right: 20px;
  width: fit-content;
  height: fit-content;


`;
export const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical; /* Allow the textarea to resize vertically */
`;