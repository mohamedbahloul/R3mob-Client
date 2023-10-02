import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Colors from "../styles/Colors";
import axios from "axios";

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
  const [links, setLinks] = useState({});

  useEffect(() => {
    axios.get("https://back.r3mob.fr/infos/reseauxSociaux").then((response) => {
      setLinks(response.data);
    });
  }, []);
  return (
    <FooterContainer>
      <SocialIcons>
        {links.Facebook && (
          <a href={links.Facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
        )}
        {links.Instagram && (
        <a href={links.Instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram/>
        </a>
        )}
        {links.Twitter && (
          <a href={links.Twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        )}
        {links.LinkedIn && (
          <a href={links.LinkedIn} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        )}
      </SocialIcons>
      <CopyrightText>
        &copy; {new Date().getFullYear()} R3MOB - Réseau régional de recherche
        sur les nouvelles mobilités.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
