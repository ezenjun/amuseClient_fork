import React, { useMemo } from "react";
import { InputFieldProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";
import { Common, Pretendard } from "../../styles";

const InputField = ({
	type,
	value,
	setValue,
	isCorrect,
	placeholder,
	errorMsg,
}: InputFieldProps) => {
	const handleInputChange = useMemo(
		() => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
		},
		[setValue, value]
	);
	return (
		<InputContainer>
			<InputFieldWrapper isCorrect={isCorrect}>
				<StyledInputField
					type={type}
					placeholder={placeholder}
					value={value ? value : undefined}
					autoFocus={false}
					onChange={handleInputChange}
					onKeyDown={(e) =>
						["e", "E", "+", "-"].includes(e.key) &&
						e.preventDefault()
					}
				/>
			</InputFieldWrapper>
			{!isCorrect && <ErrorText>{errorMsg}</ErrorText>}
		</InputContainer>
	);
};

export default InputField;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const InputFieldWrapper = styled.div<{ isCorrect: boolean }>`
	display: flex;
	width: 100%;
	max-width: 25rem;
	align-items: center;
	border: 1px solid
		${({ isCorrect }) =>
			isCorrect ? Common.colors.gray2 : Common.colors.appColor};
	border-radius: 0.5rem;
	padding: 1.25rem 1.125rem;
	background-color: ${Common.colors.white};
	:focus {
		border: 1px solid ${Common.colors.black};
	}
	&:focus-within {
		border: 1px solid ${Common.colors.black};
	}
`;

export const StyledInputField = styled.input`
	width: 100%;
	padding: 0;
	margin: 0;
	outline: none;
	border: none;
	${Pretendard({
		size: 16,
		weight: Common.bold.regular,
		color: Common.colors.darkGray,
	})}
`;

export const ErrorText = styled.span`
	margin-top: 0.75rem;
	${Pretendard({
		size: 12,
		weight: Common.bold.regular,
		color: Common.colors.appColor,
	})}
`;
