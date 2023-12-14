import styled from "@emotion/styled";

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
