import styled from 'styled-components';


export const BodyContainer = styled.div`
  height: 95vh;
  width: 100vw;
  background: red;
  font-family: sans-serif;
  text-align: center;
  color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  background: #333;
  padding: 2em 2em 0;
`;

export const MainContainer = styled.main`
  display: flex;
  flex: 3 3 100px;
`;

export const LeftContainer = styled.aside`
  background: blue;
  padding: 3em 3em 0;
  flex: 1 1 100px;
`;

export const ContentContainer = styled.div`
  background: green;
  padding: 3em 3em 0;
  flex: 10 10 100px;
`;

export const RightContainer = styled.aside`
  background: yellow;
  padding: 3em 3em 0;
  flex: 1 1 100px;
`;

export const FooterContainer = styled.footer`
  background: #333;
  padding: 1em 0;
`;