import styled from "styled-components";

export const Login = styled.div`
  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
    gap: 40px;
  }

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
  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    border: none;
    background-color: transparent;
    color: #9e9e9e;
    text-align: right;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
  }

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
    font-family: Pretendard;
    font-weight: 600;
    width: 200px;
    height: 50px;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }
`;

export const JoinButton = styled.button`
  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    border: none;
    background-color: transparent;
    color: #9e9e9e;
    text-align: right;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: -7.5%;
    margin-top: 10px;

    font-size: 15px;
    color: white;
    font-family: Pretendard;
    font-weight: 600;
    width: 200px;
    height: 50px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    background-color: #e6003d;
  }
`;
