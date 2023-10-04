import { useState, useEffect } from "react";
import styles from "./PurchaseInfoItems.module.scss";
import { PointAccrual } from "./Sections/PointAccrual";
import { PaymentInfo } from "./Sections/PaymentInfo";
import { Terms } from "./Sections/Terms";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { styled } from "styled-components";
import { PurchaseInfoItemsContainer } from "./styles";
import { SubHeader } from "../../styles";
import HorizontalLine from "../../../../components/Lines/HorizontalLine";
import CancelPolicy from "./Sections/CancelPolicy/CancelPolicy";
import WebButton from "../../../../components/Button/WebButton";
import getSelectedPriceIndex from "../OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { TicketData } from "../../../../Interfaces/DataInterfaces";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../Recoil/OrderAtomState";

type Props = {
	isLoading: boolean;
};

export const PurchaseInfoItems = ({ isLoading }: Props) => {
	const { orderData, orderTicketData, orderRange } = useOrderContext();
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

	const buyBtnClickAlert = () => {
		console.log(paymentData);
	};

	const [isWeb, setIsWeb] = useState<boolean>(true);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		screenWidth >= 1024 ? setIsWeb(true) : setIsWeb(false);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [screenWidth]);

	// useEffect(() => {
	// 	if (privacy && takeVideo) {
	// 		setBuyBtn(
	// 			<button
	// 				type="submit"
	// 				form="orderForm"
	// 				disabled={isLoading}
	// 				style={{ fontFamily: "Pretendard-Regular" }}
	// 			>
	// 				{isLoading
	// 					? "결제중"
	// 					: `${(
	// 							orderData.productPrice - orderData.point
	// 					  ).toLocaleString("en")}원 결제`}
	// 			</button>
	// 		);
	// 	} else {
	// 		setBuyBtn(
	// 			<AlertBtn
	// 				onClick={() => {
	// 					buyBtnClickAlert();
	// 				}}
	// 				style={{}}
	// 			>
	// 				{`결제 확인`}
	// 			</AlertBtn>
	// 		);
	// 	}
	// }, [privacy, takeVideo]);

	return (
		<PurchaseInfoItemsContainer>
			{isWeb && <PaymentInfo />}
			<Terms />
			<CancelPolicy />
			{!isWeb && <PaymentInfo />}
			<WebButton
				verticalPadding={18}
				color="red"
				fontSize={20}
				onClick={buyBtnClickAlert}
			>
				{(totalAmount - orderData.point).toLocaleString()}원 결제하기
			</WebButton>
		</PurchaseInfoItemsContainer>
	);
};
