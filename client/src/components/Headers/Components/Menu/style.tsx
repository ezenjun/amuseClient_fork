import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #464646;

  @media (max-width: 768px) {
    /* Mobile styles */
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    /* Tablet styles */
    width: 792px;
  }

  @media (min-width: 1024px) {
    /* Desktop styles */
    width: 1060px;
  }
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
`;

export const DropdownItem = styled.div`
  padding: 20px;
  cursor: pointer;
`;
