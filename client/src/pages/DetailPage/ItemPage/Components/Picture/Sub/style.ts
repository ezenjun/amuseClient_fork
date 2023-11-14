import styled from "styled-components";

export const Sub = styled.div`
  position: relative;
  width: 32.8%;
  padding-bottom: 24%;
`;

export const Image = styled.img`
  cursor: pointer;
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;

  &:hover {
    opacity: 0.9;
  }
`;