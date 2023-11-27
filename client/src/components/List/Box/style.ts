import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  width: 18.95vw;
  min-width: 160px;
  height: 19.5vw;
  min-height: 180px;
  border-radius: 8px;
  border: 2px solid #efefef;
  cursor: pointer;
`;

export const BoxLike = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  z-index: 2;
  cursor: pointer;
`;

export const HeartIcon = styled.img``;

export const Photo = styled.div`
  display: flex;
`;

export const BoxImage = styled.img`
  width: 100%;
  height: 11.5vw;
  min-height: 100px;
  background-size: cover;
  border-radius: 8px 8px 0 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7.5vw;
  min-height: 75px;
`;

export const BoxTitle = styled.div`
  padding: 5% 5% 0 5%;
  font-family: "Pretendard";
  font-size: 0.9rem;
  font-weight: 600;
`;

export const BoxPrice = styled.div`
  bottom: 0;
  padding: 0 5% 5% 5%;
  font-family: "Pretendard";
  font-size: 0.95rem;
  font-weight: 600;
`;
