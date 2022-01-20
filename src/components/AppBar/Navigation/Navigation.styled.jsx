import styled from '@emotion/styled';

export const NavigationStyled = styled.nav`
  display: flex;
  margin-left: 25px;
  justify-content: space-around;

  @media screen and (max-width: 480px) {
    margin: 0;
  }

  & a {
    cursor: pointer;
    text-decoration: none;
    color: white;
    margin: 10px;
  }
`;
