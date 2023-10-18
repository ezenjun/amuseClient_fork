import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Hamburger = styled.div`
  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    display: flex;
    align-items: center;
    gap: 35px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const HamImage = styled.img`
  cursor: pointer;
`;

export const Image = styled.img`
  width: 158px;
  height: 59px;
`;

export const Blank = styled.div`
  width: 24px;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 22px;
  padding-right: 10px;
  border-radius: 50px;
  border: 1px solid var(--2, #ccc);

  @media (min-width: 768px) {
    /* Desktop & Tablet styles */
    width: 400px;
    height: 42px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    width: 400px;
    height: 42px;
    margin-top: 5px;
  }
`;

export const Input = styled.input`
  width: 100%;
  color: #909090;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

export const Side = styled.div`
  display: none;
  position: fixed;
  overflow: hidden;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.open {
    display: block;
  }
`;

export const SideBack = styled.div`
  display: none;
  position: fixed;
  overflow: hidden;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.open {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
    animation: ${fadeIn} 0.1s ease;
  }
`;

export const SideMenu = styled.div`
  display: none;
  position: fixed;
  overflow: hidden;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: white;
  &.open {
    display: block;
    width: 50%;
    height: 100%;
    animation: ${fadeIn} 0.1s ease;
  }
`;

export const SideImage = styled.img`
  position: relative;
  width: 158px;
  height: 59px;
  left: 17.5%;
  margin: 20px 0px;
`;
