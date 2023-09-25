import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";
import UpdateActeurCounts from "../components/UpdateActeurCounts";
import PublicationsUrls from '../components/PublicationsUrls'
import UpdatePublicInfos from "../components/UpdatePublicInfos";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Navigate } from "react-router-dom";

const NavBar = styled.div`
  display: flex;
  padding: 10px;
  align-self: center;
  align-items: center;
`;

export const ChooseButton = styled.button`
  background-color: ${(props) =>
    props.active ? Colors.color2 : Colors.color5};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 0px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 0;
  margin-left: 0;
`;

function Admin() {
  const [selectedComponent, setSelectedComponent] = useState("Acteurs");
  const { authState } = useContext(AuthContext);

  

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Acteurs":
        return <UpdateActeurCounts />;
      case "PublicInfos":
        return <UpdatePublicInfos />
      case "PubUrls":
       return <PublicationsUrls />
      default:
       return <UpdateActeurCounts />
    }
  };

  return (
    authState.status==true && authState.role===true? (

    <div
      style={{
        marginTop: "100px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar>
        <ChooseButton onClick={() => setSelectedComponent("Acteurs")} active={selectedComponent === "Acteurs"}>
          Nombres Acteurs
        </ChooseButton>
      
        <ChooseButton onClick={() => setSelectedComponent("PublicInfos")} active={selectedComponent === "PublicInfos"}>
          Informations publiques
        </ChooseButton>
        <ChooseButton onClick={() => setSelectedComponent("PubUrls")} active={selectedComponent === "PubUrls"}>
          Liens des publications
        </ChooseButton>
      </NavBar>
      {renderSelectedComponent()}
    </div>
    ):(<Navigate to="/404" replace={true} />)
  );
}

export default Admin;
