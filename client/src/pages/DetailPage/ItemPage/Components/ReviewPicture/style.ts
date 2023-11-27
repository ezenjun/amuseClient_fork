import styled from "styled-components";

export const Picture = styled.div``;

export const Title = styled.div`
  display: flex;
  gap: 10px;
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Content = styled.div``;

export const Count = styled.div`
  color: #e6003d;
`;

export const List = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    /* Mobile styles */
    gap: 8px;
  }
`;

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909090;
  margin-top: 15px;
`;

export const Button = styled.button`
  background-color: transparent;
  border: transparent;
  margin-top: 4px;
  padding: 0 1%;

  &:disabled {
    background-color: transparent;
  }
`;
