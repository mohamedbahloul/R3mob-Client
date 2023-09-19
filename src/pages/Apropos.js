import React, { useState, useEffect } from "react";
import "../styles/common/layout.css";
import styled from "styled-components";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import Footer from "../components/Footer";
import CartePerso from "../components/CartePerso";
import axios from "axios";

import Colors from "../styles/Colors";
import ParticlesBg from "particles-bg";
import "../styles/Apropos.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  height: 50px;
`;

const SecondaryTitle = styled.h2`
  color: ${Colors.color2};
  font-size: 2rem;
  margin-top: 70px;
  align-self: left;
`;
const PublicationGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;
`;

const PublicationCardContainer = styled.div`
  width: 500px;
  margin-bottom: 20px;
`;

const EventGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 15px;

  @media (max-width: 2189px) {
    gap: 20px 100px;
  }
  @media (max-width: 1608px) {
    gap: 25px;
  }
  @media (max-width: 1075px) {
    gap: 10px;
  }
`;

const EventCardContainer = styled.div`
  width: 400px;

  @media (min-width: 2189px) {
    height: auto;
    width: auto;
  }
  @media (max-width: 2189px) {
    gap: 20px 100px;
    width: auto;
  }
  @media (max-width: 1608px) {
    gap: 5px;
    width: auto;
  }
  @media (max-width: 990px) {
    width: auto;
  }
`;

const PersoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  justify-content: center;
  padding-top: 15px;
`;

const PersoCardContainer = styled.div`
  width: auto;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  margin-top: 100px;
  overflow: hidden;
`;

const SlideImage = styled.img`
  position: absolute;
  top: 0;
  left: ${(props) => (props.slideOut ? "0" : "100%")};
  transition: left 0.5s ease-in-out;
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30%;
  background-color: white;
  z-index: 1;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
  opacity: 0.8;
  /* overflow: hidden; Empêche le débordement du contenu */
`;

const Title = styled.h2`
  color: red;
  font-size: 1.2rem;
  margin-top: 0;
`;
const Paragraph = styled.p`
  color: #333;
  font-size: 0.8rem;
  margin-bottom: 0; /* Ajustez la marge selon vos besoins */
`;

const StyledSpan = styled.span`
  color: red;
  font-weight: bold;
`;
const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  text-align: left;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const DescriptionReseau = styled.h1`
  color: black;
  font-size: 1.5rem;
  line-height: 1.5;
  /* letter-spacing: 0.1rem; */
  text-align: justify;
  font-weight: normal;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 20px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;


function Apropos() {
  const [infos, setInfos] = useState([]);
  const [pilotes, setPilotes] = useState([]);
  const [etablissements, setEtablissements] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/perso/pilote`).then((res) => {
      setPilotes(res.data);
      console.log(res.data);
    });
    axios.get(`http://localhost:3001/etablissement`).then((res) => {
      setEtablissements(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/infos/apropos`).then((res) => {
      setInfos(res.data);
    });
  }, []);

  const contactFormSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("L'adresse email n'est pas valide")
      .required("L'adresse email est requise"),
    sujet: Yup.string().required("Le sujet est requis"), // Ajout du champ "sujet"
    message: Yup.string().required("Le message est requis"),
  });

  return (
    <div className="body body2" id="body">
      <header>header</header>
      <div className="main">
        <aside className="left"></aside>
        <main>
          <InfosContainer>
            <SecondaryTitle>Qui sommes-nous ? </SecondaryTitle>
            <DescriptionReseau>{infos.descriptionReseau}</DescriptionReseau>

            <SecondaryTitle>L'équipe du réseau : </SecondaryTitle>
          </InfosContainer>
          <PersoGrid>
            {pilotes.map((value, key) => {
              const etablissementNames = value.Chercheur_etabs.map(
                (chercheurEtab) => {
                  const etablissement = etablissements.find(
                    (etab) => etab.id === chercheurEtab.EtablissementId
                  );
                  return etablissement ? etablissement.nom : "Pas indiqué";
                }
              );

              return (
                <PersoCardContainer key={key}>
                  <CartePerso
                    id={value.id}
                    name={value.username}
                    email={value.email ? value.email : "Pas indiqué"}
                    address={etablissementNames.join(", ")} // Join establishment names with commas
                    imageData={value.imageData}
                  />
                </PersoCardContainer>
              );
            })}
          </PersoGrid>
          <InfosContainer>
            <SecondaryTitle>Nous Contacter </SecondaryTitle>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginLeft: "5%",
              }}
            >
              Pour plus d'information, vous pouvez contacter :
            </p>
            <p style={{ fontSize: "1.2rem", marginLeft: "6%" }}>
              Mohamed Mosbah - Animateur R3MOB : <a href="Mailto:mohamed.mosbah@u-bordeaux.fr">mohamed.mosbah@u-bordeaux.fr</a>
            </p>
            <p style={{ fontSize: "1.2rem", marginLeft: "6%" }}>
              Cedric Ferrero - Animateur R3MOB : <a href="Mailto:cedrik.ferrero@bordeaux-inp.fr">cedrik.ferrero@bordeaux-inp.fr</a>
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginLeft: "5%",
              }}
            >
              Sinon, vous pouvez nous écrire : 
            </p>
            <Formik
          initialValues={{ nom: "", email: "", message: "" }}
          validationSchema={contactFormSchema}
          onSubmit={(values, { resetForm }) => {
            // Vous pouvez envoyer les données du formulaire à votre backend ici
            console.log("Formulaire soumis avec succès !");
            console.log(values);
            resetForm(); // Réinitialise le formulaire après la soumission
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
            <div>
              <Label htmlFor="nom">
                Nom <StyledSpan>*</StyledSpan>
              </Label>
              <Field
                type="text"
                id="nom"
                name="nom"
                as={Input}
                placeholder="Votre nom"
                style={{ width: '100%' }}
              />
              <StyledErrorMessage name="nom" component="div" />
            </div>
          
            <div style={{ marginTop: '30px' }}>
              <Label htmlFor="email">
                Adresse Email <StyledSpan>*</StyledSpan>
              </Label>
              <Field
                type="email"
                id="email"
                name="email"
                as={Input}
                placeholder="Votre adresse email"
                style={{ width: '100%' }}
              />
              <StyledErrorMessage name="email" component="div" />
            </div>
          
            <div style={{ marginTop: '30px' }}>
              <Label htmlFor="sujet">
                Sujet <StyledSpan>*</StyledSpan>
              </Label>
              <Field
                type="text"
                id="sujet"
                name="sujet"
                as={Input}
                placeholder="Le sujet de votre message"
                style={{ width: '100%' }}
              />
              <StyledErrorMessage name="sujet" component="div" />
            </div>
          
            <div style={{ marginTop: '30px' }}>
              <Label htmlFor="message">
                Message <StyledSpan>*</StyledSpan>
              </Label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows="10"
                placeholder="Votre message"
                style={{ width: '100%', fontSize: '1.2rem',maxWidth: '100%' }}
              />
              <StyledErrorMessage name="message" component="div" />
            </div>
          
            <div style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "20px",
            }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                Envoyer
              </button>
            </div>
          </StyledForm>
          )}
        </Formik>
            

          </InfosContainer>

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

export default Apropos;
