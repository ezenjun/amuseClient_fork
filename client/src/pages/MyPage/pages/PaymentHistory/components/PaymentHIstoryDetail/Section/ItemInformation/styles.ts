import styled from "styled-components";

export const Layout = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Right = styled.div`
	display: flex;
	text-align: end;
	flex-direction: column;
	gap: 0.5rem;
`;
