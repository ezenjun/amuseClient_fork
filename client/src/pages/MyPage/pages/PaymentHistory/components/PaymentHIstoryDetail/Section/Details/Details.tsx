import React from "react";
import { ReservationInfoContainer } from "../../styles";
import { Bold32Black } from "../../../../../../../../components/Text/Text";

type Props = {};

const Details = (props: Props) => {
	return (
		<ReservationInfoContainer>
			<Bold32Black>세부 사항</Bold32Black>
		</ReservationInfoContainer>
	);
};

export default Details;
