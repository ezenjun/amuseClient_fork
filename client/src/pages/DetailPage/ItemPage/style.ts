import styled from "styled-components";

export const Detail = styled.div`
  display: flex;
  padding: 50px 10%;
  gap: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  gap: 35px;
`;

export const Side = styled.div`
  @media (max-width: 1169px) {
    display: none;
  }
`;
