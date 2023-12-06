import styled from "styled-components";
import { Common } from "../../../../styles";

export const Divider = styled.div`
	flex-shrink: 0;
	width: 100%;
	height: 3px;
	background-color: #eceef1;
`;

export const ReviewContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 0;
	width: 100%;
	gap: 0.75rem;
	::-webkit-scrollbar {
		display: none;
	}
`;
export const TextAreaContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	width: 100%;
	height: 10.4375rem;
	border: 1px solid ${Common.colors.gray2};
	border-radius: 0.5625rem;
	padding: 0.75rem 0.875rem;
	overflow: hidden;
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 100%;
	outline: 0;
	border: 0;
	color: var(--, #909090);
	font-family: "Pretendard";
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 160%; /* 22.4px */
	letter-spacing: -0.28px;
	resize: none;
`;

export const AddButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid ${Common.colors.appColor};
	border-radius: 0.5rem;
	background-color: white;
	padding: 0.875rem;
	display: "block";
	cursor: pointer;
`;

export const ImgPreviewList = styled.div`
	display: flex;
	flex-direction: row;
	flex-grow: none;
	position: relative;
	width: 22.8125rem;
	box-sizing: border-box;
	align-items: center;
	gap: 0.5rem;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
