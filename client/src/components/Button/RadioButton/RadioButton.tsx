import React from "react";
import { RadioButtonProps } from "../../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Pretendard, Common } from "../../../styles";
import Chips from "../../Chips/Chips";

const RadioButton = ({ name, checked, label, onClick }: RadioButtonProps) => {
	return (
		<Container checked={checked}>
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

export const Container = styled.div<{ checked: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	cursor: pointer;
	padding: 1.25rem 1.125rem;
	border-radius: 0.5rem;
	border: ${(props) =>
		props.checked
			? `1.5px solid ${Common.colors.appColor}`
			: `1.5px solid ${Common.colors.gray2}`};

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
