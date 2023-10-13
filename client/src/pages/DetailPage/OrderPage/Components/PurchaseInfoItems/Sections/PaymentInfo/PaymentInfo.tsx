import { useState, useEffect } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./PaymentInfo.module.scss";
import { TicketData } from "../../../../../../../interfaces/DataInterfaces";
import getSelectedPriceIndex from "../../../OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { SubHeader } from "../../../../styles";
import HorizontalLine from "../../../../../../../components/Lines/HorizontalLine";
import { OrderAmountContainer, PaymentInfoContainer } from "./styles";
import {
  Bold20AppColor,
  Regular16DarkGray,
  Bold32AppColor,
} from "../../../../../../../components/Text/Text";

export const PaymentInfo = () => {
  const { orderData, setOrderData, orderTicketData, orderRange } =
    useOrderContext();

  const totalAmount = orderTicketData.reduce(
    (sum: number, ticket: TicketData) => {
      const selectedPriceIndex = getSelectedPriceIndex(ticket, orderRange);
      const price =
        selectedPriceIndex !== -1
          ? ticket.priceList[selectedPriceIndex].price
          : 0;
      return sum + ticket.count * price;
    },
    0
  );

  return (
    <PaymentInfoContainer>
      <SubHeader>결제 정보</SubHeader>
      <HorizontalLine marginTop={20} marginBottom={30}></HorizontalLine>
      <OrderAmountContainer>
        <Regular16DarkGray>주문 금액</Regular16DarkGray>
        <Regular16DarkGray>{totalAmount.toLocaleString()}원</Regular16DarkGray>
      </OrderAmountContainer>
      {orderData.point > 0 && (
        <OrderAmountContainer>
          <Regular16DarkGray>포인트 사용</Regular16DarkGray>
          <Regular16DarkGray>{orderData.point}</Regular16DarkGray>
        </OrderAmountContainer>
      )}
      <OrderAmountContainer>
        <Bold20AppColor>총 결제 금액</Bold20AppColor>
        <Bold32AppColor>
          {(totalAmount - orderData.point).toLocaleString()}원
        </Bold32AppColor>
      </OrderAmountContainer>
    </PaymentInfoContainer>
  );
};
