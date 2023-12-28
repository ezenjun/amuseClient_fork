import React, { useEffect, useState } from "react";
import {
	EachPaymentContainer,
	EachPaymentMobileContainer,
	EachPaymentTabletContainer,
	InfoTextContainer,
	ItemInfoContainer,
	ItemInfoMobileContainer,
	ItemInfoTabletContainer,
	ItemNameContainer,
	PaymentButtonContainer,
} from "./styles";
import SquareImage from "../../../../../components/Images/SquareImage";
import Chips from "../../../../../components/Chips/Chips";
import {
	Bold16DarkGray,
	Bold20Black,
	Bold20DarkGray,
	Bold24DarkGray,
	Regular14Gray,
} from "../../../../../components/Text/Text";
import { WebButton } from "../../../../../components/Button/WebButton";
import { PaymentHistoryData } from "../../../../../Types/DataTypes";
import { useNavigate } from "react-router";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../utils/DateFunctions";
import { ReactComponent as ArrowRightMobile } from "../../../../../assets/Icons/Arrow/arrow_right_mobile.svg";
import EachPaymentWeb from "./EachPaymentInSize/EachPaymentWeb";
import EachPaymentTablet from "./EachPaymentInSize/EachPaymentTablet";
import EachPaymentMobile from "./EachPaymentInSize/EachPaymentMobile";

type Props = {
	data: PaymentHistoryData;
	showPrice?: boolean;
};

const EachPayment = ({ data, showPrice }: Props) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
