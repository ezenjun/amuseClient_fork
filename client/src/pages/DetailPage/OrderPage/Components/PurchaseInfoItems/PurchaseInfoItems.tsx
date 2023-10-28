import { useOrderContext } from "../../../Contexts/OrderContext";
import { PurchaseInfoItemsContainer } from "./styles";
import getSelectedPriceIndex from "../OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { TicketData } from "../../../../../Interfaces/DataInterfaces";
import { WebButton } from "../../../../../components/Button/WebButton";
import { PaymentInfo } from "./Sections/PaymentInfo/PaymentInfo";
import { Terms } from "../OrderDetail/Sections/Terms";
import { CancelPolicy } from "../OrderDetail/Sections/CancelPolicy/CancelPolicy";
import { useEffect, useState } from "react";

type Props = {
	isLoading?: boolean;
};

export const PurchaseInfoItems = ({ isLoading }: Props) => {
	const { orderData, orderTicketData, orderRange } = useOrderContext();
	const [isWeb, setIsWeb] = useState<boolean>(true);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.innerWidth >= 1024 ? setIsWeb(true) : setIsWeb(false);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [screenWidth]);

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
		<PurchaseInfoItemsContainer>
			{screenWidth >= 1024 && <PaymentInfo />}
			<Terms />
			<CancelPolicy />
			{screenWidth < 1024 && <PaymentInfo />}
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
