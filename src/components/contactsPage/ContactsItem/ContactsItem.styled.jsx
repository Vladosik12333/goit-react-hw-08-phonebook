import styled from '@emotion/styled';

export const Item = styled.li`
  width: 200px;
  height: 100px;
  display: flex;
  border-radius: 4px;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 15px;
  border: 1px solid grey;

  & p {
    margin: 2px 0;
  }

  & button {
    background-color: #fff;
    border: 1px solid black;
    border-radius: 4px;
    width: 70px;
    height: 50px;
    cursor: pointer;
    transition: 250ms ease;
    height: 25px;
    margin-top: 10px;

    &:hover {
      background-color: greenyellow;
    }
  }
`;

export const Form = styled.form`
  width: 200px;
  height: 200px;
  display: flex;
  border-radius: 4px;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 15px;
  border: 1px solid grey;
`;

export const Input = styled.input`
  width: 150px;
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
  margin-top: 15px;
`;

export const InfoError = styled.p`
  color: grey;
  font-size: 14px;
  width: 150px;
  height: 30px;
  text-align: center;
  margin: 5px 0;
`;
