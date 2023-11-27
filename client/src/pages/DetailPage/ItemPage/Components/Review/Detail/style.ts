import styled from "styled-components";

export const ReviewDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard";
  margin-top: 30px;
  gap: 30px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #909090;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StarIcon = styled.img`
  width: 20px;
`;

export const Rated = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  gap: 4px;
`;

export const Score = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 700;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const Date = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const Content = styled.div`
  color: #909090;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  line-height: 138%;
`;

export const Sub = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    /* Mobile styles */
    gap: 8px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eceef1;
`;
