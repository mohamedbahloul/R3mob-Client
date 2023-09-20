import React, { useEffect, useState } from "react";
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

function ResetPassword() {
    // const [passwordValue, setPasswordValue] = useState("");
    // const [passwordConfirm, setPasswordConfirm] = useState("");
    
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [redirectUser, setRedirectUser] = useState(false);
  const token = useParams().token;

  const contactFormSchema = Yup.object().shape({
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

  useEffect(() => {
    console.log(token);
    axios
      .get(`http://localhost:3001/auth/reset-token-verification/${token}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
            setRedirectUser(true);
        } else {
          console.log(response.data);
        }
      });
  }, [token]);


//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handlePasswordConfirmChange = (e) => {
//     setPasswordConfirm(e.target.value);
//   };


  return (
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
              onSubmit={(values, { resetForm }) => {
                axios
                  .post("http://localhost:3001/auth/change-password", {
                    // password: password,
                    password:values.password,
                    token: token,
                  })
                  .then((response) => {
                    if (response.data.error) {
                      alert(response.data.error);
                    } else {
                      alert("Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.");
                      setRedirectUser(true);
                    }
                  });

                resetForm();
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
                      <Label htmlFor="password">
                        Mot de passe <StyledSpan>*</StyledSpan>
                      </Label>
                    </div>
                    <Field
                      type="password"
                      id="password"
                      name="password" // Correspond au nom du champ dans le schéma de validation
                      as={Input}
                      placeholder="password"
                      style={{ width: "100%" }}
                    //   value={password}
                    //   onChange={handlePasswordChange}
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
                      name="confirmPassword" // Correspond au nom du champ dans le schéma de validation
                    //   value={passwordConfirm}
                    //   onChange={handlePasswordConfirmChange}
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
                      }}
                    >
                      Envoyer
                    </button>
                  </div>
                </StyledForm>
              )}
            </Formik>
          </div>
          {redirectUser && <Navigate to="/login" />}

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

export default ResetPassword;
