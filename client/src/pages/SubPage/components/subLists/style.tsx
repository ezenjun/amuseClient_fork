import exp from "constants";
import styled from "styled-components";

export const SubLists = styled.div`
  @media (max-width: 768px) {
    /* Mobile styles */
    width: 400px;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    /* Tablet styles */
    width: 792px;
  }

  @media (min-width: 1024px) {
    /* Desktop styles */
    width: 1060px;
  }
`;

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
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 8px;
`;

export const Box = styled.div`
  position: relative;
  width: 250px;
  height: 270px;
  border-radius: 20px;
  border: 2px solid #efefef;
`;

export const BoxImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 62.5%;
  background-size: cover;
  border-radius: 20px 20px 0 0;
`;

export const BoxLike = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0);
`;

export const BoxTitle = styled.div`
  position: absolute;
  margin-left: 12.5px;
  margin-top: 180px;
  width: 90%;
  font-family: "Pretendard";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: 5;
  cursor: pointer;
`;

export const BoxPrice = styled.div`
  position: absolute;
  font-size: 15px;
  margin-left: 12.5px;
  margin-top: 230px;
  width: 90%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: 5;
  cursor: pointer;
`;
