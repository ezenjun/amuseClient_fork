import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../Contexts/OrderContext";
import { useRecoilState, useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../Recoil/OrderAtomState";
import { TicketData } from "../../../../Interfaces/DataInterfaces";
import getSelectedPriceIndex from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import GrayBox from "../../../../components/Box/GrayBox";
import { PointRow } from "./UsedPoint";
import { Bold24AppColor } from "../../../../components/Text/Text";
import { getDataFromLocalStorage } from "../../OrderPage/api";

const TotalAmount = () => {
	const { orderTicketData, orderRange, setOrderTicketData, setOrderRange } =
		useOrderContext();
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);
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
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [screenWidth]);

	useEffect(() => {
		if (!paymentData.itemId) {
			const paymentLocalStorageData =
				getDataFromLocalStorage("__paymentData__");
			setPaymentData(paymentLocalStorageData);
		}

		if (!orderTicketData[0]) {
			const data = getDataFromLocalStorage("orderTicketData");
			setOrderTicketData(data);
		}
		if (!orderRange) {
			const data = getDataFromLocalStorage("orderRange");
			if (data && data.from && data.to) {
				data.from = new Date(data.from);
				data.to = new Date(data.to);
				setOrderRange(data);
			}
		}
	});
	return (
		<GrayBox
			verticalPadding={screenWidth <= 768 ? 17 : 31}
			horizontalPadding={screenWidth <= 768 ? 14 : 31}
			gap={26}
		>
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
