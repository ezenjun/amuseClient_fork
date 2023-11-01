import styled from "styled-components";

export const TicketList = styled.div`
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
  padding: 24px;
  color: #343a40;
`;

export const Date = styled.div`
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 15px;
`;

export const Ticket = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 24px 0px;
  border-bottom: 1px solid #e9ecef;
  color: #848c94;
`;

export const Count = styled.div``;

export const Price = styled.div`
  font-weight: 600;
  width: 92px;
  min-width: 80px;
  text-align: right;
  color: #343a40;
`;

export const Total = styled.div`
  text-align: right;
  margin-top: 24px;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: 16px;
`;

export const Amount = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #f184a1;
`;
