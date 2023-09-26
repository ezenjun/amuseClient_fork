import styled from "@emotion/styled";
import { Common } from "../../../../styles";

export const PurchaseInfoItemsContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	position: sticky;
	/* margin: 0 auto; */
	padding: 1.875rem;
	top: 32px;
	width: 23.125rem;
	height: 100%;
	box-sizing: border-box;
	border: 1px solid ${Common.colors.gray2};
	border-radius: 0.5rem;
	gap: 1.875rem;
	@media screen and (max-width: 1023px) {
		display: inline-flex;
		width: 100%;
		height: 100%;
		border: 0;
		padding: 0;
		gap: 1.875rem;
	}
`;
