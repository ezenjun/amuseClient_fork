import styled from "styled-components";

export const CourseIntro = styled.div`
  display: flex;
  min-height: 260px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  font-family: "Pretendard";

  @media (max-width: 768px) {
    /* Mobile styles */
    flex-direction: column-reverse;
  }
`;

export const Image = styled.img`
  width: 30vw;
  min-width: 220px;
  height: 220px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    /* Mobile styles */
    width: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    /* Mobile styles */
    margin-bottom: 20px;
    min-height: 100px;
  }
`;

export const Divide = styled.div`
  margin-left: 15px;
  margin-right: 15px;

  @media (max-width: 768px) {
    /* Mobile styles */
    margin-left: 0px;
  }
`;

export const Icon = styled.div`
  color: #e6003d;
  font-size: 16px;
`;

export const Line = styled.div`
  height: 100%;
  margin-left: 5px;
  border-left: 2px solid #e3e3e3;

  @media (max-width: 768px) {
    /* Mobile styles */
    height: 85%;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  color: #464646;
  font-size: 17px;
  font-weight: 700;
`;

export const Time = styled.div`
  color: #909090;
  font-size: 15px;
  font-weight: 500;
  min-width: 100px;
  white-space: nowrap;
  text-align: right;
`;

export const Body = styled.div`
  color: #6a6a6a;
  font-size: 15px;
  font-weight: 500;
  white-space: pre-wrap;
`;
