import Colors from "./Colors";
import styled from "styled-components";

export const HeaderContent = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background-color: #f5f5f5;
  width: 100%;
  
`;

export const HeaderLinkStyle= styled.a`
margin-top: 35px;
  font-size: 13px;
  font-weight: bold;
  color: ${Colors.color2};
  margin-left: 15px;
  margin-bottom: 5px;
`;