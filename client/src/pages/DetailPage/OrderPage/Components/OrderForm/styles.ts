import styled from "@emotion/styled";

export const OrderInfoContainer = styled.form`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	gap: 1.25rem;
	padding-bottom: 3.125rem;
	box-sizing: border-box;
	@media screen and (max-width: 1023px) {
		display: grid;
		grid-template-areas: "main";
		grid-template-columns: 1fr;
	}
`;
