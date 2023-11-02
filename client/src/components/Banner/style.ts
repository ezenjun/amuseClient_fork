import styled from "styled-components";

export const Banner = styled.div`
  min-width: 100%;
  padding: 0 10%;
`;

export const Image = styled.img`
  object-fit: cover;
  cursor: pointer;
  min-width: 100%;
  max-height: 140px;

  @media (max-width: 769px) {
    /* Tablet styles */
    max-height: 100px;
  }
`;
