import styled from "@emotion/styled";
import { Common } from "../../../../../../styles";

export const TermsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
`;

export const TermsBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	padding: 1.4375rem 1.0625rem 1.25rem 1.0625rem;
	border-radius: 0.5rem;
	border: 1px solid ${Common.colors.gray2};
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
	justify-content: space-between;
`;
