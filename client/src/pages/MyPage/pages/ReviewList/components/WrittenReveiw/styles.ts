import styled from "@emotion/styled";
import { Common } from "../../../../../../styles";

export const WrittenReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	background-color: ${Common.colors.bgGray};
	padding: 1.375rem 1.5rem 1.25rem 1.5rem;
	border-radius: 0.5rem;
	gap: 1.5rem;
	cursor: pointer;
`;

export const ItemInfo = styled.div`
	display: flex;
	flex-direction: row;
	/* align-items: center; */
	width: 100%;
	gap: 0.875rem;
`;

export const ItemInfoLeft = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	gap: 0.875rem;
`;

export const ItemInfoRight = styled.div`
	display: flex;
`;

export const StarContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.875rem;
`;
export const ScoreContainer = styled.div`
	display: flex;
	align-items: baseline;
	gap: 0.25rem;
`;

export const ReviewContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;
