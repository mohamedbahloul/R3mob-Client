import React, { useState, useEffect,useContext } from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import "../styles/Agenda.css";
import styled from "styled-components";
import Footer from "../components/Footer";
import CarteActeur from "../components/CarteActeur";
import { CardsContainer } from "../styles/CarteActeur";
import "leaflet/dist/leaflet.css";
import BordeauxMap from "../components/BordeauxMap";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
const PageLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

function Annuaire() {
  const [counts, setCounts] = useState({
    ActeurR3MOB: 0,
    LaboratoireScientifique: 0,
    Universite: 0,
    AutreEtab: 0,
    Partenaire: 0
  });
  const [access, setAccess] = useState(false);
  const { authState } = useContext(AuthContext);
  // useEffect(() => {
  //   if (!authState.status) {
  //     window.location.href = "/login";
  //   }else{
  //     setAccess(true);
  //   }
  // }, []);
  useEffect(() => {
    axios.get('http://localhost:3001/annuaire/acteurCount').then((response) => {
      setCounts(response.data);
    });
  }, []);
  return (
    // access &&
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">
          <ScrollButton />
          <CarteButton />
        </aside>
        <main>
          <h1 className="mainTitle">Annuaires : </h1>

          <CardsContainer>
            <PageLink href="/chercheur">
              <CarteActeur
                image="Acteurs/Chercheurs.png"
                name="Acteurs R3MOB"
                nombre={counts.Acteur_R3MOB}
              />
            </PageLink>
            <PageLink href="/laboratoire">
              <CarteActeur
                image="Acteurs/Laboratoire.png"
                name="Laboratoires scientifiques"
                nombre={counts.Laboratoire_Scientifique}
              />
            </PageLink>
            <PageLink href="/universite">
              <CarteActeur
                image="Acteurs/Université.png"
                name="Universités"
                nombre={counts.Universite}
              />
            </PageLink>
            <PageLink href="/autre_etablissement">
              <CarteActeur
                image="Acteurs/Autre_Etablissement.png"
                name="Autres établissements"
                nombre={counts.Autre_Etablissement}
              />
            </PageLink>
            <PageLink href="/partenaire">
              <CarteActeur
                image="Acteurs/Partenaire.png"
                name="Partenaires"
                nombre={counts.Partenaire}
              />
            </PageLink>
          </CardsContainer>
          <BordeauxMap />
          <div className="mobile">
          <CarteButton />
          </div>

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

export default Annuaire;
