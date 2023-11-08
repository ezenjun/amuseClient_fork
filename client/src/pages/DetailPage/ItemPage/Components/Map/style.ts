import styled from "styled-components";

export const Map = styled.div`
  margin-bottom: -35px;
`;

export const Day = styled.div`
  display: flex;
`;

export const DayButton = styled.button`
  padding: 10px 20px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 2%;
  color: #343a40;
  font-size: 14px;
  font-weight: 600;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &.selected {
    background-color: #f184a1;
    color: #ffffff;
  }
`;
