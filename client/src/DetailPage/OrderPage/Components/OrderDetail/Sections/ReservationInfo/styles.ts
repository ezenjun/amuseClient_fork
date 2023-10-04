import styled from "@emotion/styled";

export const ReservationGrid = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 1fr 1fr;
	gap: 1.875rem 1.25rem;
	justify-content: flex-start;
	align-items: flex-end;

	@media (max-width: 768px) {
		/* Mobile styles */
		grid-template-columns: 1fr;
	}
`;

export const EachReservationField = styled.div<{ marginTop?: number }>`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 100%;
	gap: 0.75rem;
	margin-top: ${(props) => props.marginTop && props.marginTop * 0.0625}rem;
`;
