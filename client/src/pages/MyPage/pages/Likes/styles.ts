import styled from "@emotion/styled";
import { Common } from "../../../../styles";

export const GridContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 1.375rem;
	gap: 1.25rem;
	overflow-y: scorll;
`;

export const GridItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 16.875rem;
	height: 17.5rem;
	overflow: hidden;
	border: 1px solid #efefef;
	border-radius: 0.5rem;
	background-color: grey;
`;

export const ItemTop = styled.div`
	flex-shrink: 0;
	width: 100%;
	height: 10.1875rem;
`;
export const ItemBottom = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 1.3125rem 0.875rem;
	background-color: white;
`;
