import styled from "@emotion/styled";
import { Common } from "../../../../styles";

export const SideBarMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.875rem;

	@media (max-width: 768px) {
		/* Mobile styles */
		display: none;
	}
	@media (min-width: 769px) and (max-width: 1023px) {
		/* Tablet styles */
		min-width: 11.625rem;
	}

	@media (min-width: 1024px) {
		/* Web styles */
		min-width: 15.625rem;
	}
`;

export const SideBarBox = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid ${Common.colors.gray2};
	border-radius: 0.5rem;
	overflow: hidden;
`;

export const EachMenu = styled.div<{ active?: boolean }>`
	display: flex;
	align-items: center;
	gap: 1.25rem;
	height: 3.75rem;
	padding: 1.125rem 1.25rem;
	background-color: ${(props) => props.active && "#F8F9FA"};
	cursor: pointer;
`;

export const MenuText = styled.span<{ active?: boolean }>`
	font-family: "Pretendard";
	color: ${(props) =>
		props.active ? Common.colors.black : Common.colors.gray};
	@media (min-width: 769px) and (max-width: 1023px) {
		/* Tablet styles */
		font-size: 1rem;
		white-space: nowrap;
	}

	@media (min-width: 1024px) {
		/* Web styles */
		font-size: 1.125rem;
		white-space: nowrap;
	}
`;
