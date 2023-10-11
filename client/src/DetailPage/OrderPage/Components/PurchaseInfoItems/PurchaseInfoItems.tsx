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
import getSelectedPriceIndex from "../OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { TicketData } from "../../../../Interfaces/DataInterfaces";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../Recoil/OrderAtomState";
import { WebButton } from "../../../../components/Button/WebButton";
import { useFormContext } from "react-hook-form";

type Props = {
	isLoading?: boolean;
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

	return (
		<PurchaseInfoItemsContainer>
			{isWeb && <PaymentInfo />}
			<Terms />
			<CancelPolicy />
			{!isWeb && <PaymentInfo />}
			<WebButton
				type="submit"
				verticalPadding={18}
				color="red"
				fontSize={20}
				isActive={true}
			>
				{(totalAmount - orderData.point).toLocaleString()}원 결제하기
			</WebButton>
		</PurchaseInfoItemsContainer>
	);
};
