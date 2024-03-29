import styled from "@emotion/styled";
import { Common } from "../../styles";

export const ModalBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	overflow: hidden;
`;

export const ModalContainer = styled.div<{ width?: string; height?: string }>`
	display: flex;
	flex-direction: column;
	border-radius: 0.5rem;
	min-width: ${(props) => (props.width ? `${props.width} ` : "60%")};
	min-height: ${(props) => props.height && `${props.height} `};
	background-color: white;
	padding: 2.5rem 2.6875rem;
	gap: 1.875rem;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const ScrollContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	border: 1px solid ${Common.colors.bgGray};
	padding: 0.625rem;
	white-space: pre-wrap;

	::-webkit-scrollbar {
		width: 3px;
	}

	/* Set the background color of the scrollbar track */
	::-webkit-scrollbar-track {
		background-color: transparent; /* Set to transparent */
	}

	/* Set the color of the scrollbar handle */
	::-webkit-scrollbar-thumb {
		border-radius: 8px;
		background-color: ${Common.colors.gray}; /* Set to grey */
	}
`;

export const PersonalInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	gap: 1rem;
`;

export const CancelModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	gap: 1rem;
`;

export const InfoRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.5625rem;
`;
export const InfoRowBetween = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex-direction: row;
	gap: 1.5625rem;
`;

export const RowKey = styled.div`
	display: flex;
	min-width: 5.625rem;
`;

export const ConfirmButtonRow = styled.div`
	display: flex;
	margin-top: 3.75rem;
	flex-direction: row;
	justify-content: flex-end;
	gap: 1.25rem;
`;
