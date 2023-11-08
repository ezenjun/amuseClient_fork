import styled from "styled-components";

export const CourseIntro = styled.div`
  display: flex;
  height: 260px;
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f9fa;
`;

export const Image = styled.img`
  min-width: 260px;
  min-height: 220px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Divide = styled.div`
  margin-left: 30px;
  margin-right: 10px;
`;

export const Icon = styled.div`
  color: #e6003d;
`;

export const Line = styled.div`
  height: 100%;
  margin-left: 5px;
  border-left: 2px solid #e3e3e3;
`;

export const Content = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  color: #464646;
  font-family: "Pretendard";
  font-size: 17px;
  font-weight: 700;
  line-height: normal;
`;

export const Time = styled.div`
  color: #909090;
  font-family: "Pretendard";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Body = styled.div`
  color: #6a6a6a;
  text-align: justify;
  font-family: "Pretendard";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  white-space: pre-wrap;
`;
