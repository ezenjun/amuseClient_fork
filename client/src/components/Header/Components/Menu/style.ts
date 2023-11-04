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
  margin-bottom: 15px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #464646;
`;

export const More = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

export const Dropdown = styled.div`
  position: absolute;
  display: none;
  top: 165px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 9;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.1s ease;
`;

export const DropdownItem = styled.div`
  padding: 20px;
  cursor: pointer;
`;

export const Category = styled.div`
  cursor: pointer;
  &:hover {
    color: #e6003d;
  }
`;
