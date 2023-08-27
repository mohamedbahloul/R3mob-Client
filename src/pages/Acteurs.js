import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import styled from "styled-components";
import Footer from "../components/Footer";
import CarteActeur from "../components/CarteActeur";
import { CardsContainer } from "../styles/CarteActeur";
const PageLink = styled.a`
  text-decoration: none; 
  color: inherit; 
`;
function Acteurs() {
  const [counts, setCounts] = useState({
    Chercheurs: 0,
    Laboratoires: 0,
    Universités: 0,
    AutresÉtablissements: 0,
    Partenaires: 0,
  });
  useEffect(() => {
    // Faites l'appel à l'API pour récupérer les counts
    fetch("http://localhost:3001/etablissement/etabCount")
      .then((response) => response.json())
      .then((data) => setCounts(data))
      .catch((error) => console.error(error));

      fetch("http://localhost:3001/perso/chercheursCount")
      .then((response) => response.json())
      .then((data) => setCounts((prevCounts) => ({ ...prevCounts, Chercheurs: data.count })))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="body">
    <header>header</header>
    <div className="main">
    <aside className="left">
        <ScrollButton />
        <CarteButton />
      </aside>
      <main>
      <h1 className="mainTitle">Acteurs R3MOB: </h1>
        <CardsContainer>
      <PageLink href="/chercheur"><CarteActeur image="Acteurs/Chercheurs.png" name="Chercheurs" nombre={counts.Chercheurs}/></PageLink>
      <PageLink href="/laboratoire"><CarteActeur image="Acteurs/Laboratoire.png" name="Laboratoires scientifiques" nombre={counts.Laboratoires}/></PageLink>
      <PageLink href="/universite"><CarteActeur image="Acteurs/Université.png" name="Universités" nombre={counts.Universités}/></PageLink>
      <PageLink href="/autre_etablissement"><CarteActeur image="Acteurs/Autre_Etablissement.png" name="Autres établissement" nombre={counts.AutresÉtablissements}/></PageLink>
      <PageLink href="/partenaire"><CarteActeur image="Acteurs/Partenaire.png" name="Partenaires" nombre={counts.Partenaires}/></PageLink>
      </CardsContainer>
      </main>
      <aside className="right">
        <ScrollButton />
        <CarteButton />
      </aside>
    </div>
       <footer><Footer/></footer> 
    </div>
  );
}

export default Acteurs;
