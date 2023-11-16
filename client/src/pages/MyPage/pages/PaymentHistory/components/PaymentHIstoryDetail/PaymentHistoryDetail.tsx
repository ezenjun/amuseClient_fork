import React, { useEffect, useState } from "react";
import { PageContainer } from "../../../../styles";
import {
	Bold32Black,
	Regular16Gray,
	Bold40Black,
} from "../../../../../../components/Text/Text";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router";
import { PaymentDetailInterface } from "../../../../../../Interfaces/DataInterfaces";
import {
	DetailContainer,
	ReservationIdContainer,
	ReservationInfoContainer,
	ReservationInfoMenuContainer,
} from "./styles";
import PaymentInformation from "./Section/PaymentInformation/PaymentInformation";
import ItemInformation from "./Section/ItemInformation/ItemInformation";
import Details from "./Section/Details/Details";
import CancelPayment from "./Section/CancelPayment/CancelPayment";
import EachPayment from "../EachPayment";
import { WebButton } from "../../../../../../components/Button/WebButton";

type Props = {};

const PaymentHistoryDetail = (props: Props) => {
	const { id } = useParams();
	const [data, setData] = useState<PaymentDetailInterface>();
	const [cookies] = useCookies(["__jwtkid__"]);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	const getPaymentHistoryDetail = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(
					`${process.env.REACT_APP_AMUSE_API}/api/payment/detail/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					const data = response.data.data;
					setData(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [window.innerWidth, screenWidth]);
	useEffect(() => {
		getPaymentHistoryDetail();
	}, []);
	return (
		<PageContainer>
			<Bold40Black>결제 상세 내역</Bold40Black>
			<DetailContainer>
				<ReservationInfoContainer>
					<ReservationIdContainer>
						<Regular16Gray>예약 번호</Regular16Gray>
						<Regular16Gray>
							{
								data?.paymentDetailTopItemInfoResponseDto
									.reservationNumber
							}
						</Regular16Gray>
					</ReservationIdContainer>
					{data && (
						<EachPayment
							key={
								data?.paymentDetailMatterResponseDto
									.reservationNumber
							}
							data={data?.paymentDetailTopItemInfoResponseDto}
						/>
					)}
				</ReservationInfoContainer>

				{/* 결제 상세 정보 */}
				<PaymentInformation data={data?.paymentDetailInfoResponseDto} />
				{/* 상품 정보 */}
				<ItemInformation data={data?.paymentDetailItemResponseDto} />
				{/* 세부 사항 */}
				<Details data={data?.paymentDetailMatterResponseDto} />
				{/* 결제 취소 */}
				<CancelPayment data={data?.paymentCancelRuleResponseDto} />
				<ReservationInfoContainer>
					<ReservationInfoMenuContainer>
						<Bold32Black>결제 정보</Bold32Black>
						{screenWidth > 768 && (
							<WebButton
								color="gray2"
								fontSize={20}
								verticalPadding={18}
								width={270}
							>
								결제 정보 확인
							</WebButton>
						)}
					</ReservationInfoMenuContainer>
					{screenWidth <= 768 && (
						<WebButton
							color="gray2"
							fontSize={20}
							verticalPadding={18}
						>
							결제 정보 확인
						</WebButton>
					)}
				</ReservationInfoContainer>
			</DetailContainer>
		</PageContainer>
	);
};

export default PaymentHistoryDetail;
