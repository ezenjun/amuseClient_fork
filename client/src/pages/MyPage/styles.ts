import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	box-sizing: border-box;
	gap: 32px;
	padding: 4.6875rem 9.375rem 3.125rem 9.375rem;
	::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 768px) {
		padding: 2.5rem 1rem;
		flex-direction: column;
	}
	@media (min-width: 769px) and (max-width: 1023px) {
		gap: 1rem;
		padding: 2.5rem 1.5rem 2.5rem 1.5rem;
	}
`;

export const OutletConatiner = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	@media (min-width: 769px) and (max-width: 1023px) {
		/* Tablet styles */
		min-width: 36.875rem;
	}
`;
