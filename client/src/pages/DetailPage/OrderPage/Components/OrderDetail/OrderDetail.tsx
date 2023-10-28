import React, { useRef } from "react";

import { ProductInfo } from "./Sections/ProductInfo";
import { Point } from "./Sections/Point/Point";
import { ReservationInfo } from "./Sections/ReservationInfo";
import { AdditionalInfo } from "./Sections/AdditionalInfo";
import { PaymentMethod } from "./Sections/PaymentMethod";
import { Terms } from "./Sections/Terms";
import { CancelPolicy } from "./Sections/CancelPolicy/CancelPolicy";
import { OrderDetailContainer } from "./styles";
import { useRecoilValue } from "recoil";
import {
	currentUserPointState,
	selectedItemState,
} from "../../../../../Recoil/OrderAtomState";
import GuestInfo from "./Sections/GuestInfo/GuestInfo";

type Props = {
	isLoading: boolean;
};

export const OrderDetail = ({ isLoading }: Props) => {
	const currentUserPoint = useRecoilValue(currentUserPointState);
	const selectedItem = useRecoilValue(selectedItemState);

	return (
		<OrderDetailContainer>
			<ProductInfo />
			<ReservationInfo />
			{(selectedItem.itemType === "DomesticHotel" ||
				selectedItem.itemType === "InternationalHotel") && (
				<GuestInfo />
			)}
			<AdditionalInfo />
			<Point myPoint={currentUserPoint} />
			<PaymentMethod />
		</OrderDetailContainer>
	);
};
