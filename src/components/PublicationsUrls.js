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
  const [publications, setPublications] = useState([]);


  useEffect(() => {
    axios.get('http://back.r3mob.fr/publication').then((response) => {
        setPublications(response.data);
    });
  }, []);


  return (
    <TableContainer>
      <Table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <Th >Description publication</Th>
            <Th >Nom chercheur</Th>
            <Th >Lien publication</Th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication,index) => (
            <tr key={index}>
              <Td style={{
                width: '30%',
              }}>{publication.nom}</Td>
              <Td >{publication.chercheurs[0]}</Td>
              <Td>{publication.url}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      </TableContainer>
  );
}

export default UpdateActeurCounts;
