import styled from "styled-components";

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
`;

export const Image = styled.img`
  cursor: pointer;
  width: 158px;
  height: 59px;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 22px;
  padding-right: 10px;
  border-radius: 50px;
  border: 1px solid #ccc;
  width: 400px;
  height: 42px;
`;

export const Input = styled.input`
  width: 100%;
  color: #909090;
  font-family: "Pretendard";
  font-size: 12.5px;
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
