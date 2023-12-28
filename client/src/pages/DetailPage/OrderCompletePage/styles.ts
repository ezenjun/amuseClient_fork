import styled from "@emotion/styled";

export const OrderCompletePageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
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
`;

export const OrderInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-top: 1.25rem;
`;

export const BottomButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 1.25rem;
	margin-top: 1.875rem;
	padding: 0 25%;
	@media (max-width: 768px) {
		/* Mobile styles */
		flex-wrap: wrap;
	}
	@media (max-width: 1024px) {
		display: flex;
		width: 100%;
		padding: 0;
	}
`;
