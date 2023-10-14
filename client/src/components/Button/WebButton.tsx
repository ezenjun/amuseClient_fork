import React from "react";
import { ButtonProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Common } from "../../styles";

// const WebButton = ({
// 	children,
// 	width,
// 	color,
// 	fontSize,
// 	verticalPadding,
// 	isActive,
// 	onClick,
// }: ButtonProps) => {
// 	return (
// 		<ButtonContainer
// 			width={width}
// 			fontSize={fontSize}
// 			color={color}
// 			verticalPadding={verticalPadding}
// 			isActive={isActive}
// 			onClick={onClick}
// 		>
// 			{children}
// 		</ButtonContainer>
// 	);
// };

// export default WebButton;

export const WebButton = styled.button<{
	width?: number;
	fontSize: number;
	color: string;
	verticalPadding: number;
	isActive?: boolean;
	onClick?: () => void;
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => (props.width ? `${props.width * 0.0625}rem` : "100%")};
	border-radius: 0.5rem;
	padding: ${(props) => props.verticalPadding * 0.0625}rem;
	border: 1px solid
		${(props) =>
			props.color === "white" ? Common.colors.gray : "transparent"};
	background-color: ${(props) => {
		switch (props.color) {
			case "white":
				return Common.colors.white;
			case "red":
				return Common.colors.appColor;
			case "lightGray":
				return Common.colors.lightGray;
			case "gray":
				return Common.colors.gray;
			default:
				return "transparent";
		}
	}};
	font-family: "Pretendard";
	color: ${(props) => {
		switch (props.color) {
			case "white":
				return Common.colors.gray;
			case "red":
				return Common.colors.white;
			case "lightGray":
				return props.isActive
					? Common.colors.black
					: Common.colors.gray;
			case "gray":
				return Common.colors.gray;
			default:
				return Common.colors.black;
		}
	}};
	font-size: ${(props) => props.fontSize * 0.0625}rem;
	font-weight: bold;
	white-space: nowrap;
	cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
`;
