import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  flex-shrink: 0;
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
  color: #ffffff;
  z-index: 9;
  cursor: pointer;
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
