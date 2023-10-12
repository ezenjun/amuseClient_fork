import styled from "@emotion/styled";

export const OrderCompletePageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100%;
	box-sizing: border-box;
	/* gap: 2rem; */
	padding: 4.6875rem 10% 7.5rem 10%;
	::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 768px) {
		/* Mobile styles */
		padding: 2.5rem 1rem;
	}
`;

export const OrderedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	gap: 1.625rem;
	::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 768px) {
		/* Mobile styles */
		padding: 2.5rem 1rem;
	}
`;
