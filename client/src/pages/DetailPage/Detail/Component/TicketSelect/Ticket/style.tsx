import styled from "styled-components";

export const Ticket = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, auto);
  grid-template-rows: repeat(2, minmax(30px, auto));
  gap: 5px;
  background-color: #ffffff;
  padding: 32px 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 2px 3px 5px 0px rgba(33, 37, 41, 0.1);
  color: #343a40;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 310px;
  margin-bottom: 4px;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Detail = styled.div`
  color: #848c94;
  font-size: 14px;
  font-weight: 500;
`;

export const Price = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  min-width: 115px;
  display: flex;
  align-items: center;
`;

export const Number = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const Won = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding-top: 3px;
`;

export const Count = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MinusBtn = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  font-size: 30px;
  color: #f184a1;
  border: 1px solid #f184a1;
  border-radius: 50%;
  background-color: #f8f9fa;
  line-height: 32px;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;

  &.gray {
    color: #848c94;
    border-color: #848c94;
  }
`;

export const PlusBtn = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  font-size: 30px;
  color: #f184a1;
  border: 1px solid #f184a1;
  border-radius: 50%;
  background-color: #f8f9fa;
  line-height: 32px;
  align-items: center;
  justify-content: center;

  &.gray {
    color: #848c94;
    border-color: #848c94;
  }
`;
