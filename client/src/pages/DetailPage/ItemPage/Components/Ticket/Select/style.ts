import styled from "styled-components";

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #f8f9fa;
  color: #464646;
  font-family: "Pretendard";

  @media (max-width: 768px) {
    /* Mobile styles */
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4px;
`;

export const Name = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
`;

export const Detail = styled.div`
  color: #909090;
  font-size: 15px;
  font-weight: 500;
`;

export const Payment = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    /* Mobile styles */
    justify-content: space-between;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 700;
`;

export const Count = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
`;

export const MinusBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding-bottom: 5px;
  border: 1px solid #e6003d;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #e6003d;
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
  border: 1px solid #e6003d;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #e6003d;
  font-size: 30px;
  line-height: 32px;

  /* &.gray {
    color: #848c94;
    border-color: #848c94;
  } */
`;
