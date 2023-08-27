import styled from 'styled-components';
import Carte from '../assets/Carte.PNG';
import Colors from "./Colors.js"

export const CardLegend = styled.h5`
  color: black;
  text-align: center;
  margin-top: 3px;
  font-size: 1.3rem;
  font-weight : normal;

`;

export const ButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  align-items: center;
  right: 20px;
  z-index: 999;
`;

export const CarteBttn = styled.button`
  background-color: ${Colors.color3};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 12.6vh;
  width: 11vw;
  background-image: url(${Carte});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  &:hover::after {
    content: "Afficher la cartographie";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
  }

  &:hover::after span {
    padding: 20px;
    background-color: white;
    color: black;
    border: 2px solid white;
    border-radius: 5%;
  }
`;

export const Icon = styled.span`
margin-right: 5px;
color: white;
font-size: xx-large;

`;
export const Tooltip = styled.button`
  position: absolute;
  left: 0;
  top: 0%;
  transform: translateX(-90%);
  color: white;

  border-radius: 5px;
  font-size: large;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  height: 70px;
  width: 170px;
`;
