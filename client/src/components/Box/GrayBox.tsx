import React from "react";
import { GrayBoxProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Common } from "../../styles";

const GrayBox = ({
	verticalPadding,
	horizontalPadding,
	borderRadius,
	children,
}: GrayBoxProps) => {
	return (
		<GrayBoxContainer
			verticalPadding={verticalPadding}
			horizontalPadding={horizontalPadding}
			borderRadius={borderRadius}
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
}>`
	display: flex;
	border-radius: ${({ borderRadius }) =>
		borderRadius ? `${borderRadius * 0.0625}rem` : "0.5rem"};
	padding: ${(props) =>
		`${props.verticalPadding * 0.0625}rem ${
			props.horizontalPadding * 0.0625
		}rem`};
	background-color: ${Common.colors.lightGray};
`;
