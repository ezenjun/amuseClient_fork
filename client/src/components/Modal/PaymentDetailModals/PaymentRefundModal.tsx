import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CancelModalContainer, ScrollContainer } from "../styles";
import {
	Bold20DarkGray,
	Bold20Gray,
	Bold24AppColor,
	Regular16Gray,
	Regular20DarkGray,
	Regular20Gray,
} from "../../Text/Text";
import EachPayment from "../../../pages/MyPage/pages/PaymentHistory/components/EachPayment";
import GrayBox from "../../Box/GrayBox";
import { PointRow } from "../../../pages/DetailPage/OrderCompletePage/Sections/UsedPoint";
import { PaymentHistoryData } from "../../../Types/DataTypes";
import { WebButton } from "../../Button/WebButton";
import { showCancelConfirmState } from "../../../Recoil/MypageAtomState";
import { useRecoilState } from "recoil";

interface PaymentRefundProps {
	paymentId: number;
	data: PaymentHistoryData;
}

interface IPaymentData {
	itemImage: string;
	itemName: string;
	travelStartDate: string;
	travelEndDate: string;
	pointUse: number;
	itemPayPrice: number;
}
const PaymentRefundModal = ({ paymentId, data }: PaymentRefundProps) => {
	const [cookies] = useCookies();
	const token = cookies["__jwtkid__"];
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [paymentInfo, setPaymentInfo] = useState<IPaymentData>();

	const getPaymentInfo = async () => {
		await axios
			.get(
				`${process.env.REACT_APP_AMUSE_API}/api/payment/cancel/${paymentId}`,
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
	console.log("CancelModal", data);
	useEffect(() => {
		getPaymentInfo();
	}, []);
	return (
		<ScrollContainer>
			<CancelModalContainer>
				{/* {data && <EachPayment data={data} showPrice={false} />} */}
				<GrayBox
					verticalPadding={screenWidth <= 768 ? 17 : 31}
					horizontalPadding={screenWidth <= 768 ? 14 : 31}
					gap={screenWidth <= 768 ? 12 : 16}
				>
					<PointRow>
						<Bold20DarkGray>총 결제 금액</Bold20DarkGray>
						<Regular20DarkGray>
							{paymentInfo?.itemPayPrice.toLocaleString()}원
						</Regular20DarkGray>
					</PointRow>
					<PointRow>
						<Bold20DarkGray>취소 수수료</Bold20DarkGray>
						<Regular20DarkGray>원</Regular20DarkGray>
					</PointRow>
				</GrayBox>
				<GrayBox
					verticalPadding={screenWidth <= 768 ? 17 : 31}
					horizontalPadding={screenWidth <= 768 ? 14 : 31}
					gap={screenWidth <= 768 ? 12 : 16}
				>
					<PointRow>
						<Regular20Gray>신용/체크카드 환불</Regular20Gray>
						<Regular20Gray>
							{paymentInfo?.itemPayPrice.toLocaleString()}원
						</Regular20Gray>
					</PointRow>
					{paymentInfo?.pointUse && (
						<PointRow>
							<Regular20Gray>포인트 환불</Regular20Gray>
							<Regular20Gray>
								{paymentInfo?.pointUse.toLocaleString()}원
							</Regular20Gray>
						</PointRow>
					)}
					<PointRow>
						<Bold24AppColor>총 환불 금액</Bold24AppColor>
						<Bold24AppColor>
							{paymentInfo?.itemPayPrice.toLocaleString()}원
						</Bold24AppColor>
					</PointRow>
				</GrayBox>
				<PointRow>
					<Regular16Gray>
						- 취소 수수료는 총 상품 금액을 기준으로 계산됩니다.
						<br />- 환불이 완료되면 신용/체크카드와 현금결제의 경우
						영업일 기준 10일 이내에 실제 환불 내역 확인 가능합니다.
					</Regular16Gray>
				</PointRow>
			</CancelModalContainer>
		</ScrollContainer>
	);
};

export default PaymentRefundModal;
