import React from "react";

import { SubHeader } from "../../../../styles";
import { DetailSectionContainer } from "../../styles";

import ProductMain from "./components/ProductMain";
import TicketList from "./components/TicketList";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { TicketData } from "../../../../../../../Interfaces/DataInterfaces";
import getSelectedPriceIndex from "./getSelectedPriceIndex";
import {
	Bold20DarkGray,
	Bold24DarkGray,
} from "../../../../../../../components/Text/Text";
import { TotalPriceContainer } from "./styles";

export function ProductInfo() {
	const { orderTicketData, orderRange } = useOrderContext();
	const totalAmount = orderTicketData.reduce(
		(sum: number, ticket: TicketData) => {
			const selectedPriceIndex = getSelectedPriceIndex(
				ticket,
				orderRange
			);
			const price =
				selectedPriceIndex !== -1
					? ticket.priceList[selectedPriceIndex].price
					: 0;
			return sum + ticket.count * price;
		},
		0
	);
	return (
		<DetailSectionContainer>
			<SubHeader>상품정보</SubHeader>
			<ProductMain />
			<TicketList />
			<TotalPriceContainer>
				<Bold20DarkGray>총 상품 금액</Bold20DarkGray>
				<Bold24DarkGray>
					{totalAmount.toLocaleString()}원
				</Bold24DarkGray>
			</TotalPriceContainer>
		</DetailSectionContainer>
	);
}
