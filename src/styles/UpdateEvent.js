import styled from "styled-components";
import Colors from "./Colors";


export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Pour centrer horizontalement */
  align-items: center; /* Pour centrer verticalement */
  margin-top: 100px;
  width: 100%;
  `;
export const StatusButton = styled.button`
  width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: ${props => props.isPrivate === 't' ? 'red' : 'gray'};
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props =>
      props.isPrivate === 't' ? 'darkred' : 'darkgray'};
  }
`;

export const ChooseButtonsContainer = styled.div`
  margin-bottom: 20px;
  align-items: center;
  margin-top: 120px;
`;
export const ChooseButton = styled.button`
  background-color: ${(props) => (props.active ? Colors.color2 : Colors.color5)};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 0px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 0;
  margin-left: 0;
`;

export const Container = styled.div`
  padding: 20px;
  height: 100vh;
  width: 70%;
`;

export const Button = styled.button`
  background-color: ${Colors.color1};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background-color: ${Colors.color2};
  color: #fff;
  padding: 10px;
`;

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  word-break: break-all;
  /* width: 30%; */
`;

export const ButtonDelete = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
`;

export const ButtonEdit = styled.button`
  background-color: #ffc107;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  width: fit-content;
  cursor: pointer;
`;

export const TdActions = styled.td`
  display: flex;
  gap: 10px;
  justify-content: center;
  border: 1px solid #ccc;
`;