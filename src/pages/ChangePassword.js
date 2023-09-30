import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, Navigate } from "react-router-dom";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import Footer from "../components/Footer";

import "../styles/Apropos.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConfirmButton } from "../styles/CreatePubPopup";
import { AuthContext } from "../helpers/AuthContext";


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
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 20px;
  width: 100%;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;
const StyledSpan = styled.span`
  color: red;
  font-weight: bold;
`;

function ChangePassword() {

  const { authState } = useContext(AuthContext);



  const contactFormSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Le mot de passe est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
      .required("Le mot de passe de confirmation est requis")
      .test(
        "passwords-match",
        "Les mots de passe doivent correspondre",
        function (value) {
          return this.parent.password === value;
        }
      ),
  });



  return (
    authState.status==true ? (

    <div className="body body2" id="body">
      <header>header</header>
      <div className="main">
        <aside className="left"></aside>
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "100px",
            gap: "20px",
            spaceBetween: "20px",
          }}
        >
          <div>
            <Formik
              initialValues={{ nom: "", email: "", message: "" }}
              validationSchema={contactFormSchema}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                axios
                  .post("http://back.r3mob.fr/auth/change-password-profile", {
                    userId: authState.id,
                    oldPassword: values.oldPassword,
                    password: values.password,
                  })
                  .then((response) => {
                    if (response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert("Votre mot de passe a été changé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.");
                      // Réinitialise le formulaire après une soumission réussie
                      resetForm();
                    }
                    // Définit isSubmitting à false pour indiquer que la soumission est terminée
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("Une erreur s'est produite lors de la requête.");
                    // Définit isSubmitting à false en cas d'erreur
                    setSubmitting(false);
                  });
              }}
              
            >
              {({ isSubmitting }) => (
                <StyledForm>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "left",
                        width: "100%",
                      }}
                    >
                      <Label htmlFor="oldPassword">
                        Ancien Mot de passe <StyledSpan>*</StyledSpan>
                      </Label>
                    </div>
                    <Field
                      type="password"
                      id="oldPassword"
                      name="oldPassword" 
                      as={Input}
                      placeholder="ancien mot de passe"
                      style={{ width: "100%" }}
                    />
                    <StyledErrorMessage name="oldPassword" component="div" />
                  </div>
                  
                  <div style={{ marginTop: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "left",
                        width: "100%",
                      }}
                    >
                      <Label htmlFor="password">
                        Mot de passe <StyledSpan>*</StyledSpan>
                      </Label>
                    </div>
                    <Field
                      type="password"
                      id="password"
                      name="password" 
                      as={Input}
                      placeholder="password"
                      style={{ width: "100%" }}
                    />
                    <StyledErrorMessage name="password" component="div" />
                  </div>

                  <div style={{ marginTop: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "left",
                        width: "100%",
                      }}
                    >
                      <Label htmlFor="confirmPassword">
                        Mot de passe de confirmation <StyledSpan>*</StyledSpan>
                      </Label>
                    </div>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword" 
                      as={Input}
                      placeholder="Mot de passe de confirmation"
                      style={{ width: "500px" }}
                    />
                    <StyledErrorMessage
                      name="confirmPassword"
                      component="div"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      marginTop: "20px",
                    }}
                  >
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
                        width:"fit-content"
                      }}
                    >
                      Changer mot de passe
                    </button>
                  </div>
                </StyledForm>
              )}
            </Formik>
          </div>
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

export default ChangePassword;
