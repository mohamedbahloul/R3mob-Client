import styled from 'styled-components';
export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  
`;

export const Input = styled.input`
  padding: 8px;
  padding-right: 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  @media (max-width: 1075px) {
    font-size : 10px;
    width: 100%;
  }
`;
export const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width : 100%;
  margin-top:20px;
  background-color: white;
  color: gray;
  @media (max-width: 1075px) {
    font-size : 10px;
  }
`;