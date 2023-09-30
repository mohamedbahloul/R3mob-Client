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
import { Link, Navigate } from "react-router-dom";
import { HeaderContent, HeaderLinkStyle } from "../styles/Header.style";

const PageLink = styled(Link)`
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
  const { authState } = useContext(AuthContext);
 
  useEffect(() => {
    axios.get('http://localhost:3001/annuaire/acteurCount').then((response) => {
      setCounts(response.data);
    });
  }, []);
  return (
    authState.status==true ? (
      <div className="body">
      <header>
      <HeaderContent>
        <HeaderLinkStyle href="\">{"> "}Accueil</HeaderLinkStyle>
        <HeaderLinkStyle>{"> "} Annuaire</HeaderLinkStyle>
      </HeaderContent>
      </header>
      <div className="main">
        <aside className="left">
          <ScrollButton />
          <CarteButton />
        </aside>
        <main>
          <h1 className="mainTitle">Annuaires : </h1>

          <CardsContainer>
            <PageLink to="/chercheur">
              <CarteActeur
                image="Acteurs/Chercheurs.png"
                name="Acteurs R3MOB"
                nombre={counts.Acteur_R3MOB}
              />
            </PageLink>
            <PageLink to="/laboratoire">
              <CarteActeur
                image="Acteurs/Laboratoire.png"
                name="Laboratoires scientifiques"
                nombre={counts.Laboratoire_Scientifique}
              />
            </PageLink>
            <PageLink to="/universite">
              <CarteActeur
                image="Acteurs/Université.png"
                name="Universités"
                nombre={counts.Universite}
              />
            </PageLink>
            <PageLink to="/autreEtab">
              <CarteActeur
                image="Acteurs/Autre_Etablissement.png"
                name="Autres établissements"
                nombre={counts.Autre_Etablissement}
              />
            </PageLink>
            <PageLink to="/partenaire">
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
    ):(
      <Navigate to="/login" />
    )
  );
}

export default Annuaire;
