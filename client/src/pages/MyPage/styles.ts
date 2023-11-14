import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	box-sizing: border-box;
	gap: 32px;
	padding: 4.6875rem 10% 3.125rem 10%;
	::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 768px) {
		padding: 2.5rem 1rem;
	}
	@media (min-width: 769px) and (max-width: 1023px) {
		gap: 1rem;
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
