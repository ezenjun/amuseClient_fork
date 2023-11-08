import styled from "styled-components";

export const Review = styled.div``;

export const Title = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: 700;
`;

export const Content = styled.div``;

export const Count = styled.div`
  color: #e6003d;
`;

export const Rated = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 12.5vw;
  min-height: 100px;
  padding: 5%;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #909090;
  font-family: "Pretendard";
  font-size: 30px;
`;

export const StarIcon = styled.img`
  width: 30px;
`;

export const ItemScore = styled.div`
  color: #000;
  font-size: 40px;
  font-weight: 700;
`;

export const Divide = styled.div`
  height: 100%;
  width: 1px;
  background-color: #ccc;
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const TotalStar = styled.div`
  display: flex;
  gap: 2.5px;
`;

export const TotalIcon = styled.img`
  width: 20px;
`;

export const TotalCount = styled.div`
  color: #909090;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
`;
