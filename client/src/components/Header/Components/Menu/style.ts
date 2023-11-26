import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: #464646;
`;

export const DropContent = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: 200px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 12px 0;
  left: -25px;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropContent} {
    display: block;
    animation: ${fadeIn} 0.5s;
  }
`;

export const DropButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

export const Item = styled.div`
  cursor: pointer;
  display: block;
  padding: 15px 20px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Category = styled.div`
  cursor: pointer;
  padding-bottom: 15px;
  &:hover {
    color: #e6003d;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: 0;
    left: 15px;
    height: 60px;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
`;

export const MobileMenu = styled.div`
  margin-top: 25px;
`;
