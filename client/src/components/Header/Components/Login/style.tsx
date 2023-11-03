import styled from "styled-components";

export const Login = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
  margin-bottom: 5px;
  gap: 40px;

  @media (max-width: 768px) {
    /* Mobile styles */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left: 17.5%;
  }
`;

export const Button = styled.button`
  color: #9e9e9e;
  font-family: "Pretendard";
  font-size: 12px;
  font-weight: 500;

  @media (max-width: 768px) {
    /* Mobile styles */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: -7.5%;
    font-size: 15px;
    color: #666d75;
    font-family: "Pretendard";
    font-weight: 600;
    width: 200px;
    height: 50px;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }
`;
