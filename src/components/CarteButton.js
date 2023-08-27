import React, { useState, useContext } from "react";
import {
  ButtonContainer,
  CarteBttn,
  Icon,
  Tooltip,
  CardLegend,
} from "../styles/CarteButton.style";
import { FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CarteButton() {
  const { authState } = useContext(AuthContext);
  // const [isTooltipVisible, setTooltipVisible] = useState(false);
  // const handleMouseEnter = () => {
  //   setTooltipVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   setTooltipVisible(false);
  // };

  return (
<>      {authState.status && (
        <Link to="/carte" target="_blank" rel="noopener noreferrer">
          <ButtonContainer>
            <CarteBttn
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            >
              {/* <Icon>
                <FaBrain />
                {isTooltipVisible && <Tooltip>Carte heuristique</Tooltip>}
              </Icon> */}
            </CarteBttn>
            <CardLegend>Cartographie</CardLegend>
          </ButtonContainer>
        </Link>
      )}
    </>
  );
}

export default CarteButton;
