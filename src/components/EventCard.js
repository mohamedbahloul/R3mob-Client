import React ,{ useState,useEffect }from 'react';
import styled from 'styled-components';
import '../styles/Colors.css';
import { FaMapMarkerAlt,FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Colors from '../styles/Colors';
import axios from 'axios';


    
const EventCard = ({ id, date, title, description,locationType, eventType, location, registrationLink,imageUrl,fallbackImageUrl }) => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Set playAnimation to true when the component mounts (initial animation)
    setPlayAnimation(true);
    
    // Return a function to set playAnimation to false when the component unmounts
    return () => {
      setPlayAnimation(false);
    };
  }, []);
  useEffect(() => {
    axios.get(`https://back.r3mob.fr/event/image/${id}`).then((res) => {
      console.log(res.data);
      if (res.data && res.data !== null) {
        // Vérifiez que res.data n'est pas nul
        setImage(`data:image/png;base64,${res.data}`);
        console.log(image);
      } else {
        setImage(null);
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  
  const backgroundImage = image ? `${image}` : `${fallbackImageUrl}`;
  return (
    <PageLink to={`/event/${id}`}> 
    <CardContainer imageUrl={backgroundImage}  playAnimation={playAnimation}>
      <CardContent>
        <EventTitle>{title}</EventTitle>
        <EventDescription>{description}</EventDescription>
        <EventInfo>
          <EventLocation><FaMapMarkerAlt/> {location}</EventLocation>
          <CardDate><FaCalendarAlt/>{date}</CardDate>
        </EventInfo>
      </CardContent>
    </CardContainer>
    </PageLink>
  );
};
const PageLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
`;

const CardContainer = styled.div`
background-image: url(${(props) => props.imageUrl}),
                    url(${(props) => props.fallbackUrl});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  animation: ${props => props.playAnimation ? 'rotate 0.5s ease, zoom 0.5s ease' : 'none'};
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    border-radius: 20px;
    opacity: 0.8;
    z-index: 1; /* Place the gradient layer below the card content */
  }
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

  &:hover {
    box-shadow: 0 4px 8px rgba(10, 10, 10, 0.5);
    
  }
  @media (min-width: 2189px) {
    width: 500px;
    height: 400px;
  }
  @media (max-width: 2189px) {
    width: 400px;
    height: 300px;
  }
  @media (max-width: 1608px) {
    width: 250px;
    height: 150px;
  }
  @media (max-width: 1075px) {
    width: 160px;
    height: 120px;
  }
  @media (max-width: 990px) {
    width: 250px;
    height: 150px;
  }

`;
const CardDate = styled.div`
  color: var(--color3);
  background-color: rgba(128, 128, 128, 0.7);
  border-radius: 4px;
  padding: 8px 16px; /* Adjust the padding values as needed */
  font-weight: bold;
  font-size: large;
  display: flex;
  flex-direction: row;
  gap: 6px;

  @media (max-width: 2189px) {
    font-size: medium;
    padding: 4px 10px;
  }
  @media (max-width: 1608px) {
    font-size: x-small;
    padding: 1px 3px;
  }
  @media (max-width: 1075px) {
    font-size: xx-small;
    padding: 0.1px 0.7px;
  }
`;

const CardContent = styled.div`
 position: relative; /* Add this to create a new stacking context */
  z-index: 1; /* Position the content above the gradient layer */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const EventTitle = styled.h2`
position : absolute;
  margin-top: 40%;
  font-size: 120%;
  color: var(--color3);
  font-weight: bold;
  margin-left: 3%;
  margin-right: 3%;
  @media (max-width: 2189px) {
    font-size: 120%;
    padding: 4px 10px;
  }
  @media (max-width: 1608px) {
    font-size: 80%;
    padding: 1px 6px;
    margin-top: 25%;
  }
  @media (max-width: 1075px) {
    font-size: 60%;
  }

`;

const EventDescription = styled.p`
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
  justify-content: space-between;
  margin-right: 5%;
  margin-bottom: 5%;
`;

const EventType = styled.span`
  margin-right: 8px;
  padding: 4px 8px;
  background-color: var(--color3); 
  border-radius: 4px;
  color: var(--color2);
  font-weight: bold;
`;

const EventLocation = styled.span`
  color: var(--color3);
  background-color: rgba(128, 128, 128, 0.7);
  border-radius: 4px;
  padding: 8px 16px; 
  font-weight: bolder;
  font-size: large;
  @media (max-width: 2189px) {
    font-size: medium;
    padding: 4px 10px;
  }
  @media (max-width: 1608px) {
    font-size: small;
    font-size: x-small;
    padding: 0.1px 0.7px;
  }
  @media (max-width: 1075px) {
    font-size: xx-small;
    padding: 0.1px 0.7px;
  }
`;



export default EventCard;