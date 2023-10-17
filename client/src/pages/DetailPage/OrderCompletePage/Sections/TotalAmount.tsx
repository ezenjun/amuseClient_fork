import React from "react";
import { useOrderContext } from "../../Contexts/OrderContext";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../Recoil/OrderAtomState";
import { TicketData } from "../../../../Interfaces/DataInterfaces";
import getSelectedPriceIndex from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import GrayBox from "../../../../components/Box/GrayBox";
import { PointRow } from "./UsedPoint";
import { Bold24AppColor } from "../../../../components/Text/Text";

const TotalAmount = () => {
	const { orderTicketData, orderRange } = useOrderContext();
	const paymentData = useRecoilValue(PaymentDataState);
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
		<GrayBox verticalPadding={31} horizontalPadding={31} gap={26}>
			<PointRow>
				<Bold24AppColor>총 결제 금액</Bold24AppColor>
				<Bold24AppColor>
					{totalAmount - paymentData.pointUsed}원
				</Bold24AppColor>
			</PointRow>
		</GrayBox>
	);
};

export default TotalAmount;
