import styled from "styled-components";

export const Popup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const List = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainImage = styled.img`
  max-width: 60%;
  max-height: 60%;
`;

export const SubImage = styled.img`
  height: 90px;
  width: 110px;
  margin: 0 3px 6px;
`;

export const LeftButton = styled.button`
  position: absolute;
  right: calc(90% + 10px); /* 50% + 버튼 너비 / 2 */
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;

  &:hover {
    color: #ccc;
  }
`;

export const RightButton = styled.button`
  position: absolute;
  left: calc(90% + 10px); /* 50% + 버튼 너비 / 2 */
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;

  &:hover {
    color: #ccc;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;

  &:hover {
    color: #ccc;
  }
`;
