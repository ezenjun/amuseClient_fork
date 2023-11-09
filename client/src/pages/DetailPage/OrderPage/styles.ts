import styled from "@emotion/styled";
import { Common, Pretendard } from "../../../styles";

export const OrderPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	gap: 2rem;
	padding: 4.6875rem 10% 7.5rem 10%;
	::-webkit-scrollbar {
		display: none;
	}
	@media (max-width: 768px) {
		padding: 2.5rem 1rem;
	}
`;

export const OrderInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	gap: 0.9375rem;
	box-sizing: border-box;
`;

export const PageName = styled.span`
	${Pretendard({
		size: 35,
		weight: Common.bold.bold,
		color: Common.colors.black,
	})}
`;

export const SubHeader = styled.span`
	${Pretendard({
		size: 27,
		weight: Common.bold.bold,
		color: Common.colors.black,
	})}
`;
