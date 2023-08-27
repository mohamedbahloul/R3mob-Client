import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Colors from "../styles/Colors";

import {
  CardContainer,

} from "../styles/CarteActeur";

const Name = styled.h1`
  margin-top: 80;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Colors.color3};
  margin-left: 5px;
  margin-right: 5px;
`;
const Nombre = styled.h1`
  margin-top: 80;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Colors.color3};
`;
const Image = styled.img`
  margin-top: 10px;
  width: 50%;
  height: 50%;
  object-fit: cover;
  top: 0;
  left: 0;
`;

const CarteActeur = ({ name, nombre,image }) => {
  const backgroundImage = `url(${image})`;

  return (
    <CardContainer>
      <Image src={image}></Image>
      <Nombre>{nombre}</Nombre>
      <Name>{name}</Name>
    </CardContainer>
  );
};

export default CarteActeur;
