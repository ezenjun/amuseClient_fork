import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  object-fit: cover;

  @media (min-width: 1024px) {
    /* Desktop styles */
    height: 330px;
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    /* Tablet styles */
    height: 192.5px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    height: 184px;
  }
`;
