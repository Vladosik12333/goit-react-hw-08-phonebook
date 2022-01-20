import styled from '@emotion/styled';

export const Form = styled.form`
  height: auto;
  display: flex;
  flex-direction: column;
  width: 250px;
  justify-content: space-evenly;
  align-items: center;
  margin: 50px auto 0 auto;
`;

export const Input = styled.input`
  width: 200px;
  height: 20px;
  padding-left: 5px;
`;

export const Button = styled.button`
  cursor: pointer;
  background: inherit;
  border: 1px solid;
  border-radius: 5px;
  height: 30px;
  width: 80px;
  margin-top: 30px;
`;

export const InfoError = styled.p`
  color: grey;
  font-size: 14px;
  width: 200px;
  text-align: center;
`;
