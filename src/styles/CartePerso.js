import styled from 'styled-components';
import Colors from './Colors.js';


export const CardContainer = styled.div`

  width: 300px;
  height: 300px;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  transition: filter 0.3s;
  border-radius: 8px;
  display : flex;
  gap: 30px;
  &:hover {
    filter : none;
    
  }
  animation: rotate 0.5s ease, zoom 0.5s ease;  /* Ajout de l'animation de rotation */
  
  @keyframes rotate {
    from {
      transform: rotateY(30deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }
  @keyframes zoom {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1);
    }
  }
  @media (max-width: 1625px) {
    width: 200px;
  height: 200px;
  }

`;

export const InfoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; 
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color:  rgba(232, 67, 30, 0.5); 
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  color: ${Colors.color3};
  margin-bottom: 35px;
`;
export const Infos = styled.p`
  margin-left: 2px;
  font-size: small;
  @media (max-width: 1625px) {
    font-size: x-small;
  }
`;

export const Icon = styled.i`
  @media (max-width: 1625px) {
    font-size: x-small;
  }
`;

export const InfoRow = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
`;
