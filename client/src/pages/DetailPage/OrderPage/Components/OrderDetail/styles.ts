import styled from "@emotion/styled";

export const OrderDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	gap: 4.6875rem;
	padding-bottom: 3.125rem;
	.fullWidth {
		grid-template-columns: 1fr;
	}
`;

export const DetailSectionContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
	gap: 1.5625rem;
`;
