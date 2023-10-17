import React from "react";
import { GrayBoxProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Common } from "../../styles";

const GrayBox = ({
	verticalPadding,
	horizontalPadding,
	borderRadius,
	gap,
	children,
}: GrayBoxProps) => {
	return (
		<GrayBoxContainer
			verticalPadding={verticalPadding}
			horizontalPadding={horizontalPadding}
			borderRadius={borderRadius}
			gap={gap}
		>
			{children}
		</GrayBoxContainer>
	);
};

export default GrayBox;

export const GrayBoxContainer = styled.div<{
	verticalPadding: number;
	horizontalPadding: number;
	borderRadius?: number;
	gap?: number;
}>`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: ${({ gap }) => (gap ? `${gap * 0.0625}rem` : "0")};
	border-radius: ${({ borderRadius }) =>
		borderRadius ? `${borderRadius * 0.0625}rem` : "0.5rem"};
	padding: ${({ verticalPadding, horizontalPadding }) =>
		`${verticalPadding * 0.0625}rem ${horizontalPadding * 0.0625}rem`};
	background-color: ${Common.colors.bgGray};
	box-sizing: border-box;
`;
