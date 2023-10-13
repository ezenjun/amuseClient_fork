import React, { useEffect, useState } from "react";
import MainComponent from "../../MainComponent";
import { PageName } from "../OrderPage/styles";
import { OrderCompletePageContainer, OrderedItemContainer } from "./styles";
import GrayBox from "../../components/Box/GrayBox";
import {
  ProductInfoContainer,
  ProductInfoTextContainer,
} from "../OrderPage/Components/OrderDetail/Sections/ProductInfo/styles";
import SquareImage from "../../components/Images/SquareImage";
import {
  Bold16Black,
  Bold20DarkGray,
  Bold24Black,
  Regular16Gray,
  Regular20DarkGray,
  Regular20Gray,
} from "../../components/Text/Text";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../Recoil/OrderAtomState";
import { formatDate } from "../../utils/DateFunctions";
import { TicketData } from "../../interfaces/DataInterfaces";
import { useOrderContext } from "../Contexts/OrderContext";
import getSelectedPriceIndex from "../OrderPage/Components/OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import {
  TicketContainer,
  TicketInfo,
  TicketLeft,
  TicketRight,
} from "../OrderPage/Components/OrderDetail/Sections/ProductInfo/components/TicketList";
import OrderedItem from "./Sections/OrderedItem";

type Props = {};

const OrderCompletePage = (props: Props) => {
  const selectedItem = useRecoilValue(selectedItemState);
  const [ticketData, setTicketData] = useState<TicketData[]>([]);
  const { orderTicketData, orderRange } = useOrderContext();

  useEffect(() => {
    setTicketData(orderTicketData);
  }, [orderTicketData]);
  return (
    <MainComponent>
      <OrderCompletePageContainer>
        <PageName>결제 접수 완료</PageName>
        <Regular20Gray>
          결제 완료되었으며 결제 여부 확인 중입니다. 영업일 기준 24시간 이내로
          확정 여부를 알려드립니다.
        </Regular20Gray>
        <OrderedItem></OrderedItem>
      </OrderCompletePageContainer>
    </MainComponent>
  );
};

export default OrderCompletePage;
