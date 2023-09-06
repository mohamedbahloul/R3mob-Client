import React from "react";
import styled from "styled-components";
import {FaFacebook} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import Colors from "../styles/Colors";

const FooterContainer = styled.footer`
  text-align: center;

`;

const SocialIcons = styled.div`
  margin-bottom: 10px;

  a {
    margin: 0 10px;
    text-decoration: none;
    font-size: 30px;
    color: ${Colors.color5};

    &:hover {
      color: #007bff;
    }
  }
`;

const CopyrightText = styled.p`
  margin: 0;
  font-size: 90%;
  color: #888;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <a href="lien_facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebook/>
        </a>
        <a href="lien_instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram/>
        </a>
        <a href="lien_twitter" target="_blank" rel="noopener noreferrer">
        <FaTwitter/>
        </a>
        <a href="lien_linkedin" target="_blank" rel="noopener noreferrer">
        <FaLinkedin/>
        </a>
      </SocialIcons>
      <CopyrightText>
        &copy; {new Date().getFullYear()} R3MOB - Réseau régional de recherche sur les nouvelles mobilités.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;