import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../../Recoil/OrderAtomState";
import { TicketData } from "../../../interfaces/DataInterfaces";
import { useOrderContext } from "../../Contexts/OrderContext";
import GrayBox from "../../../components/Box/GrayBox";
import { OrderedItemContainer } from "../styles";
import {
  Bold16Black,
  Bold20DarkGray,
  Bold24Black,
  Regular16Gray,
  Regular20DarkGray,
} from "../../../components/Text/Text";
import {
  ProductInfoContainer,
  ProductInfoTextContainer,
} from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/styles";
import SquareImage from "../../../components/Images/SquareImage";
import getSelectedPriceIndex from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { formatDate } from "../../../utils/DateFunctions";
import {
  TicketContainer,
  TicketInfo,
  TicketLeft,
  TicketRight,
} from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/components/TicketList";

type Props = {};

const OrderedItem = (props: Props) => {
  const selectedItem = useRecoilValue(selectedItemState);
  const [ticketData, setTicketData] = useState<TicketData[]>([]);
  const { orderTicketData, orderRange } = useOrderContext();

  useEffect(() => {
    setTicketData(orderTicketData);
  }, [orderTicketData]);
  return (
    <GrayBox verticalPadding={32} horizontalPadding={25}>
      <OrderedItemContainer>
        <Bold20DarkGray>결제 상품 내역</Bold20DarkGray>
        <ProductInfoContainer>
          <SquareImage
            imgUrl={selectedItem.img}
            size={window.innerWidth <= 768 ? 77 : 110}
            borderRadius={8}
          ></SquareImage>
          <ProductInfoTextContainer>
            {window.innerWidth <= 768 ? (
              <Bold16Black>{selectedItem.title}</Bold16Black>
            ) : (
              <Bold24Black>{selectedItem.title}</Bold24Black>
            )}

            <Regular16Gray>
              {formatDate(selectedItem.startDate)} {selectedItem.duration}일
            </Regular16Gray>
          </ProductInfoTextContainer>
        </ProductInfoContainer>
        {ticketData
          .filter((ticket) => ticket.count > 0)
          .map((ticket, index) => {
            const selectedPriceIndex = getSelectedPriceIndex(
              ticket,
              orderRange
            );
            const price =
              selectedPriceIndex !== -1
                ? ticket.priceList[selectedPriceIndex].price
                : 0;
            return (
              <TicketContainer>
                <TicketLeft>
                  <TicketInfo>
                    <Regular20DarkGray>{ticket.title}</Regular20DarkGray>
                    <Regular16Gray>{ticket.content}</Regular16Gray>
                  </TicketInfo>
                  <Regular16Gray className="hide-on-mobile">
                    {ticket.count} X {price.toLocaleString()}원
                  </Regular16Gray>
                </TicketLeft>
                <TicketRight>
                  <Bold20DarkGray>
                    {(ticket.count * price).toLocaleString()}원
                  </Bold20DarkGray>
                </TicketRight>
              </TicketContainer>
            );
          })}
      </OrderedItemContainer>
    </GrayBox>
  );
};

export default OrderedItem;
