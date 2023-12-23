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

export const SideBarMenuMobileContainer = styled.div`
	display: grid;
	flex-direction: row;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 0.5rem;
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
export const EachMenuMobile = styled.div<{ active?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.25rem;
	padding: 0.5625rem 0;
	border-radius: 0.5rem;
	border: ${(props) =>
		props.active
			? `1px solid ${Common.colors.appColor}`
			: `1px solid ${Common.colors.gray}`};
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

export const MenuTextMobile = styled.span<{ active?: boolean }>`
	font-family: "Pretendard";
	color: ${(props) =>
		props.active ? Common.colors.appColor : Common.colors.gray};
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
