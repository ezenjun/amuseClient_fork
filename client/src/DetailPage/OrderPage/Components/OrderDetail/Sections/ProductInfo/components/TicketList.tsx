import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../../../../../Contexts/OrderContext";
import { TicketData } from "../../../../../../../Interfaces/DataInterfaces";
import getSelectedPriceIndex from "../getSelectedPriceIndex";
import styles from "../ProductInfo.module.scss";
import styled from "@emotion/styled";
import GrayBox from "../../../../../../../components/Box/GrayBox";
import {
	Bold20DarkGray,
	Regular16Gray,
} from "../../../../../../../components/Text/Text";

type Props = {};

const TicketList = (props: Props) => {
	const { orderData, setOrderData, orderTicketData, orderRange } =
		useOrderContext();
	const [ticketData, setTicketData] = useState<TicketData[]>([]);

	useEffect(() => {
		setTicketData(orderTicketData);
	}, [orderTicketData]);

	return (
		<TicketListContainer>
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
						<GrayBox
							key={ticket.title}
							verticalPadding={31}
							horizontalPadding={27}
						>
							<TicketContainer>
								<TicketLeft>
									<TicketInfo>
										<Bold20DarkGray>
											{ticket.title}
										</Bold20DarkGray>
										<Regular16Gray>
											{ticket.content}
										</Regular16Gray>
									</TicketInfo>
									<Regular16Gray className="hide-on-mobile">
										{ticket.count} X{" "}
										{price.toLocaleString()}원
									</Regular16Gray>
								</TicketLeft>
								<TicketRight>
									{/* <Regular16Gray>
										{ticket.count} X{" "}
										{price.toLocaleString()}원
									</Regular16Gray> */}
									<Bold20DarkGray>
										{(
											ticket.count * price
										).toLocaleString()}
										원
									</Bold20DarkGray>
								</TicketRight>
							</TicketContainer>
						</GrayBox>
					);
				})}
		</TicketListContainer>
	);
};

export default TicketList;

export const TicketListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const TicketContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	gap: 4.1875rem;
	@media (max-width: 768px) {
		gap: 1.375rem;
	}
`;

export const TicketLeft = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	gap: 1.875rem;

	@media (max-width: 768px) {
		.hide-on-mobile {
			display: none;
		}
	}
`;
export const TicketInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.5rem;
`;

export const TicketRight = styled.div`
	display: flex;
	flex-shrink: 0;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	/* gap: 3.1875rem; */
	min-width: 7.125rem;
`;
