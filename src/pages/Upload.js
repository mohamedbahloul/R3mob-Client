import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../helpers/AuthContext";
import { Navigate } from "react-router-dom";

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 5px;
  margin-top: 50px;
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
  width: 100%;
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
  width: 400px;
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

function Upload() {
  const [selectedZipFile, setSelectedZipFile] = useState(null);
  const [selectedJsonFile, setSelectedJsonFile] = useState({
    thoughts: null,
    links: null,
    calendarevents: null,
    attachments: null,
  });
  const { authState } = useContext(AuthContext);

  const handleUploadAll = async () => {
    if (
      !selectedZipFile ||
      !selectedJsonFile.thoughts ||
      !selectedJsonFile.links ||
      !selectedJsonFile.calendarevents ||
      !selectedJsonFile.attachments
    ) {
      // Show an alert to the user if any JSON file is missing
      alert("Please select all JSON files before uploading.");
      return;
    }

    await handleZipFileUpload();
    await handleJsonFileUpload();
    await VerifyDataBase();
  };

  const handleZipFileUpload = async () => {
    if (!selectedZipFile) {
      console.error("Aucun fichier ZIP sélectionné");
      return;
    }

    const formData = new FormData();
    formData.append("zipFile", selectedZipFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/uploadBase/folders",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload de fichier ZIP (dossiers) réussi", response.data);
    } catch (error) {
      console.error("Upload de fichier ZIP (dossiers) échoué", error);
    }
  };

  const handleJsonFileUpload = async () => {
    if (!selectedJsonFile) {
      console.error("Aucun fichier JSON sélectionné");
      return;
    }

    for (const [key, value] of Object.entries(selectedJsonFile)) {
      if (!value) {
        console.error(`Aucun fichier JSON ${key} sélectionné`);
        return;
      }
      const formData = new FormData();
      formData.append("jsonFile", value);

      try {
        const response = await axios.post(
          "http://localhost:3001/uploadBase/json",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Upload de fichier JSON réussi", response.data);
      } catch (error) {
        console.error("Upload de fichier JSON échoué", error);
      }
    }
  };

  const handleZipFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedZipFile(file);
  };

  const handleJsonFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedJsonFile(file);
  };

  const VerifyDataBase = async () => {
    try {
      const verifyResponse = await axios.get(
        "http://localhost:3001/uploadBase/verifyFiles"
      );

      if (verifyResponse.data.error) {
        alert(verifyResponse.data.error);
      } else {
        console.log("BD Verified!!!!");
      }
    } catch (error) {
      console.error("Vérification de la base de données échouée", error);
    }
  };

  const ClearDataBase = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("http://localhost:3001/brain/clear");
        console.log("Vidage de la base de données réussi", response.data);
        resolve(response.data); // Renvoie la réponse
      } catch (error) {
        console.error("Vidage de la base de données échoué", error);
        reject(error); // Rejette la promesse en cas d'erreur
      }
    });
  };
  const UpdateDataBase = async () => {
    // try {
    //   const response = await axios.post("http://localhost:3001/brain");
    //   if (response.data.error) {
    //     alert(response.data.error);
    //   } else {
    //     console.log("Mise à jour de la base de données réussie");
    //   }
    // } catch (error) {
    //   console.error("Mise à jour de la base de données échouée", error);
    //   throw error;
    // }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("http://localhost:3001/brain");
        console.log("Mise à jour de la base de données réussie");
        resolve(response.data); 
      } catch (error) {
        console.error("Mise à jour de la base de données échouée", error);
        alert(error);
        reject(error); // Rejette la promesse en cas d'erreur
      }
    });
  };
  const handleClearAndUpdate = async () => {
    try {
      await ClearDataBase().then(async (res) => {
        console.log("BD cleared!!!!");
  
        // Utilisez setTimeout pour appeler UpdateDataBase après 2 secondes
        setTimeout(async () => {
          await UpdateDataBase().then((res) => {

          console.log("BD updated!!!!yahoooooo");
          alert("Upload completed successfully!");
          });
        }, 2000); // 2000 millisecondes équivalent à 2 secondes
      });
    } catch (error) {
      console.error("Erreur lors de l'upload", error);
    }
  };
  


  

  

  return authState.status == true && authState.role === true ? (
    <div style={{ marginTop: "100px" }}>
      <InputSection>
        <Label>Télécharger un fichier ZIP (pour les dossiers)</Label>
        <Input type="file" accept=".zip" onChange={handleZipFileSelection} />
      </InputSection>
      <InputSection>
        <Label>Télécharger un thoughts.json</Label>
        <Input
          type="file"
          accept=".json"
          onChange={(event) => {
            const file = event.target.files[0];
            selectedJsonFile.thoughts = file;
          }}
        />
      </InputSection>
      <InputSection>
        <Label>Télécharger un links.json</Label>
        <Input
          type="file"
          accept=".json"
          onChange={(event) => {
            const file = event.target.files[0];
            selectedJsonFile.links = file;
          }}
        />
      </InputSection>
      <InputSection>
        <Label>Télécharger un calendarevents.json</Label>
        <Input
          type="file"
          accept=".json"
          onChange={(event) => {
            const file = event.target.files[0];
            selectedJsonFile.calendarevents = file;
          }}
        />
      </InputSection>
      <InputSection>
        <Label>Télécharger un attachments.json</Label>
        <Input
          type="file"
          accept=".json"
          onChange={(event) => {
            const file = event.target.files[0];
            selectedJsonFile.attachments = file;
          }}
        />
        <ConfirmButton onClick={handleUploadAll}>Upload</ConfirmButton>
        {/* <ConfirmButton onClick={ClearDataBase}>
          Vider la base de données
        </ConfirmButton> */}
        <ConfirmButton onClick={handleClearAndUpdate}>
          Mettre à jour la base de données
        </ConfirmButton>
      </InputSection>
    </div>
  ) : (
    <Navigate to="/404" />
  );
}

export default Upload;
