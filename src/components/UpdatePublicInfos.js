import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import {
  Table,
  Th,
  Td,
  TableContainer,
} from "../styles/UpdateEvent";

 const ConfirmButton = styled.button`
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
const ResetButton = styled.button`
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
 const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
`;
const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical; /* Allow the textarea to resize vertically */
`;

function UpdatePublicInfos() {
  const [originalJsonData, setOriginalJsonData] = useState({});
  const [jsonData, setJsonData] = useState({
    lienCartographie: "",
    Apropos: {
      descriptionReseau: "",
      enjeuxReseaux: "",
    },
    reseauxSociaux: {
      Facebook: "",
      Instagram: "",
      Twitter: "",
      LinkedIn: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/infos/all")
      .then((response) => {
        setJsonData(response.data);
        setOriginalJsonData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du fichier JSON : ", error);
      });
  }, []);
  const handleInputChange = (event, field, subField = "") => {
    const newValue = event.target.value;
    setJsonData((prevData) => {
      if (subField) {
        return {
          ...prevData,
          [field]: {
            ...prevData[field],
            [subField]: newValue,
          },
        };
      } else {
        return {
          ...prevData,
          [field]: newValue,
        };
      }
    });
  };

  const updateJsonFile = () => {
    console.log("Mise à jour du fichier JSON...");
    axios
      .put("http://localhost:3001/infos", jsonData) 
      .then((response) => {
        console.log("Fichier JSON mis à jour avec succès.");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du fichier JSON : ",
          error
        );
      });
  };
  const resetJsonData = () => {
    // Réinitialisez les données JSON à partir de la copie d'origine
    setJsonData(originalJsonData);
  };
  // const updateJsonValue = (field, subField, newValue) => {
  //   setJsonData((prevData) => {
  //     if (subField) {
  //       return {
  //         ...prevData,
  //         [field]: {
  //           ...prevData[field],
  //           [subField]: newValue,
  //         },
  //       };
  //     } else {
  //       return {
  //         ...prevData,
  //         [field]: newValue,
  //       };
  //     }
  //   });
  // };

  return (
    <TableContainer>
      <Table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <Th>Nom du champ</Th>
            <Th>Valeur Actuelle</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td
              style={{
                width: "10%",
              }}
            >
              Lien Cartographie
            </Td>
            <Td
              style={{
                width: "70%",
              }}
            >
              {jsonData.lienCartographie}
            </Td>
            <Td
              style={{
                border: "1px solid #ccc",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Input
                type="text"
                placeholder="Nouvelle valeur lien cartographie"
                value={jsonData.lienCartographie} // Lier la valeur du champ d'entrée à la valeur JSON actuelle
                onChange={(event) =>
                  handleInputChange(event, "lienCartographie")
                } // Appeler la fonction de gestion de la saisie lorsqu'une modification est apportée
              />
              {/* <button
                onClick={() => {
                   // Obtenez la nouvelle valeur à partir du champ d'entrée ou d'une autre source
                    updateJsonValue("lienCartographie", "", jsonData.lienCartographie);
                }}
              >
                Modifier la valeur
              </button> */}
            </Td>
          </tr>
          <tr>
            <Td
              style={{
                width: "30%",
              }}
            >
              Description à propos
            </Td>
            <Td>{jsonData.Apropos.descriptionReseau}</Td>
            <Td
              style={{
                border: "1px solid #ccc",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Textarea
                rows="4"
                cols="50"
                placeholder="Nouvelle description à propos"
                value={jsonData.Apropos.descriptionReseau} // Lier la valeur du champ de texte à la valeur JSON actuelle
                onChange={(event) =>
                  handleInputChange(event, "Apropos", "descriptionReseau")
                } // Appeler la fonction de gestion de la saisie pour cette sous-clé
              />
              {/* <button
                onClick={() => {
                  const newValue = // Obtenez la nouvelle valeur à partir du champ d'entrée ou d'une autre source
                    updateJsonValue("Apropos", "descriptionReseau", newValue);
                }}
              >
                Modifier la valeur
              </button>{" "} */}
              {/* Vous devrez définir cette fonction pour mettre à jour la valeur dans l'objet JSON */}
            </Td>
          </tr>
          <tr>
            <Td
              style={{
                width: "30%",
              }}
            >
              Facebook
            </Td>
            <Td>{jsonData.reseauxSociaux.Facebook}</Td>
            <Td
              style={{
                border: "1px solid #ccc",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Input
                type="text"
                placeholder="Nouveau lien Facebook"
                value={jsonData.reseauxSociaux.Facebook} // Lier la valeur du champ de texte à la valeur JSON actuelle
                onChange={(event) =>
                  handleInputChange(event, "reseauxSociaux", "Facebook")
                }
              />
              {/* <button
                onClick={() => {
                  const newValue = // Obtenez la nouvelle valeur à partir du champ d'entrée ou d'une autre source
                    updateJsonValue("reseauxSociaux", "Facebook", newValue);
                }}
              >
                Modifier la valeur
              </button> */}
            </Td>
          </tr>
          <tr>
            <Td
              style={{
                width: "30%",
              }}
            >
              Linkedin
            </Td>
            <Td>{jsonData.reseauxSociaux.LinkedIn}</Td>
            <Td
              style={{
                border: "1px solid #ccc",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Input
                type="text"
                placeholder="Nouveau lien Linkedin"
                value={jsonData.reseauxSociaux.LinkedIn} // Lier la valeur du champ de texte à la valeur JSON actuelle
                onChange={(event) =>
                  handleInputChange(event, "reseauxSociaux", "LinkedIn")
                }
              />
              {/* <button
                onClick={() => {
                  const newValue = // Obtenez la nouvelle valeur à partir du champ d'entrée ou d'une autre source
                    updateJsonValue("reseauxSociaux", "LinkedIn", newValue);
                }}
              >
                Modifier la valeur
              </button> */}
            </Td>
          </tr>
          <tr>
            <Td
              style={{
                width: "30%",
              }}
            >
              Twitter
            </Td>
            <Td>{jsonData.reseauxSociaux.Twitter}</Td>
            <Td
              style={{
                border: "1px solid #ccc",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Input
                type="text"
                placeholder="Nouveau lien Twitter"
                value={jsonData.reseauxSociaux.Twitter} // Lier la valeur du champ de texte à la valeur JSON actuelle
                onChange={(event) =>
                  handleInputChange(event, "reseauxSociaux", "Twitter")
                }
              />
              {/* <button
                onClick={() => {
                  const newValue = // Obtenez la nouvelle valeur à partir du champ d'entrée ou d'une autre source
                    updateJsonValue("reseauxSociaux", "Twitter", newValue);
                }}
              >
                Modifier la valeur
              </button> */}
            </Td>
          </tr>
          <tr>
            <Td
              style={{
                width: "30%",
              }}
            >
              Instagram
            </Td>
            <Td>{jsonData.reseauxSociaux.Instagram}</Td>
            <Td
              style={{
                border: "1px solid #ccc",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Input
                type="text"
                placeholder="Nouveau lien Instagram"
                value={jsonData.reseauxSociaux.Instagram} // Lier la valeur du champ de texte à la valeur JSON actuelle
                onChange={(event) =>
                  handleInputChange(event, "reseauxSociaux", "Instagram")
                }
              />
              {/* <button
                onClick={() => {
                  const newValue = // Obtenez la nouvelle valeur à partir du champ d'entrée ou d'une autre source
                    updateJsonValue("reseauxSociaux", "Instagram", newValue);
                }}
              >
                Modifier la valeur
              </button> */}
            </Td>
          </tr>
        </tbody>
      </Table>
      <ButtonContainer>
      <ConfirmButton
        onClick={updateJsonFile}
        style={{
          padding: "15px 20px 20px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          width: "auto",
          marginTop: "20px",
        }}
      >
        Modifier toutes les valeurs
      </ConfirmButton>
      <ResetButton
        onClick={resetJsonData}
        style={{
          padding: "15px 20px 20px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          width: "auto",
          marginTop: "20px",
        }}
      >
        Réinitialiser les valeurs
      </ResetButton>
      </ButtonContainer>
    </TableContainer>
  );
}

export default UpdatePublicInfos;
