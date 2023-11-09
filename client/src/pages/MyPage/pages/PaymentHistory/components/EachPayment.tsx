import React, { useEffect, useState } from "react";
import {
	EachPaymentContainer,
	EachPaymentTabletContainer,
	InfoTextContainer,
	ItemInfoContainer,
	ItemInfoTabletContainer,
	PaymentButtonContainer,
} from "./styles";
import SquareImage from "../../../../../components/Images/SquareImage";
import Chips from "../../../../../components/Chips/Chips";
import {
	Bold16DarkGray,
	Bold20Black,
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

type Props = {
	data: PaymentHistoryData;
};

const EachPayment = ({ data }: Props) => {
	const navigate = useNavigate();
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
		return (
			<EachPaymentContainer
				onClick={() => navigate(`./${data.mainPaymentId}`)}
			>
				<ItemInfoContainer>
					<SquareImage
						size={60}
						imgUrl={data.itemImage}
						borderRadius={8}
					></SquareImage>
					<InfoTextContainer>
						<Bold20Black>{data.itemName}</Bold20Black>
						<Regular14Gray>
							{formatDate(new Date(data.travelStartDate))} ~{" "}
							{formatDate(new Date(data.travelEndDate))}{" "}
							{calculateNightStay(
								data.travelStartDate,
								data.travelEndDate
							)}
						</Regular14Gray>
					</InfoTextContainer>
				</ItemInfoContainer>
				{data.payStatus === "SUCCESS" && (
					<Chips color="red">결제 완료</Chips>
				)}
				{data.payStatus === "PENDING" && (
					<Chips color="gray">결제 취소</Chips>
				)}
				<Bold24DarkGray style={{ whiteSpace: "nowrap" }}>
					{data.itemPayPrice.toLocaleString()} 원
				</Bold24DarkGray>
				{data.payStatus === "SUCCESS" && (
					<WebButton
						color="gray2"
						verticalPadding={12}
						fontSize={16}
						width={140}
					>
						결제 취소
					</WebButton>
				)}
				{data.payStatus === "PENDING" && (
					<WebButton
						color="gray2"
						verticalPadding={12}
						fontSize={16}
						width={140}
					>
						다시 예약
					</WebButton>
				)}
			</EachPaymentContainer>
		);
	} else if (screenWidth <= 1024 && screenWidth > 768) {
		return (
			<EachPaymentTabletContainer
				onClick={() => navigate(`./${data.mainPaymentId}`)}
			>
				{data.payStatus === "SUCCESS" && (
					<Chips color="red">결제 완료</Chips>
				)}
				{data.payStatus === "PENDING" && (
					<Chips color="gray">결제 취소</Chips>
				)}
				<ItemInfoTabletContainer>
					<SquareImage
						size={60}
						imgUrl={data.itemImage}
						borderRadius={8}
					></SquareImage>
					<InfoTextContainer>
						<Bold20Black>{data.itemName}</Bold20Black>
						<Regular14Gray>
							{formatDate(new Date(data.travelStartDate))} ~{" "}
							{formatDate(new Date(data.travelEndDate))}{" "}
							{calculateNightStay(
								data.travelStartDate,
								data.travelEndDate
							)}
						</Regular14Gray>
						<Bold16DarkGray style={{ whiteSpace: "nowrap" }}>
							{data.itemPayPrice.toLocaleString()} 원
						</Bold16DarkGray>
					</InfoTextContainer>
					<PaymentButtonContainer>
						{data.payStatus === "SUCCESS" && (
							<WebButton
								color="gray2"
								verticalPadding={12}
								fontSize={16}
								width={140}
							>
								결제 취소
							</WebButton>
						)}
						{data.payStatus === "PENDING" && (
							<WebButton
								color="gray2"
								verticalPadding={12}
								fontSize={16}
								width={140}
							>
								다시 예약
							</WebButton>
						)}
					</PaymentButtonContainer>
				</ItemInfoTabletContainer>
			</EachPaymentTabletContainer>
		);
	} else {
		return (
			<EachPaymentContainer
				onClick={() => navigate(`./${data.mainPaymentId}`)}
			>
				<ItemInfoContainer>
					<SquareImage
						size={60}
						imgUrl={data.itemImage}
						borderRadius={8}
					></SquareImage>
					<InfoTextContainer>
						<Bold20Black>{data.itemName}</Bold20Black>
						<Regular14Gray style={{ whiteSpace: "normal" }}>
							{formatDate(new Date(data.travelStartDate))} ~{" "}
							{formatDate(new Date(data.travelEndDate))}{" "}
							{calculateNightStay(
								data.travelStartDate,
								data.travelEndDate
							)}
						</Regular14Gray>
					</InfoTextContainer>
				</ItemInfoContainer>
				{data.payStatus === "SUCCESS" && (
					<Chips color="red">결제 완료</Chips>
				)}
				{data.payStatus === "PENDING" && (
					<Chips color="gray">결제 취소</Chips>
				)}
				<Bold24DarkGray style={{ whiteSpace: "nowrap" }}>
					{data.itemPayPrice.toLocaleString()} 원
				</Bold24DarkGray>
				{data.payStatus === "SUCCESS" && (
					<WebButton
						color="gray2"
						verticalPadding={12}
						fontSize={16}
						width={140}
					>
						결제 취소
					</WebButton>
				)}
				{data.payStatus === "PENDING" && (
					<WebButton
						color="gray2"
						verticalPadding={12}
						fontSize={16}
						width={140}
					>
						다시 예약
					</WebButton>
				)}
			</EachPaymentContainer>
		);
	}
};

export default EachPayment;
