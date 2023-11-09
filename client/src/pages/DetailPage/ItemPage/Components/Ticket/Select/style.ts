import styled from "styled-components";

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 32px 24px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 2px 3px 5px 0px rgba(33, 37, 41, 0.1);
  background-color: #ffffff;
  color: #343a40;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4px;
`;

export const Name = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const Detail = styled.div`
  color: #848c94;
  font-size: 14px;
  font-weight: 500;
`;

export const Payment = styled.div`
  display: flex;
  gap: 20px;
`;

export const Price = styled.div`
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
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MinusBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding-bottom: 5px;
  border: 1px solid #f184a1;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #f184a1;
  font-size: 30px;
  line-height: 32px;

  &.gray {
    color: #848c94;
    border-color: #848c94;
  }
`;

export const PlusBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #f184a1;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #f184a1;
  font-size: 30px;
  line-height: 32px;

  &.gray {
    color: #848c94;
    border-color: #848c94;
  }
`;
