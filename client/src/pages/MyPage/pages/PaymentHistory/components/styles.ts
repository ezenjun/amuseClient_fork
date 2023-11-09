import styled from "@emotion/styled";
import { Common } from "../../../../../styles";

export const EachPaymentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: ${Common.colors.bgGray};
	padding: 1.375rem 1.5rem 1.25rem 1.5rem;
	border-radius: 0.5rem;
	gap: 1rem;
	cursor: pointer;
	:hover {
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* Add your hover effect here */
		transform: scale(1.001); /* Optional: Add a scale effect on hover */
	}
`;

export const EachPaymentTabletContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: ${Common.colors.bgGray};
	padding: 1.375rem 1.5rem 1.25rem 1.5rem;
	border-radius: 0.5rem;
	gap: 1rem;
	cursor: pointer;
	:hover {
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* Add your hover effect here */
		transform: scale(1.001); /* Optional: Add a scale effect on hover */
	}
`;

export const ItemInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.875rem;
`;

export const ItemInfoTabletContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.875rem;
`;
export const InfoTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
export const PaymentButtonContainer = styled.div`
	display: flex;
	height: auto;
`;
