import styled from "@emotion/styled";

export const ReservationGrid = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 1fr 1fr;
	gap: 1.25rem;
	justify-content: flex-start;
	align-items: flex-end;
`;

export const EachReservationField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 35%px;
	gap: 0.75rem;
`;
