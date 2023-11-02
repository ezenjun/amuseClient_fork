import styled from "styled-components";

export const List = styled.div`
  width: 100%;
  padding: 0 10%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  color: #e6003d;
  font-family: yg-jalnan;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Count = styled.div`
  color: #909090;
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 8px;
`;

export const BoxList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  overflow: auto;
  gap: 1.4vw;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1024px) {
    /* Desktop styles */
    flex-wrap: wrap;
  }
`;
