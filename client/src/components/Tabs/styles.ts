import styled from "@emotion/styled";
import { Common } from "../../styles";

export const TabsContainer = styled.div<{ gap: number; wrap?: boolean }>`
	display: flex;
	flex-wrap: ${(props) => (props.wrap ? "wrap" : '"no-wrap"')};
	flex-direction: row;
	align-items: center;
	width: 100%;
	gap: ${(props) => props.gap * 0.0625}rem;
`;

export const TabContainer = styled.div<{
	width?: number | string;
	verticalPadding?: number;
	horizontalPadding?: number;
	isActive: boolean;
}>`
	display: flex;
	/* flex-shrink: 0; */
	white-space: nowrap;
	justify-content: center;
	box-sizing: border-box;
	width: ${(props) =>
		props.width
			? typeof props.width === "string" && props.width.includes("%")
				? props.width
				: `${parseFloat(props.width as string) * 0.0625}rem`
			: "auto"};
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
