import React ,{ useState,useEffect }from 'react';
import styled from 'styled-components';
import '../styles/Colors.css';
import { FaMapMarkerAlt,FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Colors from '../styles/Colors';


    
const EventCard = ({ id, date, title, description, eventType, location, registrationLink,imageUrl,fallbackImageUrl }) => {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    // Set playAnimation to true when the component mounts (initial animation)
    setPlayAnimation(true);
    
    // Return a function to set playAnimation to false when the component unmounts
    return () => {
      setPlayAnimation(false);
    };
  }, []);
  

  return (
    <PageLink to={`/event/${id}`}> 
    <CardContainer imageUrl={imageUrl} fallbackUrl={fallbackImageUrl} playAnimation={playAnimation}>
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
                    url(${(props) => props.fallbackUrl});  background-size: cover; /* This will make the image cover the entire container */
  background-position: center; /* This will center the image */
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  animation: ${props => props.playAnimation ? 'rotate 0.5s ease, zoom 0.5s ease' : 'none'};  position: relative;
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
  gap: 10px;
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
  font-size: 150%;
  color: var(--color3);
  font-weight: bold;
  margin-left: 3%;
  margin-right: 3%;

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
`;



export default EventCard;