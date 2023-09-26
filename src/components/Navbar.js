import React, { useState, useContext, useEffect } from "react";
import UserImage from "../assets/icons-utilisateur.png";
import {
  Logo,
  NavbarLink,
  NavbarStyle,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  OpenLinksButton,
  NavbarLinkExtended,
  LoginLink,
  LoginLinkExtended,
  NavbarLinkList,
} from "../styles/Navbar.style";
import "../styles/Navbar.css";
import LogoImg from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { set } from "date-fns";

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [openLinks, setOpenLinks] = useState(false);
  const [access, setAccess] = useState(false);
  // Fonction de gestion d'événement pour les liens étendus
  const handleNavbarLinkClick = () => {
    console.log("handleNavbarLinkClick");
    setOpenLinks(false);
  };
  useEffect(() => {
    setAccess(authState.role);
  }, [authState]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, role: "" });
  };
  return (
    <NavbarStyle extendnavbar={openLinks}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link to="/">
            {" "}
            <Logo src={LogoImg} alt="Logo"></Logo>
          </Link>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <div className="dropdown">
              <NavbarLinkList to="/apropos">
              À propos du réseau <span className="dropdownbtn">&#8964;</span>
                <div className="dropdown-content">
                  <NavbarLink href="#">Contexte</NavbarLink>
                  <NavbarLink href="#">Objectifs</NavbarLink>
                  <NavbarLink href="#">Acteurs académiques</NavbarLink>
                  <NavbarLink href="#">Partenaires</NavbarLink>
                  <NavbarLink href="#">Contact</NavbarLink>
                </div>
              </NavbarLinkList>
            </div>
            <div className="dropdown">
              <NavbarLinkList to="/projet">
                Projets <span className="dropdownbtn">&#8964;</span>
                <div className="dropdown-content">
                  <NavbarLink to="/projet#projets">Projets R3MOB</NavbarLink>
                  <NavbarLink to="/projet#aap">Appels à projets</NavbarLink>
                </div>
              </NavbarLinkList>
            </div>

            <NavbarLink to="/agenda">Agenda</NavbarLink>

            <div className="dropdown">
              <NavbarLinkList to="/ressources">
                Ressources <span className="dropdownbtn">&#8964;</span>
                <div className="dropdown-content">
                  <NavbarLink to="/ressources#publications">
                    Publications
                  </NavbarLink>
                  <NavbarLink to="/ressources#videos">Vidéos</NavbarLink>
                </div>
              </NavbarLinkList>
            </div>

            <NavbarLink to="/stage&emploi">Stage & emploi</NavbarLink>

            {!authState.status ? (
              <>
                <LoginLink to="/login">Se connecter</LoginLink>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <NavbarLinkList to="/annuaires">
                    Annuaires <span className="dropdownbtn">&#8964;</span>
                    <div className="dropdown-content">
                      <NavbarLink to="/chercheur">Acteurs R3MOB</NavbarLink>
                      <NavbarLink to="/laboratoire">
                        Laboratoires scientifiques
                      </NavbarLink>
                      <NavbarLink to="/universite">Universités</NavbarLink>
                      <NavbarLink to="/autreEtab">
                        Autres Etablissement
                      </NavbarLink>
                      <NavbarLink to="/partenaire">Partenaires</NavbarLink>
                    </div>
                  </NavbarLinkList>
                </div>
                <br />
                <div className="user-container dropdown" >
                  <img src={UserImage} alt="User" className="user-image" />
                  <span className="dropdownbtn-profile">&#8964;</span>
                  <div className="dropdown-content-profile">
                    <div className="dropdown-content-profile">
                      {console.log("------------------", authState)}
                      {authState.role === true && (
                        <>
                          <NavbarLink to="/uploadBase">
                            Upload new base
                          </NavbarLink>
                          <NavbarLink to="/updateEvent">
                            Update Events
                          </NavbarLink>
                          <NavbarLink to="/admin">Admin</NavbarLink>
                          <NavbarLink to="/verifyUrl">
                            Vérifier les Urls
                          </NavbarLink>
                        </>
                      )}
                      {/* <NavbarLink to="/updateBd">Update Data Base</NavbarLink>
                      <NavbarLink to="/clearBd">Clear Data Base</NavbarLink> */}
                      <NavbarLink to="/changePassword">
                        Changer mot de passe
                      </NavbarLink>

                      <NavbarLink to="/" onClick={logout}>
                        Logout{" "}
                      </NavbarLink>
                    </div>
                  </div>
                </div>

              </>
            )}

            <OpenLinksButton
              onClick={() => {
                setOpenLinks(!openLinks);
              }}
            >
              {openLinks ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </RightContainer>
      </NavbarInnerContainer>
      {openLinks && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/apropos">
          À propos du réseau
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/projet">
            Projets
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/agenda">Agenda</NavbarLinkExtended>
          <NavbarLinkExtended to="/ressources">Ressources</NavbarLinkExtended>
          <NavbarLinkExtended to="/stagesEtEmploi">
            Stage & emploi
          </NavbarLinkExtended>
          {!authState.status ? (
            <>
              <LoginLinkExtended to="/login">Se connecter</LoginLinkExtended>
            </>
          ) : (
            <>
            <NavbarLinkExtended to="/annuaires">
                    Annuaires
            </NavbarLinkExtended>
              {authState.role === true && (
                <>
              
              <NavbarLinkExtended to="/uploadBase">
                Upload new base
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/updateEvent">
                Update Events
              </NavbarLinkExtended>
              <NavbarLinkExtended to="/admin">Admin</NavbarLinkExtended>
              <NavbarLinkExtended to="/verifyUrl">
                Vérifier les Url
              </NavbarLinkExtended>
              </>
              )}
              <NavbarLinkExtended to="/changePassword">
                Changer mot de passe
              </NavbarLinkExtended>

              <LoginLinkExtended to="/" onClick={logout}>
                Logout{" "}
              </LoginLinkExtended>
            </>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarStyle>
  );
}

export default Navbar;
