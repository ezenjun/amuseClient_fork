import React, { useEffect, useState } from "react";
import {
	InfoRow,
	InfoRowBetween,
	PersonalInfoContainer,
	RowKey,
	ScrollContainer,
} from "../styles";
import {
	Bold16DarkGray,
	Bold16Gray,
	Bold20DarkGray,
	Bold20Gray,
	Bold24AppColor,
	Regular16DarkGray,
	Regular16Gray,
	Regular20DarkGray,
	Regular20Gray,
} from "../../Text/Text";
import { useCookies } from "react-cookie";
import axios from "axios";
import Chips from "../../Chips/Chips";

interface PaymentInfoProps {
	mainPaymentId: number;
}
interface PaymentInfo {
	payStatus: string;
	reservationDateTime: string;
	itemCost: number;
	payType: string;
	pointUse: number;
	itemPayPrice: number;
}

const PaymentInfoModal = ({ mainPaymentId }: PaymentInfoProps) => {
	const [cookies] = useCookies();
	const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
	const token = cookies["__jwtkid__"];
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const formatReservationDateTime = (dateTime: string): string => {
		const date = new Date(dateTime);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const period = hours >= 12 ? "PM" : "AM";
		const formattedHours = hours % 12 || 12;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${year}년 ${month}월 ${day}일 ${formattedHours}:${formattedMinutes} ${period}`;
	};
	const getPaymentInfo = async () => {
		await axios
			.get(
				`${process.env.REACT_APP_AMUSE_API}/api/payment/info/${mainPaymentId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			)
			.then((response) => {
				setPaymentInfo(response.data.data);
			})
			.catch((error) => {
				console.log(error.response.data.code);
			});
	};
	useEffect(() => {
		getPaymentInfo();
	});
	return (
		<ScrollContainer>
			<PersonalInfoContainer>
				<InfoRowBetween>
					<RowKey>
						{window.innerWidth <= 786 ? (
							<Regular16Gray>결제 상태</Regular16Gray>
						) : (
							<Regular20Gray>결제 상태</Regular20Gray>
						)}
					</RowKey>
					{paymentInfo?.payStatus === "SUCCESS" && (
						<Chips color="red">결제 완료</Chips>
					)}
					{paymentInfo?.payStatus === "PENDING" ||
						(paymentInfo?.payStatus === "CANCEL" && (
							<Chips color="gray">결제 취소</Chips>
						))}
				</InfoRowBetween>
				<InfoRowBetween>
					<RowKey>
						{window.innerWidth <= 786 ? (
							<Regular16Gray>결제 방법</Regular16Gray>
						) : (
							<Regular20Gray>결제 방법</Regular20Gray>
						)}
					</RowKey>
					{window.innerWidth <= 786 ? (
						<Bold16DarkGray>
							{paymentInfo?.payType === "CARD"
								? "신용/체크카드"
								: "계좌이체"}
						</Bold16DarkGray>
					) : (
						<Bold20DarkGray>
							{paymentInfo?.payType === "CARD"
								? "신용/체크카드"
								: "계좌이체"}
						</Bold20DarkGray>
					)}
				</InfoRowBetween>
				<InfoRowBetween>
					<RowKey>
						{window.innerWidth <= 786 ? (
							<Regular16Gray>결제 일시</Regular16Gray>
						) : (
							<Regular20Gray>결제 일시</Regular20Gray>
						)}
					</RowKey>
					{window.innerWidth <= 786 ? (
						<Bold16DarkGray>
							{paymentInfo?.reservationDateTime &&
								formatReservationDateTime(
									paymentInfo.reservationDateTime
								)}
						</Bold16DarkGray>
					) : (
						<Bold20DarkGray>
							{paymentInfo?.reservationDateTime &&
								formatReservationDateTime(
									paymentInfo.reservationDateTime
								)}
						</Bold20DarkGray>
					)}
				</InfoRowBetween>
				<InfoRowBetween>
					<RowKey>
						{window.innerWidth <= 786 ? (
							<Regular16Gray>주문금액</Regular16Gray>
						) : (
							<Regular20Gray>주문금액</Regular20Gray>
						)}
					</RowKey>
					{window.innerWidth <= 786 ? (
						<Bold16DarkGray>
							{paymentInfo?.itemCost.toLocaleString()}원
						</Bold16DarkGray>
					) : (
						<Bold20Gray>
							{paymentInfo?.itemCost.toLocaleString()}원
						</Bold20Gray>
					)}
				</InfoRowBetween>
				{paymentInfo?.pointUse && (
					<InfoRowBetween>
						<RowKey>
							{window.innerWidth <= 786 ? (
								<Regular16Gray>포인트 사용</Regular16Gray>
							) : (
								<Regular20Gray>포인트 사용</Regular20Gray>
							)}
						</RowKey>
						{window.innerWidth <= 786 ? (
							<Bold16Gray>
								-{paymentInfo?.pointUse.toLocaleString()}원
							</Bold16Gray>
						) : (
							<Bold20Gray>
								-{paymentInfo?.pointUse.toLocaleString()}원
							</Bold20Gray>
						)}
					</InfoRowBetween>
				)}

				<InfoRowBetween>
					<RowKey>
						<Bold24AppColor>총 결제 금액</Bold24AppColor>
					</RowKey>
					<Bold24AppColor>
						{paymentInfo?.itemPayPrice}원
					</Bold24AppColor>
				</InfoRowBetween>
			</PersonalInfoContainer>
		</ScrollContainer>
	);
};

export default PaymentInfoModal;
