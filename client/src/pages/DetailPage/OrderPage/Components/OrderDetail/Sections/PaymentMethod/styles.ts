import styled from "@emotion/styled";

export const EachPaymentNotice = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 160%;
`;

export const PayMethodList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.25rem;

	@media screen and (max-width: 1023px) {
		display: grid;
		grid-template-columns: 1fr;
	}
`;
