import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {
  Button,
  Table,
  Th,
  Td,
  TdActions,
} from "../styles/UpdateEvent";

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

function VerifyUrl() {
  const [urls, setUrls] = useState([]);
  const [modifiedLinks, setModifiedLinks] = useState({});
  const [newLinks, setNewLinks] = useState([]);

  const handleLinkChange = (event, url) => {
    const { value } = event.target;
    setModifiedLinks((prevLinks) => ({ ...prevLinks, [url.id]: value }));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/urls`).then((res) => {
        setUrls(res.data);
    });
    }, []);

  const handleVerifyLinks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/urls/verify`);
      setUrls(response.data.etabs);
      response.data.etabs.forEach((etab) => {
        handleStoreUrls(etab);
        }
        );
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const handleStoreUrls = async (etab) => {
    try {
      const newUrl = {
        idEtab: etab.id,
        nom: etab.nom,
        type: "etablissement", 
        url: etab.url, 
      };

      const response = await axios.post(`http://localhost:3001/urls`, newUrl);
      console.log("New URL created:", response.data);
    } catch (error) {
      console.error("Error creating new URL:", error);
    }
  };

  const handleModifyClick = (url) => {
    const newLinkText = modifiedLinks[url.id] || url.url;
    axios
      .put(`http://localhost:3001/etablissement/updateUrl/${url.id}`, {
        newUrl: newLinkText,
      })
      .then(() => {
        setModifiedLinks((prevLinks) => ({ ...prevLinks, [url.id]: "" }));
        setUrls((prevUrls) => { 
          return prevUrls.map((u) => {
            if (u.id === url.id) {
              return { ...u, url: newLinkText };
            }
            return u;
          });
        }
        );
      })
      .catch((error) => {
        console.error("Error updating URL:", error);
      });
  };


  return (
    <div style={{marginTop: "100px"}}>
      <Button onClick={handleVerifyLinks}>Lancer une Vérification</Button>
      <Table>
          <thead>
            <tr>
              <Th>Etablissement</Th>
              <Th>Url</Th>
              <Th>Actions</Th>

            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id}>
                <Td>{url.nom}</Td>
                <Td>{url.url}</Td>
                
                  <TdActions>
                  <input
                  type="text"
                  placeholder="Insérer le nouveau lien"
                  value={modifiedLinks[url.id] || ""}
                  onChange={(e) => handleLinkChange(e, url)}
                />
                <button onClick={() => handleModifyClick(url)}>Modifier le lien</button>
                  </TdActions>
               
              </tr>
            ))}
          </tbody>
        </Table>

    </div>
  );
}

export default VerifyUrl;
