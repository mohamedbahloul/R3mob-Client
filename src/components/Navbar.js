import React, { useState, useContext } from "react";
import UserImage from "../assets/Mohamed-Mosbah-2.jpg.jpg";
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

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [openLinks, setOpenLinks] = useState(false);
  // Fonction de gestion d'événement pour les liens étendus
  const handleNavbarLinkClick = () => {
    console.log("handleNavbarLinkClick");
    setOpenLinks(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
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
                A propos du réseau <span className="dropdownbtn">&#8964;</span>
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
                  <NavbarLink href="#">Projets R3MOB</NavbarLink>
                  <NavbarLink href="#">Appels à projets</NavbarLink>
                </div>
              </NavbarLinkList>
            </div>

            <NavbarLink to="/agenda">Agenda</NavbarLink>

            <div className="dropdown">
              <NavbarLinkList to="/ressources">
                Ressources <span className="dropdownbtn">&#8964;</span>
                <div className="dropdown-content">
                <NavbarLink href="#">Publications</NavbarLink>
                  <NavbarLink href="#">Vidéos</NavbarLink>
                </div>
              </NavbarLinkList>
            </div>

            <NavbarLink to="/stagesEtEmploi">Stage & emploi</NavbarLink>

            {!authState.status ? (
              <>
                <LoginLink to="/login">Se connecter</LoginLink>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <NavbarLinkList to="/acteurs">
                    Acteurs <span className="dropdownbtn">&#8964;</span>
                    <div className="dropdown-content">
                      <NavbarLink to="/chercheur">Chercheurs</NavbarLink>
                      <NavbarLink href="#">
                        Laboratoires scientifiques
                      </NavbarLink>
                      <NavbarLink href="#">Universités</NavbarLink>
                      <NavbarLink href="#">Ecoles d'ingénieurs</NavbarLink>
                      <NavbarLink href="#">Organismes Nationaux</NavbarLink>
                    </div>
                  </NavbarLinkList>
                </div>
                <br />
                <div className="user-container dropdown">
                  <img src={UserImage} alt="User" className="user-image" />
                  <span className="dropdownbtn-profile">&#8964;</span>
                  <div className="dropdown-content-profile">
                    <div className="dropdown-content-profile">
                      <NavbarLink to="/updateEvent">Update Events</NavbarLink>
                      <NavbarLink to="/updateBd">Update Data Base</NavbarLink>
                      <NavbarLink to="/clearBd">Clear Data Base</NavbarLink>
                      <NavbarLink to="/verifyUrl">Verify Url</NavbarLink>
                      <NavbarLink to="/profile">
                        {authState.username}{" "}
                      </NavbarLink>
                      <NavbarLink to="/" onClick={logout}>
                        Logout{" "}
                      </NavbarLink>
                    </div>
                  </div>
                </div>
                {/* <NavbarLink   to="/" onClick={logout}>Logout </NavbarLink>          
            {authState.username} */}
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
            A propos du réseau
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/agenda">Agenda</NavbarLinkExtended>
          <NavbarLinkExtended to="/ressources">Ressources</NavbarLinkExtended>
          <NavbarLinkExtended to="/stagesEtEmploi">
            Stage & emploi
          </NavbarLinkExtended>
          <LoginLinkExtended to="/login">Se connecter</LoginLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarStyle>
  );
}

export default Navbar;
