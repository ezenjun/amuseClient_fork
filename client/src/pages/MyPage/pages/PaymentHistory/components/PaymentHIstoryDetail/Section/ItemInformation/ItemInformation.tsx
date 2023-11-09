import React from "react";
import { ReservationInfoContainer } from "../../styles";
import { Bold32Black } from "../../../../../../../../components/Text/Text";

type Props = {};

const ItemInformation = (props: Props) => {
	return (
		<ReservationInfoContainer>
			<Bold32Black>상품 정보</Bold32Black>
		</ReservationInfoContainer>
	);
};

export default ItemInformation;
