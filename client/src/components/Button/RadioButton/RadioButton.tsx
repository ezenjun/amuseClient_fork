import React from "react";
import { RadioButtonProps } from "../../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";

import { ReactComponent as RadioOn } from "../../../assets/Icons/Radio/radio_on.svg";
import { ReactComponent as RadioOff } from "../../../assets/Icons/Radio/radio_off.svg";
import { Pretendard, Common } from "../../../styles";
import Chips from "../../Chips/Chips";

const RadioButton = ({ name, checked, label, onClick }: RadioButtonProps) => {
	return (
		<Container>
			{checked ? (
				<RadioOn onClick={onClick} />
			) : (
				<RadioOff onClick={onClick} />
			)}
			<RadioInput
				type="radio"
				name={name}
				checked={checked}
				onChange={onClick}
			/>
			<Label onClick={onClick}>{label}</Label>
			{label === "현금 결제" && <Chips>결제 시 포인트 적립</Chips>}
		</Container>
	);
};

export default RadioButton;

export const Container = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	gap: 0.75rem;
`;

export const RadioInput = styled.input`
	display: none;
`;

export const Label = styled.span`
	${Pretendard({
		size: 16,
		weight: Common.bold.regular,
		color: Common.colors.darkGray,
	})}
`;
