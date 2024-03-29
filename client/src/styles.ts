import { css } from "@emotion/react";
import styled from "styled-components";

interface IPretendard {
	size: number;
	weight: number;
	color: string;
	lineHeight?: number;
	letterSpacing?: 0 | 4 | 6;
}

export const reset = css`
	html {
		margin: 0;
		padding: 0;
		/* width: 100vw;
		height: 100vh; */
		@media (max-width: 768px) {
			/* Mobile styles */
			font-size: 13px;
		}

		@media (min-width: 769px) and (max-width: 1023px) {
			/* Tablet styles */
			font-size: 14.5px; /* Adjust as needed */
		}

		@media (min-width: 1024px) and (max-width: 1140px) {
			/* Tablet styles */
			font-size: 15px; /* Adjust as needed */
		}

		@media (min-width: 1024px) and (max-width: 1140px) {
			/* Tablet styles */
			font-size: 15px; /* Adjust as needed */
		}

		@media (min-width: 1141px) {
			/* Desktop styles */
			font-size: 16px; /* Adjust as needed */
		}
	}
	body {
		margin: 0;
		padding: 0;
		font-family: Pretendard, -apple-system, sans-serif, Roboto;

		-ms-user-select: none;
		-moz-user-select: -moz-none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		user-select: none;

		-webkit-tap-highlight-color: transparent;
		// 모바일 기기에서 터치 이벤트 발생 시, 해당 요소 주위에 나타나는 하이라이트 색상을 투명색으로 지정

		* {
			box-sizing: border-box;
		}

		::-webkit-scrollbar {
			display: none;
		}
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	button {
		font-size: 0;
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;
	}
	input {
		border: none;
		outline: none;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
	}
`;

export const Pretendard = (props: IPretendard) => css`
	// font size는 figma 기준 -5 해서 적용
	font-family: "Pretendard";
	font-size: ${props.size * 0.0625}rem;
	font-weight: ${props.weight};
	color: ${props.color};
`;

export const Common = {
	colors: {
		black: "#000000",
		white: "#FFFFFF",
		appColor: "#E6003D",
		gray: "#909090",
		gray2: "#CCCCCC",
		lightGray: "#F8F9FA",
		darkGray: "#464646",
		bgGray: "#F8F9FA",
		buttonLG: "#DFDFDF",
	},
	bold: {
		thin: 400,
		regular: 500,
		semiBold: 600,
		bold: 700,
	},
} as const;

export const Render = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 25px;
	gap: 50px;
`;
