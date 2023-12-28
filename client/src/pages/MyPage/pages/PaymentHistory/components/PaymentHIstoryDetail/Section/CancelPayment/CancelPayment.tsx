import React, { useEffect, useState } from "react";
import {
	MenuRightContainer,
	MobileButtonContainer,
	ReservationInfoContainer,
	ReservationInfoMenuContainer,
} from "../../styles";
import {
	Bold32Black,
	Regular20Black,
} from "../../../../../../../../components/Text/Text";
import { paymentCancelContent } from "../../../../../../../../Interfaces/DataInterfaces";
import { WebButton } from "../../../../../../../../components/Button/WebButton";
import GrayBox from "../../../../../../../../components/Box/GrayBox";
import { GrayboxRow, RowDetail, RowName } from "../styles";
import { Modal } from "../../../../../../../../components/Modal/Modal";
import CancelPolicyModal from "../../../../../../../../components/Modal/PaymentDetailModals/CancelPolicyModal";

interface CancelPaymentProps {
	data: paymentCancelContent | undefined;
}

const CancelPayment = ({ data }: CancelPaymentProps) => {
	const [showModal, setShowModal] = useState(false);

	const additionalInfoHTML = {
		__html: data?.content || "",
	};
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [window.innerWidth, screenWidth]);

	return (
		<ReservationInfoContainer>
			<ReservationInfoMenuContainer>
				<Bold32Black>결제 취소</Bold32Black>
				{screenWidth > 768 && (
					<MenuRightContainer>
						<WebButton
							color="white"
							fontSize={20}
							verticalPadding={18}
							onClick={() => setShowModal(!showModal)}
						>
							환불 규정 확인
						</WebButton>
						<WebButton
							color="gray2"
							fontSize={20}
							verticalPadding={18}
						>
							취소 요청
						</WebButton>
					</MenuRightContainer>
				)}
			</ReservationInfoMenuContainer>
			{data?.content && (
				<GrayBox verticalPadding={35} horizontalPadding={31}>
					<GrayboxRow>
						<RowDetail>
							<Regular20Black
								dangerouslySetInnerHTML={additionalInfoHTML}
							></Regular20Black>
						</RowDetail>
					</GrayboxRow>
				</GrayBox>
			)}
			{screenWidth < 768 && (
				<MobileButtonContainer>
					<WebButton
						color="white"
						fontSize={20}
						verticalPadding={15}
						onClick={() => setShowModal(!showModal)}
					>
						환불 규정 확인
					</WebButton>
					<WebButton color="gray2" fontSize={20} verticalPadding={15}>
						취소 요청
					</WebButton>
				</MobileButtonContainer>
			)}
			{showModal && data?.content && (
				<Modal
					setShowModal={setShowModal}
					title="취소 및 환불 규정"
					width={screenWidth < 768 ? "100%" : undefined}
					height={screenWidth < 768 ? "100%" : undefined}
				>
					<CancelPolicyModal
						content={data?.content}
					></CancelPolicyModal>
				</Modal>
			)}
		</ReservationInfoContainer>
	);
};

export default CancelPayment;
