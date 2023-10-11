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
	PaymentDataState,
	currentUserPointState,
} from "../../../../Recoil/OrderAtomState";
import GuestInfo from "./Sections/GuestInfo/GuestInfo";

type Props = {
	isLoading: boolean;
};

export const OrderDetail = ({ isLoading }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const paymentData = useRecoilValue(PaymentDataState);
	const currentUserPoint = useRecoilValue(currentUserPointState);

	return (
		<OrderDetailContainer ref={ref}>
			<ProductInfo />
			<ReservationInfo />
			{paymentData.itemType === "Hotel" && <GuestInfo />}
			<AdditionalInfo />
			<Point myPoint={currentUserPoint} />
			<PaymentMethod />
			<Terms />
			<CancelPolicy />
		</OrderDetailContainer>
	);
};
