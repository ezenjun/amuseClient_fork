import React, { useEffect, useState } from "react";

import { PaymentHistoryData } from "../../../../../Types/DataTypes";
import EachPaymentWeb from "./EachPaymentInSize/EachPaymentWeb";
import EachPaymentTablet from "./EachPaymentInSize/EachPaymentTablet";
import EachPaymentMobile from "./EachPaymentInSize/EachPaymentMobile";
import { useRecoilState } from "recoil";

type Props = {
	data: PaymentHistoryData;
	showPrice?: boolean;
};

const EachPayment = ({ data, showPrice }: Props) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	console.log("EachPayment data", data);
	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [window.innerWidth, screenWidth]);

	if (screenWidth > 1024) {
		return <EachPaymentWeb data={data} showPrice={showPrice} />;
	} else if (screenWidth <= 1024 && screenWidth > 768) {
		return <EachPaymentTablet data={data} showPrice={showPrice} />;
	} else {
		return <EachPaymentMobile data={data} showPrice={showPrice} />;
	}
};

export default EachPayment;
