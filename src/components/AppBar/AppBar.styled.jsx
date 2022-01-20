import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  height: 50px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    height: 100px;
    justify-content: space-evenly;
  }
`;
