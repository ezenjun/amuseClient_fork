import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "./OrderDetail.module.scss";

import { ProductInfo } from "./Sections/ProductInfo";
import { Point } from "./Sections/Point/Point";
import { ReservationInfo } from "./Sections/ReservationInfo";
import { AdditionalInfo } from "./Sections/AdditionalInfo";
import { PaymentMethod } from "./Sections/PaymentMethod";
import { PurchaseInfoItems } from "../PurchaseInfoItems";
import { OrderDetailContainer } from "./styles";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	PaymentDataState,
	currentUserPointState,
} from "../../../../Recoil/OrderAtomState";

type Props = {
	isLoading: boolean;
};

export const OrderDetail = ({ isLoading }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
	const setPaymentData = useSetRecoilState(PaymentDataState);
	const [currentUserPoint, setCurrentUserPoint] = useRecoilState(
		currentUserPointState
	);
	

	return (
		<OrderDetailContainer ref={ref}>
			<ProductInfo />
			<Point myPoint={currentUserPoint} />
			<ReservationInfo />
			<AdditionalInfo />
			<PaymentMethod />
		</OrderDetailContainer>
	);
};
