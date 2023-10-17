import React from "react";
import GrayBox from "../../../../components/Box/GrayBox";
import styled from "@emotion/styled";
import { Bold20DarkGray, Bold20Gray } from "../../../../components/Text/Text";
import { useOrderContext } from "../../Contexts/OrderContext";
import { TicketData } from "../../../../Interfaces/DataInterfaces";
import getSelectedPriceIndex from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../Recoil/OrderAtomState";

const UsedPoint = () => {
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
				<Bold20DarkGray>주문 금액</Bold20DarkGray>
				<Bold20DarkGray>
					{totalAmount.toLocaleString()}원
				</Bold20DarkGray>
			</PointRow>
			{paymentData.pointUsed > 0 && (
				<PointRow>
					<Bold20Gray>포인트 사용</Bold20Gray>
					<Bold20Gray>-{paymentData.pointUsed}원</Bold20Gray>
				</PointRow>
			)}
		</GrayBox>
	);
};

export default UsedPoint;

export const PointRow = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;
