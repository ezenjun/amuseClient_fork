import styled from "styled-components";

export const Sub = styled.div<{ type: string }>`
  position: relative;
  padding-bottom: 24%;
  width: ${(props) => (props.type === "review" ? "13.5vw" : "32.4%")};

  @media (max-width: 1023px) {
    /* tablet styles */
    width: ${(props) => (props.type === "review" ? "19vw" : "32.4%")};
  }
  @media (max-width: 768px) {
    /* Mobile styles */
    width: ${(props) => (props.type === "review" ? "20.8vw" : "32.4%")};
  }
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
