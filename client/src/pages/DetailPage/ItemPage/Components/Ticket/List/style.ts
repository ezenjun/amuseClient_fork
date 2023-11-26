import styled from "styled-components";

export const List = styled.div`
  border: 1px solid #e9ecef;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 24px;
  font-family: "Pretendard";
  color: #343a40;
`;

export const Select = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Date = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #343a40;
  margin-bottom: 20px;
`;

export const Ticket = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding: 24px 0px;
  border-bottom: 1px solid #e9ecef;
  color: #848c94;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 66%;

  @media (max-width: 768px) {
    /* Mobile styles */
    flex-direction: column;
  }
`;

export const Count = styled.div``;

export const Price = styled.div`
  font-weight: 600;
  min-width: 120px;
  text-align: right;
  color: #343a40;
`;

export const Total = styled.div`
  text-align: right;
  margin-top: 24px;
`;

export const Title = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-right: 16px;
`;

export const Amount = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #e6003d;
`;
