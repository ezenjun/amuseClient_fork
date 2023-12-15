import React from "react";
import styled from "@emotion/styled";
import { Common } from "../../styles";

export const WebButton = styled.button<{
	width?: number;
	fontSize: number;
	color: string;
	verticalPadding: number;
	isActive?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>`
	display: flex;
	flex-grow: 0;
	height: min-content;
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
			case "gray2":
				return Common.colors.gray2;
			case "buttonLG":
				return Common.colors.buttonLG;
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
				return Common.colors.white;
			case "buttonLG":
				return Common.colors.darkGray;
			default:
				return Common.colors.black;
		}
	}};
	font-size: ${(props) => props.fontSize * 0.0625}rem;
	font-weight: bold;
	white-space: nowrap;
	box-sizing: border-box;

	cursor: pointer;
`;
