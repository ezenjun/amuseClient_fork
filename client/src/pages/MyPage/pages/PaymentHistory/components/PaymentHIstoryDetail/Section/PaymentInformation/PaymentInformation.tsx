import React, { useState } from "react";
import { ReservationInfoContainer } from "../../styles";
import {
	Bold32Black,
	Regular16Gray,
	Regular20Black,
	Regular20Gray,
} from "../../../../../../../../components/Text/Text";
import { PaymentInformationProps } from "../../../../../../../../Interfaces/PropsInterfaces";
import GrayBox from "../../../../../../../../components/Box/GrayBox";
import { GrayBoxList, GrayboxRow, RowDetail, RowName } from "../styles";
import { ReactComponent as ArrowRightMobile } from "../../../../../../../../assets/Icons/Arrow/arrow_right_web.svg";
import { Modal } from "../../../../../../../../components/Modal/Modal";
import BookerInfoModal from "../../../../../../../../components/Modal/PaymentDetailModals/BookerInfoModal";
import GuestInfoModal from "../../../../../../../../components/Modal/PaymentDetailModals/GuestInfoModal";
import AdditionalInfoModal from "../../../../../../../../components/Modal/PaymentDetailModals/AdditionalInfoModal";

interface PaymentInfoProps {
	data: PaymentInformationProps | undefined;
}

const PaymentInformation = ({ data }: PaymentInfoProps) => {
	const [showReservationModal, setShowReservationModal] = useState(false);
	const [showGuestModal, setShowGuestModal] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const screenWidth = window.innerWidth;

	const bookerInfo = {
		bookerName: data?.bookerName || "",
		bookerBirthDay: data?.bookerBirthDay || "",
		bookerFirstNameEN: data?.bookerFirstNameEN || "",
		bookerLastNameEN: data?.bookerLastNameEN || "",
		bookerPhoneNumber: data?.bookerPhoneNumber || "",
		bookerEmail: data?.bookerEmail || "",
	};

	const guestInfo = {
		guestName: data?.guestName || "",
		guestBirthDay: data?.guestBirthDay || "",
		guestFirstNameEN: data?.guestFirstNameEN || "",
		guestLastNameEN: data?.guestLastNameEN || "",
		guestPhoneNumber: data?.guestPhoneNumber || "",
		guestEmail: data?.guestEmail || "",
	};

	return (
		<ReservationInfoContainer>
			<Bold32Black>결제 상세 정보</Bold32Black>
			<GrayBoxList>
				{data?.bookerName && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>예약자 정보</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{data.bookerName}
								</Regular20Black>
								<ArrowRightMobile
									onClick={() =>
										setShowReservationModal(
											!showReservationModal
										)
									}
								></ArrowRightMobile>
							</RowDetail>
						</GrayboxRow>
						{showReservationModal && (
							<Modal
								setShowModal={setShowReservationModal}
								title="예약자 정보"
								width={screenWidth < 768 ? "100%" : undefined}
								height={screenWidth < 768 ? "100%" : undefined}
							>
								<BookerInfoModal
									{...bookerInfo}
								></BookerInfoModal>
							</Modal>
						)}
					</GrayBox>
				)}
				{data?.guestName && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>투숙자 정보</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{data.guestName}
								</Regular20Black>
								<ArrowRightMobile
									onClick={() =>
										setShowGuestModal(!showGuestModal)
									}
								></ArrowRightMobile>
							</RowDetail>
						</GrayboxRow>
						{showGuestModal && (
							<Modal
								setShowModal={setShowGuestModal}
								title="투숙자 정보"
							>
								<GuestInfoModal {...guestInfo}></GuestInfoModal>
							</Modal>
						)}
					</GrayBox>
				)}
				{data?.additionalRequest && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>추가 요청 사항</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{data.additionalRequest}
								</Regular20Black>
								<ArrowRightMobile
									onClick={() =>
										setShowInfoModal(!showInfoModal)
									}
								></ArrowRightMobile>
							</RowDetail>
						</GrayboxRow>
						{showInfoModal && (
							<Modal
								setShowModal={setShowInfoModal}
								title="추가 요청 사항"
							>
								<AdditionalInfoModal
									content={data.additionalRequest}
								></AdditionalInfoModal>
							</Modal>
						)}
					</GrayBox>
				)}
			</GrayBoxList>

			<Regular16Gray>
				결제 정보 변경이 필요한 경우 기존 결제 취소 후 새로
				결제해주세요.
			</Regular16Gray>
		</ReservationInfoContainer>
	);
};

export default PaymentInformation;
