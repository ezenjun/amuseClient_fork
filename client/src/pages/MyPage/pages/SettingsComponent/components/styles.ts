import styled from "@emotion/styled";
import { Common } from "../../../../../styles";

export const SettingContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Left = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	gap: 1.5rem;
`;

export const Row = styled.div<{ marginTop?: number }>`
	display: flex;
	gap: 2.5rem;
	align-items: center;
	${({ marginTop }) => marginTop && `margin-top: ${marginTop * 0.0625}rem`}
`;

export const RowKey = styled.div`
	min-width: 3.75rem;
`;

export const EditInputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 21.625rem;
	height: 2.125rem;
	padding: 0 1.125rem;
	border-radius: 0.5rem;
	border: 1px solid #cccccc;
	background-color: white;
	:focus-within {
		border: 1px solid black;
	}
`;

export const EditInput = styled.input`
	width: 100%;
	padding: 0;
	outline: none;
	background: none;
	fill: none;
	font-size: 1.125rem;
	color: ${Common.colors.black};
`;

export const DeleteBtnBox = styled.div`
	display: flex;
	justify-content: space-between;
`;