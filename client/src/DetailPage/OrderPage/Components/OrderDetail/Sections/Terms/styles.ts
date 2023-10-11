import styled from "@emotion/styled";
import { Common } from "../../../../../../styles";

export const TermsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
`;

export const TermsBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	flex-direction: column;
	gap: 1.25rem 2.5rem;
	padding: 23px 1.0625rem 1.25rem 1.0625rem;
	border-radius: 0.5rem;
	border: 1px solid ${Common.colors.gray2};

	@media screen and (max-width: 1023px) {
		display: grid;
		grid-template-columns: 1fr;
	}
`;

export const TermsRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 0.75rem;
`;

export const TermsRight = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	/* gap: 1.5rem; */
	justify-content: space-between;
`;
