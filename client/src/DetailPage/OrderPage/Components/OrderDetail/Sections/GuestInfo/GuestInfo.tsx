import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PaymentDataState } from "../../../../../../Recoil/OrderAtomState";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import GrayBox from "../../../../../../components/Box/GrayBox";
import {
	Bold20DarkGray,
	Regular16Black,
} from "../../../../../../components/Text/Text";
import {
	EachReservationField,
	ReservationGrid,
} from "../ReservationInfo/styles";
import InputField from "../../../../../../components/Input/InputField";
const GuestInfo = () => {
	const [showInfoModal, setInfoModal] = useState(false);
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);

	// 예약자 정보
	const [guestNameKR, setGuestNameKR] = useState(
		paymentData.guestInfo.guestNameKR as string | ""
	);
	const [guestBirthday, setGuestBirthday] = useState(
		paymentData.guestInfo.guestBirthday as string | ""
	);
	const [guestFirstNameEN, setGuestFirstNameEN] = useState(
		paymentData.guestInfo.guestFirstNameEN as string | ""
	);
	const [guestLastNameEN, setGuestLastNameEN] = useState(
		paymentData.guestInfo.guestLastNameEN as string | ""
	);
	const [guestPhoneCode, setGuestPhoneCode] = useState(
		paymentData.guestInfo.guestPhoneCode as number | 0
	);
	const [guestPhoneNumber, setGuestPhoneNumber] = useState(
		paymentData.guestInfo.guestPhoneNumber as string | ""
	);
	const [guestEmail, setGuestEmail] = useState(
		paymentData.guestInfo.guestEmail as string | ""
	);
	const [guestPassportNumber, setGuestPassportNumber] = useState(
		paymentData.reservationInfo.reservationPassportNumber as string | ""
	);

	useEffect(() => {
		console.log(paymentData);
	}, [paymentData]);

	useEffect(() => {
		setPaymentData((prevData) => ({
			...prevData,
			guestInfo: {
				...prevData.reservationInfo,
				guestNameKR,
				guestBirthday,
				guestFirstNameEN,
				guestLastNameEN,
				guestPhoneCode,
				guestPhoneNumber,
				guestEmail,
				guestPassportNumber,
			},
			// Add other properties as needed
		}));
	}, [
		guestNameKR,
		guestBirthday,
		guestFirstNameEN,
		guestLastNameEN,
		guestPhoneCode,
		guestPhoneNumber,
		guestEmail,
		guestPassportNumber,
		setPaymentData, // Make sure to add setPaymentData as a dependency
	]);

	const clickHandler = (e: any) => {
		setInfoModal(true);
		document.body.style.overflow = "hidden";
	};
	return (
		<DetailSectionContainer>
			<SubHeader>
				투숙자 정보 &nbsp;<Regular16Black>(필수)</Regular16Black>
			</SubHeader>
			<GrayBox verticalPadding={42} horizontalPadding={30}>
				<ReservationGrid>
					<EachReservationField>
						<Bold20DarkGray>예약자</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={guestNameKR}
							setValue={setGuestNameKR}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>생년월일</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="19990101"
							isCorrect={true}
							value={guestBirthday}
							setValue={setGuestBirthday}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>영문 이름</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={guestFirstNameEN}
							setValue={setGuestFirstNameEN}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>영문 성</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={guestLastNameEN}
							setValue={setGuestLastNameEN}
						></InputField>
					</EachReservationField>

					<EachReservationField>
						<Bold20DarkGray>전화번호</Bold20DarkGray>
						<InputField
							type="tel"
							placeholder="+82 (대한민국)"
							isCorrect={true}
							value={"+82 (대한민국)"}
							setValue={setGuestPhoneCode}
						></InputField>
					</EachReservationField>
					<InputField
						type="tel"
						placeholder="01012345678"
						isCorrect={true}
						value={guestPhoneNumber}
						setValue={setGuestPhoneNumber}
					></InputField>
					<EachReservationField>
						<Bold20DarkGray>이메일</Bold20DarkGray>
						<InputField
							type="email"
							placeholder="example@example.com"
							isCorrect={true}
							value={guestEmail}
							setValue={setGuestEmail}
						></InputField>
					</EachReservationField>
				</ReservationGrid>
				{paymentData.itemType === "International Hotel" && (
					<EachReservationField marginTop={30}>
						<Bold20DarkGray>여권번호</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="1234567"
							isCorrect={true}
							value={guestPassportNumber}
							setValue={setGuestPassportNumber}
						></InputField>
					</EachReservationField>
				)}
			</GrayBox>
		</DetailSectionContainer>
	);
};

export default GuestInfo;
