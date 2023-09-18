import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import Footer from "../components/Footer";
import "../styles/login-style.css";
import styled from "styled-components";
import FindMailPopup from "../components/FindMailPopup";

const Body = styled.div`
  box-sizing: border-box;
  height: 95vh;
  width: 100vw;
  font-family: sans-serif;
  text-align: center;
  color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  background: linear-gradient(to bottom, #e8431e, #302b63, #24243e);
`;
const MainStyle = styled.div`
  width: 350px;
  height: 500px;
  background: red;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
    no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
`;

const Label = styled.label`
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
`;
const Input = styled.input`
  width: 60%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 20px 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background: #6d44b8;
  }
`;

const RechercheEmailButton = styled.button`
  color: white;
  margin-top: 20%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  width: fit-content;
`;
const InscritEmailButton= styled.a`
  color: white;
  margin-top: 0%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.8rem;
`;
const mainStyles = {
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  marginTop: "10%",
  marginLeft: "30%",
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const { id } = useParams();
  const [showFindMail, setShowFindMail] = useState(false); 
  let Navigate = useNavigate();

  useEffect(() => {
    if (id) {
      console.log(`http://localhost:3001/perso/email/${id}`);
      axios.get(`http://localhost:3001/perso/email/${id}`).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // Set the username to the email obtained from the API response
          setUsername(response.data.email); // Change this line
        }
      });
    }
  }, [id]); // Make sure to include id in the dependency array

  const handleShowMailPopupClose = () => {
    setShowFindMail(false);
  };

  const login = () => {
    const data = { email: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        console.log(response.data.username);
        Navigate("/");
      }
    });
  };

  return (
    <Body>
      <header>header</header>
      <div className="main">
        <aside className="left"></aside>
        <main style={mainStyles}>
          <MainStyle>
            <div class="login">
              <Label for="chk" aria-hidden="true">
                Login
              </Label>
              <div className="loginContainer">
                <Input
                  type="text"
                  placeholder="Username..."
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <Input
                  type="password"
                  placeholder="Password..."
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <Button onClick={login}>Login</Button>
                <RechercheEmailButton onClick={()=>{
                  setShowFindMail(true);
                }}>Trouver votre email.</RechercheEmailButton>
                <InscritEmailButton href="/registre">Première fois ? Inscrivez-vous...</InscritEmailButton>

                
                
              </div>
            </div>
          </MainStyle>
          

        </main>
        <aside className="right">

        </aside>
      </div>
      <footer>
        <Footer />
      </footer>
      {showFindMail && (
            <FindMailPopup onClose={handleShowMailPopupClose}/>

          )}

    </Body>
  );
}

export default Login;
