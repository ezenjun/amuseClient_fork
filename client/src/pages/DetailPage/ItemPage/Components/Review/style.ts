import styled from "styled-components";

export const Review = styled.div`
  font-family: "Pretendard";
`;

export const Title = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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
  font-size: 1.87rem;
`;

export const StarIcon = styled.img`
  width: 2vw;
  min-width: 20px;
`;

export const ItemScore = styled.div`
  color: #000;
  font-size: 2.5rem;
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
  justify-content: center;
  gap: 10px;
`;

export const TotalStar = styled.div<{ width?: number }>`
  display: flex;
  position: absolute;
  width: ${(props) => props.width}px;
  overflow: hidden;
  padding-bottom: 30px;
  gap: 3px;
`;

export const BackStar = styled.div`
  display: flex;
  position: absolute;
  padding-bottom: 30px;
  gap: 3px;
  fill: #ccc;
  color: #ccc;
`;

export const TotalIcon = styled.img`
  width: 20px;
`;

export const TotalCount = styled.div`
  padding-top: 30px;
  color: #909090;
  font-size: 16px;
  font-weight: 500;
`;

export const ReviewData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const LastReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 30px;
  gap: 10px;
  border-radius: 91px;
  font-size: 16px;
  font-weight: 500;
  background: #f8f9fa;
  color: #909090;
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
