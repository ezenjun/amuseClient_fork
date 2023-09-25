import React from "react";
import { ButtonProps } from "../../Interfaces/PropsInterfaces";
import styled from "@emotion/styled";

const Button = ({ children, isActive }: ButtonProps) => {
	return <div>Button</div>;
};

export default Button;

export const ButtonContainer = styled.div`
	display: flex;
`;
