import styled from "styled-components";

export const Reservation = styled.div`
  width: 320px;
  position: sticky;
  top: 100px;
  left: 950px;
  margin-top: 50px;
`;

export const Main = styled.div`
  width: 320px;
  height: 280px;
  padding: 30px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--2, #ccc);
`;

export const StartPrice = styled.div`
  color: #909090;
  font-family: "Pretendard";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 5px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.div`
  display: flex;
  gap: 13px;
`;

export const PriceNum = styled.div`
  font-family: "Pretendard";
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const PriceMin = styled.div`
  color: #909090;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Share = styled.img`
  width: 24px;
  height: 24px;
`;

export const Payment = styled.button`
  margin-top: 15px;
  width: 260px;
  height: 55px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.4px;
  background-color: #e6003d;
`;

export const Wish = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  width: 260px;
  height: 55px;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  color: #36393e;
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Heart = styled.img`
  width: 24px;
`;

export const HeartCount = styled.div`
  margin-top: 12px;
  color: #ccc;
  text-align: center;
  font-family: "Pretendard";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Manager = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  width: 320px;
  height: 65px;
  padding: 11.5px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImg = styled.img`
  width: 40px;
`;

export const ProfileName = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Inquiry = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fb5984;
`;

export const InquiryText = styled.div`
  color: #fb5984;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const ProductCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  width: 320px;
  height: 38px;
  border-radius: 35px;
  background: #f9f9f9;
`;

export const ProductCodeText = styled.div`
  color: #676c75;
  text-align: center;
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
