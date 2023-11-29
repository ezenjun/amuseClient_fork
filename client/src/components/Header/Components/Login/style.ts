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
    gap: 10px;
  }
`;

export const Button = styled.button`
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
  }
`;

export const Join = styled.button<{ type?: string }>`
  color: #464646;
  font-family: "Pretendard";
  font-size: 13.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    /* Mobile styles */
    margin-left: 15px;
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

export const User = styled.div`
  display: flex;
  align-items: center;
  color: #464646;
  font-family: "Pretendard";
  font-size: 13.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    /* Mobile styles */
    height: 48px;
    font-size: 20px;
    font-weight: 700;
    color: #464646;
    white-space: nowrap;
  }
`;

export const Menu = styled.div`
  display: none;

  @media (max-width: 768px) {
    /* Mobile styles */
    display: block;
    width: 100%;
  }
`;

export const Logout = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #464646;
  font-family: "Pretendard";
  font-size: 13.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    /* Mobile styles */
    margin-top: 20px;
    padding: 0 15px;
    font-size: 15px;
    color: #909090;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    /* Mobile styles */
    justify-content: space-between;
    gap: 0px;
    padding: 0 15px;
    /* margin-bottom: 20px; */
  }
`;

export const MyPage = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #464646;
  font-size: 13.5px;
  font-family: "Pretendard";
  background-color: transparent;

  @media (max-width: 768px) {
    /* Mobile styles */
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 6px 8px;
    color: #909090;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  }
`;

export const Scroll = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    height: 370px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
