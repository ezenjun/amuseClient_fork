import styled from "styled-components";

export const Banner = styled.div`
  min-width: 100%;
  padding: 0 10%;
`;

export const Image = styled.img`
  object-fit: cover;
  cursor: pointer;
  width: 100%;
  height: 140px;

  @media (max-width: 768px) {
    height: 100px;
  }
`;
