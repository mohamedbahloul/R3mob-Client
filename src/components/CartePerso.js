import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
    CardContainer,
    InfoContainer,
    Icon,
    Infos,
    InfoRow
} from '../styles/CartePerso';

const defaultImage = 'default_user.png';

const Name = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    @media (max-width: 1625px) {
    font-size: 1rem;
  }
`;
const PageLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
`;
const NameUnderCard= styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
    @media (max-width: 1625px) {
    font-size: 0.8rem;
    }
`;

const CartePerso = ({ id, name, email, phone, address, imageData }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const backgroundImage = imageData
      ? `url(data:image/png;base64,${imageData})`
      : `url(${defaultImage})`;
  
    return (
        <>
        <PageLink to={`/chercheur/${id}`}> 
      <CardContainer
        style={{ backgroundImage }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
            {isHovered && (
                <InfoContainer>
                    <Name>{name}</Name>
                    <InfoRow>
                        <Icon>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Icon>
                        <Infos>{email}</Infos>
                    </InfoRow>
                    <InfoRow>
                        <Icon>
                            <FontAwesomeIcon icon={faPhone} />
                        </Icon>
                        <Infos>{phone}</Infos>
                    </InfoRow>
                    <InfoRow>
                        <Icon>
                            <FontAwesomeIcon icon={faMapMarker} />
                        </Icon>
                        <Infos>{address}</Infos>
                    </InfoRow>
                </InfoContainer>
            )}
        </CardContainer>
        </PageLink>
        <NameUnderCard>{name}</NameUnderCard>
        </>
    );
};

export default CartePerso;
