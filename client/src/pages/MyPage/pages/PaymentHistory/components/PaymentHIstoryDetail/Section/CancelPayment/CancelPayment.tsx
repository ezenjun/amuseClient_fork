import React from "react";
import { ReservationInfoContainer } from "../../styles";
import { Bold32Black } from "../../../../../../../../components/Text/Text";

type Props = {};

const CancelPayment = (props: Props) => {
	return (
		<ReservationInfoContainer>
			<Bold32Black>결제 취소</Bold32Black>
		</ReservationInfoContainer>
	);
};

export default CancelPayment;
