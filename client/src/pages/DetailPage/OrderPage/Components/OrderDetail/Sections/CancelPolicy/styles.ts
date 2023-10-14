import styled from "@emotion/styled";
import { Common, Pretendard } from "../../../../../../../styles";

export const CancelPolicyContainer = styled.div`
	margin-top: 1.375rem;
	line-height: 153%;
	${Pretendard({
		size: 16,
		weight: Common.bold.regular,
		color: Common.colors.darkGray,
	})}

	.title {
		${Pretendard({
			size: 16,
			weight: Common.bold.bold,
			color: Common.colors.darkGray,
		})}
	}
`;

export const TitleRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;
