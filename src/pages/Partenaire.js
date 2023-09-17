import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import Footer from "../components/Footer";
import { InputSection, Label, Input, StyledSelect } from "../styles/Agenda";
import { FaSearch } from "react-icons/fa";

const HorizontalLine = styled.hr`
  background-color: lightgray;
  border: 0cap;

  width: 100px; /* Adjust the width of the horizontal line as needed */
  margin-right: 10px; /* Add some right margin to separate the line from the text */
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Deux éléments par ligne */
  gap: 30px 250px; /* Espacement entre les éléments */
`;

const Li = styled.li`
  margin-bottom: 30px;
  position: relative;
  color: ${Colors.color1};
  font-size: 1rem;
  padding-left: 0; /* Supprime la marge intérieure à gauche */
  justify-self: start; /* Aligne les éléments à gauche */

  /* changer la couleur du texte au survol */
  &:hover a {
    color: ${Colors.color1};
  }

  /* changer la couleur des liens visités */
  a:visited {
    color: ${Colors.color1};
  }

  /* changer la couleur des liens non visités */
  a:link {
    color: ${Colors.color1};
  }
`;

const TooltipContent = styled.div`
  margin-left: 50%;
  margin-top: 2%;
  position: absolute;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 10px;
  display: ${(props) => (props.visible ? "block" : "none")};
  z-index: 999;
  color: black;
`;
const ReinitialiserButton = styled.button`
  margin-top: 30px;
`;
const mainStyles = {
  display: "flex",
  flexDirection: "column", // Pour aligner les éléments verticalement
  alignItems: "flex-start", // Pour centrer horizontalemen
  marginTop: "100px",

};

function Partenaire() {
  const [partenaire, setPartenaire] = useState([]);
  const [r3p, setR3p] = useState([]);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/etablissement/partenaire")
      .then((response) => {
        setPartenaire(response.data);
      });
      axios
      .get("http://localhost:3001/etablissement/r3partenaire")
      .then((response) => {
        setR3p(response.data);
      });
  }, []);
  const filteredLaboratoires = partenaire.filter((item) =>
    item.nom.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">
          <p
            style={{
              color: "gray",
              fontSize: "16px",
              marginBottom: "25px",
              display: "flex",
              alignItems: "left",
              fontWeight: "bold",
              marginTop: "150px",
            }}
          >
            Filtrer par <HorizontalLine />
          </p>
          <InputSection>
            <div style={{ position: "relative" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />

              <Input
                type="text"
                placeholder="Rechercher par nom"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </InputSection>

          <ReinitialiserButton>Réinitialiser les filtres</ReinitialiserButton>
        </aside>
        <main style={mainStyles}>
        {/* <h2>R3 Partenaires</h2>
          <h4 style={{ fontWeight: "normal", fontSize: "1.3rem" }}>
            Nous collaborons avec 3 R3 partenaires. 
          </h4>
          <Ul>
            {r3p.map((item, index) => (
              <Li
                key={item.id}
                onMouseEnter={() => setTooltipIndex(index)}
                onMouseLeave={() => setTooltipIndex(null)}
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.nom}
                </a>
                {item.label && (
                  <TooltipContent visible={tooltipIndex === index}>
                    <span className="label-text">{item.label}</span>
                  </TooltipContent>
                )}
              </Li>
            ))}
          </Ul> */}
          <h2>Partenaires</h2>
          <h4 style={{ fontWeight: "normal", fontSize: "1.3rem" }}>
            Nous collaborons avec de nombreux partenaires. En voici quelques-uns
            :
          </h4>
          <Ul>
            {filteredLaboratoires.map((item, index) => (
              <Li
                key={item.id}
                onMouseEnter={() => setTooltipIndex(index)}
                onMouseLeave={() => setTooltipIndex(null)}
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.nom}
                </a>
                {item.label && (
                  <TooltipContent visible={tooltipIndex === index}>
                    <span className="label-text">{item.label}</span>
                  </TooltipContent>
                )}
              </Li>
            ))}
          </Ul>
        </main>
        <aside className="right">
          <ScrollButton />
          <CarteButton />
        </aside>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Partenaire;
