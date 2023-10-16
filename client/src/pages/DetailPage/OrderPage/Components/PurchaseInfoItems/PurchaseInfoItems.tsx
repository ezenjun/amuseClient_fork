import { useOrderContext } from "../../../Contexts/OrderContext";
import { PurchaseInfoItemsContainer } from "./styles";
import getSelectedPriceIndex from "../OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { TicketData } from "../../../../../Interfaces/DataInterfaces";
import { WebButton } from "../../../../../components/Button/WebButton";
import { PaymentInfo } from "./Sections/PaymentInfo/PaymentInfo";
import { Terms } from "../OrderDetail/Sections/Terms";
import { CancelPolicy } from "../OrderDetail/Sections/CancelPolicy/CancelPolicy";

type Props = {
	isLoading?: boolean;
};

export const PurchaseInfoItems = ({ isLoading }: Props) => {
	const { orderData, orderTicketData, orderRange } = useOrderContext();

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
			<PaymentInfo />
			<Terms />
			<CancelPolicy />
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