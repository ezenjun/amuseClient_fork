import styled from "styled-components";

export const Main = styled.div`
  position: relative;
  padding-bottom: 62%;
  margin-bottom: 10px;
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
