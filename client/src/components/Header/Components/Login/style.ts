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
    margin-top: 0;
    left: 15px;
    gap: 7px;
  }
`;

export const Button = styled.button<{ type?: string }>`
  color: #464646;
  font-family: "Pretendard";
  font-size: 13.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    /* Mobile styles */
    width: 260px;
    height: 48px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #909090;

    ${(props) =>
      props.type === "signup" &&
      `
      background-color: #E6003D;
      color: #fff;
      border: none;
    `}
  }
`;
