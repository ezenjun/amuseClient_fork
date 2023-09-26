import styled from "@emotion/styled";
import React from "react";
import { HorizontalLineProps } from "../../Interfaces/PropsInterfaces";

const HorizontalLine = ({ marginTop, marginBottom }: HorizontalLineProps) => {
	return (
		<HorizontalLineContainer
			marginTop={marginTop}
			marginBottom={marginBottom}
		/>
	);
};

export default HorizontalLine;

export const HorizontalLineContainer = styled.div<{
	marginTop: number;
	marginBottom: number;
}>`
	display: flex;
	height: 1px;
	border-top: 1px solid #f0f3f5;
	width: 100%;
	margin-top: ${(props) => props.marginTop * 0.0625}rem;
	margin-bottom: ${(props) => props.marginBottom * 0.0625}rem;
`;
