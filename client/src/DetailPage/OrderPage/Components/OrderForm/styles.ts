import styled from "@emotion/styled";

export const OrderInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	gap: 1.25rem;
	box-sizing: border-box;
	@media screen and (max-width: 1023px) {
		display: grid;
		grid-template-areas: "main";
		grid-template-columns: 1fr;
	}
`;
