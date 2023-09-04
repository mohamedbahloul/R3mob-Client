import styled from "styled-components";
import Colors from "./Colors";
import { Link } from "react-router-dom";

export const NavbarStyle = styled.nav`
position: fixed;
  width: 100%;
  height: ${(props) => (props.extendnavbar ? "100vh" : "80px")};
  background-color: ${Colors.color1};
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 20px 20px; /* Ajoutez cette ligne pour spécifier le border-radius uniquement pour les coins inférieurs */
  z-index: 1000; /* Pour s'assurer que la barre de navigation est au-dessus de tout le reste */

  @media (min-width: 825) {
    height: 80px;
  }
`;
export const LeftContainer = styled.div`
  display: flex;
  flex: 30%;
  align-items: center;
  padding-left: 5px;
`;
export const RightContainer = styled.div`
  display: flex;
  flex: 70%;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;
export const NavbarLink = styled(Link)`
  color: ${Colors.color3};
  text-decoration: none;
  font-size: calc(0.5vw + 0.8rem);
  font-family: initial;
  margin: 15px;
  white-space: nowrap;
  position: relative;
  /* ajouter un ligne sous le lien */
  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px ${Colors.color2};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 10% 50%;
    margin-top: 5px;
  }
  &:hover:after {
    transform: scaleX(1);
  }

  @media (max-width: 825px) {
    display: none;
  }

  @media (max-width: 910px) {
    font-size: 15px;
  }
`;
export const NavbarLinkList = styled(Link)`
  color: ${Colors.color3};
  text-decoration: none;
  font-size: calc(0.5vw + 0.8rem);
  font-family: initial;
  margin: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  /* ajouter un ligne sous le lien */
  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px ${Colors.color2};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 10% 50%;
  }
  &:hover:after {
    transform: scaleX(1);
  }

  @media (max-width: 825px) {
    display: none;
  }

  @media (max-width: 910px) {
    font-size: 15px;
  }
`;

export const LoginLink = styled(Link)`
  color: ${Colors.color3};
  text-decoration: none;
  font-size: calc(0.5vw + 0.8rem);
  font-family: initial;
  margin: 10px;
  white-space: nowrap;
  /* entourer le lien avec un rectangle */
  border: 1px solid ${Colors.color3};
  border-radius: 5px;
  padding: 5px;
  /* on hover le lien change de couleur */
  &:hover {
    color: ${Colors.color3};
    background-color: ${Colors.color2};
  }

  @media (max-width: 825px) {
    display: none;
  }
  @media (max-width: 850px) {
    font-size: 5px;
  }
  @media (max-width: 910px) {
    font-size: 15px;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: ${Colors.color3};
  text-decoration: none;
  font-size: calc(0.5vw + 0.8rem);
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px;
`;

export const LoginLinkExtended = styled(Link)`
  color: ${Colors.color3};
  text-decoration: none;
  font-size: calc(0.5vw + 0.8rem);
  font-family: initial;
  margin: 10px;
  white-space: nowrap;
  /* entourer le lien avec un rectangle */
  border: 1px solid ${Colors.color3};
  border-radius: 5px;
  padding: 5px;
  /* on hover le lien change de couleur */
  &:hover {
    color: ${Colors.color3};
    background-color: ${Colors.color2};
  }

`;

export const Logo = styled.img`
  margin: 10px;
  max-width: 100px;
  height: auto;
`;

export const OpenLinksButton = styled.button`
  width: 0px;
  height: 50px;
  background: none;
  border: none;
  color: ${Colors.color3};
  font-size: xx-large;
  cursor: pointer;

  @media (min-width: 826px) {
    display: none;
  }
`;
export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 826px) {
    display: none;
  }
`;
