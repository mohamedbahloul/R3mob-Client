import React, { useState, useEffect } from "react";
// import {
//   ButtonContainer,
//   ScrollButton,
//   Icon,
// } from "../styles/ThematiqueIcon.style";
import styled from "styled-components";

export const ButtonContainer = styled.div`
`;

export const ScrollButton = styled.button`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  border: none;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  @media (max-width: 1329px) {
    height: 25px;
    width: 25px;
  }
`;
export const Icon = styled.img`
  color: white;
  background-image: ${({ icon }) => `url(${icon})`};
  height:60%;
  width: 60%;

  
`;
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  @media (max-width: 1329px) {
    height: 30px;
    width: 30px;
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px 20px 20px 20px;
  width: 200px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.visible ? "block" : "none")};
  font-size: 10px;
  @media (max-width: 1329px) {
    font-size: 7px;
    width: 120px;
    padding: 10px 10px 10px 10px;
  }
`;
function ThematiqueIcon({ icon, backgroundColor, subThematiques }) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  return (
    <TooltipContainer
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
      <ScrollButton backgroundColor={backgroundColor}>
          <Icon src={icon} alt="Icon" />
      </ScrollButton>
      <TooltipContent visible={showTooltip}>
      {subThematiques.map((subThematique, index) => (
          <div key={index}>{subThematique}</div>
        ))}
      </TooltipContent>
    </TooltipContainer>
  );
}

export default ThematiqueIcon;
