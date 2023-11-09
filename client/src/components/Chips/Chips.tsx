import React from "react";
import { ChipProps, IProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Common, Pretendard } from "../../styles";

const Chips = ({ color, children }: ChipProps) => {
	return <ChipContainer color={color}>{children}</ChipContainer>;
};

export default Chips;

export const ChipContainer = styled.div<{ color: string }>`
	display: flex;
	width: min-content;
	padding: 0.1875rem 0.625rem;
	background-color: rgba(230, 0, 61, 15%);
	border-radius: 0.5rem;
	${Pretendard({
		size: 14,
		weight: Common.bold.regular,
		color: Common.colors.appColor,
	})};
	background-color: ${(props) => {
		switch (props.color) {
			case "white":
				return Common.colors.white;
			case "red":
				return "#FFE4E8";
			case "gray":
				return "#DFDFDF";
			default:
				return "transparent";
		}
	}};
	font-family: "Pretendard";
	color: ${(props) => {
		switch (props.color) {
			case "red":
				return Common.colors.appColor;
			case "gray":
				return "#343A40";
			default:
				return Common.colors.black;
		}
	}};
	white-space: nowrap;
`;
