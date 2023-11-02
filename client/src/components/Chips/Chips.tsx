import React from "react";
import { IProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Common, Pretendard } from "../../styles";

const Chips = ({ children }: IProps) => {
	return <ChipContainer>{children}</ChipContainer>;
};

export default Chips;

export const ChipContainer = styled.div`
	display: flex;
	padding: 0.1875rem 0.625rem;
	background-color: rgba(230, 0, 61, 15%);
	border-radius: 0.5rem;
	${Pretendard({
		size: 14,
		weight: Common.bold.regular,
		color: Common.colors.appColor,
	})};
	white-space: nowrap;
`;
