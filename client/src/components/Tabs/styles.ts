import styled from "@emotion/styled";
import { Common } from "../../styles";

export const TabsContainer = styled.div<{ gap: number }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${(props) => props.gap * 0.0625}rem;
`;

export const TabContainer = styled.div<{
	width?: number;
	verticalPadding?: number;
	horizontalPadding?: number;
	isActive: boolean;
}>`
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	box-sizing: border-box-;
	min-width: ${(props) =>
		props.width ? `${props.width}*0.625rem` : `7.5rem`};
	padding: 1rem;
	align-items: center;
	border: ${(props) =>
		props.isActive
			? `1px solid ${Common.colors.appColor}`
			: `1px solid ${Common.colors.gray}`};
	border-radius: 0.5rem;
	font-family: "Pretendard";
	font-weight: 500;
	font-size: 1rem;
	color: ${(props) =>
		props.isActive ? Common.colors.appColor : Common.colors.gray};
	font-family: "Pretendard";
	cursor: pointer;
`;
