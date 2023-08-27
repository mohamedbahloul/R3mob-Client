import styled from 'styled-components';

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const ScrollButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 70px;
  width: 70px;
`;
export const Icon = styled.span`
margin-right: 5px;
color: white;
font-size: x-large;
`;
