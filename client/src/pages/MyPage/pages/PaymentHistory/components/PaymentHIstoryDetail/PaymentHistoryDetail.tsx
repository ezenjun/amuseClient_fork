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
import { Modal } from "../../../../../../components/Modal/Modal";
import PaymentInfoModal from "../../../../../../components/Modal/PaymentDetailModals/PaymentInfoModal";
import PaymentCancelModal from "../../../../../../components/Modal/PaymentDetailModals/PaymentCancelModal";
import PaymentCancelConfirmModal from "../../../../../../components/Modal/PaymentDetailModals/PaymentCancelConfirmModal";
import { useRecoilState } from "recoil";
import {
	showCancelConfirmState,
	showCancelModalState,
	showCancelRequestCompleteState,
	showRefundModalState,
} from "../../../../../../Recoil/MypageAtomState";
import CancelRequestCompleteModal from "../../../../../../components/Modal/PaymentDetailModals/CancelRequestCompleteModal";
import PaymentRefundModal from "../../../../../../components/Modal/PaymentDetailModals/PaymentRefundModal";

const PaymentHistoryDetail = () => {
	const { id } = useParams();
	const [data, setData] = useState<PaymentDetailInterface>();
	const [cookies] = useCookies(["__jwtkid__"]);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [showPayment, setShowPayment] = useState(false);
	const [showRefund, setShowRefund] = useRecoilState(showRefundModalState);
	const [showCancel, setShowCancel] = useRecoilState(showCancelModalState);
	const [showConfirmCancel, setShowConfirmCancel] = useRecoilState(
		showCancelConfirmState
	);
	const [showCancelRequestComplete, setShowCancelRequestComplete] =
		useRecoilState(showCancelRequestCompleteState);

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
					console.log(data);
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
				{data?.paymentDetailTopItemInfoResponseDto.payStatus && (
					<CancelPayment
						data={data?.paymentCancelRuleResponseDto}
						payStatus={
							data?.paymentDetailTopItemInfoResponseDto.payStatus
						}
					/>
				)}

				<ReservationInfoContainer>
					<ReservationInfoMenuContainer>
						<Bold32Black>결제 정보</Bold32Black>
						{screenWidth > 768 && (
							<WebButton
								color="gray2"
								fontSize={20}
								verticalPadding={18}
								width={270}
								onClick={() => setShowPayment(true)}
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
							onClick={() => setShowPayment(true)}
						>
							결제 정보 확인
						</WebButton>
					)}
					{showPayment && (
						<Modal
							setShowModal={setShowPayment}
							title="결제 정보"
							height={screenWidth < 768 ? "100%" : undefined}
							width={screenWidth < 768 ? "100%" : undefined}
						>
							<PaymentInfoModal
								mainPaymentId={Number(id)}
							></PaymentInfoModal>
						</Modal>
					)}
					{showCancel && (
						<Modal
							setShowModal={setShowCancel}
							title="결제 취소"
							height={screenWidth < 768 ? "100%" : undefined}
							width={screenWidth < 768 ? "100%" : undefined}
						>
							{data && (
								<PaymentCancelModal
									data={
										data?.paymentDetailTopItemInfoResponseDto
									}
									itemType={
										data.paymentDetailItemResponseDto
											.itemType
									}
									paymentId={Number(id)}
								></PaymentCancelModal>
							)}
						</Modal>
					)}
					{showRefund && (
						<Modal
							setShowModal={setShowRefund}
							title="환불정보"
							height={screenWidth < 768 ? "100%" : undefined}
							width={screenWidth < 768 ? "100%" : undefined}
						>
							{data && (
								<PaymentRefundModal
									data={
										data?.paymentDetailTopItemInfoResponseDto
									}
									paymentId={Number(id)}
								></PaymentRefundModal>
							)}
						</Modal>
					)}
					{/* {showConfirmCancel && (
						<Modal
							setShowModal={setShowConfirmCancel}
							title="결제를 취소하시겠습니까?"
							width={screenWidth < 768 ? "100%" : "40%"}
						>
							{data && (
								<PaymentCancelConfirmModal
									showModal={showConfirmCancel}
									setShowModal={setShowConfirmCancel}
									paymentId={Number(id)}
									itemType={
										data.paymentDetailItemResponseDto
											.itemType
									}
								></PaymentCancelConfirmModal>
							)}
						</Modal>
					)} */}
					{showCancelRequestComplete && (
						<Modal
							setShowModal={setShowCancelRequestComplete}
							title="결제 취소 요청 접수"
							width={screenWidth < 768 ? "100%" : "40%"}
						>
							{data && (
								<CancelRequestCompleteModal
									showModal={showCancelRequestComplete}
									setShowModal={setShowCancelRequestComplete}
								></CancelRequestCompleteModal>
							)}
						</Modal>
					)}
				</ReservationInfoContainer>
			</DetailContainer>
		</PageContainer>
	);
};

export default PaymentHistoryDetail;
