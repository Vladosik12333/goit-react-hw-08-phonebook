import styled from '@emotion/styled';

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  padding: 0;
  margin: 30px auto 0 auto;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.h2`
  margin: 150px auto;
  width: 300px;
  text-align: center;
`;

export const ContainerSwitch = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  align-items: center;
  margin-right: 30px;

  @media screen and (max-width: 480px) {
    justify-content: center;
    margin: 30px 0 0 0;
  }
`;
