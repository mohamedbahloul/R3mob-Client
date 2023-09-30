import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {
  Button,
  Table,
  Th,
  Td,
  TdActions,
  TableContainer,
} from "../styles/UpdateEvent";

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

function UpdateActeurCounts() {
  const [counts, setCounts] = useState({
    Acteur_R3MOB: 0,
    Laboratoire_Scientifique: 0,
    Universite: 0,
    Autre_Etablissement: 0,
    Partenaire: 0
  });

  const [newCounts, setNewCounts] = useState({
    Acteur_R3MOB: "",
    Laboratoire_Scientifique: "",
    Universite: "",
    Autre_Etablissement: "",
    Partenaire: ""
  });

  useEffect(() => {
    axios.get('http://back.r3mob.fr/annuaire/acteurCount').then((response) => {
      setCounts(response.data);
    });
  }, []);

  const handleUpdateSingleCount = (field) => {
    axios.put(`http://back.r3mob.fr/annuaire/acteurCount/${field}`, {
      count: newCounts[field]
    }).then((response) => {
      // Mettre à jour l'état avec la nouvelle valeur
      setCounts({ ...counts, [field]: response.data.count });
    });
  };

  const handleUpdateAllCounts = () => {
    axios.put('http://back.r3mob.fr/annuaire/acteurCount', newCounts).then((response) => {
      // Mettre à jour l'état avec les nouvelles valeurs
      setCounts(response.data);
    });
  };

  return (
    <TableContainer>
      <Table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <Th >Nom du champ</Th>
            <Th >Nombre d'acteur</Th>
            <Th >Actions</Th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(counts).map((field) => (
            <tr key={field}>
              <Td >{field}</Td>
              <Td >{counts[field]}</Td>
              <Td style={{ border: '1px solid #ccc',display : "flex",gap:"10px",justifyContent:"center" }}>
                <input
                  type="text"
                  placeholder={`Nouveau nombre de ${field}`}
                  value={newCounts[field]}
                  onChange={(e) => setNewCounts({ ...newCounts, [field]: e.target.value })}
                />
                <button onClick={() => handleUpdateSingleCount(field)}>Modifier le nombre</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button
        style={{
          padding: "15px 20px 20px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          width: "auto",
          marginTop: "20px",
        }}
        onClick={handleUpdateAllCounts}
      >
        Modifier tous les nombres
      </button>
    </TableContainer>
  );
}

export default UpdateActeurCounts;
