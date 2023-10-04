import React, { useEffect, useState } from "react";
import { InfoModal } from "../../../Modal/InfoModal";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import {
	Bold20DarkGray,
	Regular16Black,
} from "../../../../../../components/Text/Text";
import GrayBox from "../../../../../../components/Box/GrayBox";
import { EachReservationField, ReservationGrid } from "./styles";
import InputField from "../../../../../../components/Input/InputField";
import { PaymentDataState } from "../../../../../../Recoil/OrderAtomState";
import { useRecoilState } from "recoil";

export function ReservationInfo() {
	const [showInfoModal, setInfoModal] = useState(false);
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);

	// 예약자 정보
	const [reservationNameKR, setReservationNameKR] = useState(
		paymentData.reservationInfo.reservationNameKR as string | ""
	);
	const [reservationBirthday, setReservationBirthday] = useState(
		paymentData.reservationInfo.reservationBirthday as string | ""
	);
	const [reservationFirstNameEN, setReservationFirstNameEN] = useState(
		paymentData.reservationInfo.reservationFirstNameEN as string | ""
	);
	const [reservationLastNameEN, setReservationLastNameEN] = useState(
		paymentData.reservationInfo.reservationLastNameEN as string | ""
	);
	const [reservationPhoneCode, setReservationPhoneCode] = useState(
		paymentData.reservationInfo.reservationPhoneCode as number | 0
	);
	const [reservationPhoneNumber, setReservationPhoneNumber] = useState(
		paymentData.reservationInfo.reservationPhoneNumber as string | ""
	);
	const [reservationEmail, setReservationEmail] = useState(
		paymentData.reservationInfo.reservationEmail as string | ""
	);
	const [reservationPassportNumber, setReservationPassportNumber] = useState(
		paymentData.reservationInfo.reservationPassportNumber as string | ""
	);

	useEffect(() => {
		console.log(paymentData);
	}, [paymentData]);

	useEffect(() => {
		setPaymentData((prevData) => ({
			...prevData,
			reservationInfo: {
				...prevData.reservationInfo,
				reservationNameKR,
				reservationBirthday,
				reservationFirstNameEN,
				reservationLastNameEN,
				reservationPhoneCode,
				reservationPhoneNumber,
				reservationEmail,
				reservationPassportNumber,
			},
			// Add other properties as needed
		}));
	}, [
		reservationNameKR,
		reservationBirthday,
		reservationFirstNameEN,
		reservationLastNameEN,
		reservationPhoneCode,
		reservationPhoneNumber,
		reservationEmail,
		reservationPassportNumber,
		setPaymentData, // Make sure to add setPaymentData as a dependency
	]);

	const clickHandler = (e: any) => {
		setInfoModal(true);
		document.body.style.overflow = "hidden";
	};

	// const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	//   setUserInfo(!useUserInfo);
	// };

	return (
		<DetailSectionContainer>
			<SubHeader>
				예약자 정보 &nbsp;<Regular16Black>(필수)</Regular16Black>
			</SubHeader>
			<GrayBox verticalPadding={42} horizontalPadding={30}>
				<ReservationGrid>
					<EachReservationField>
						<Bold20DarkGray>예약자</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={reservationNameKR}
							setValue={setReservationNameKR}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>생년월일</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="19990101"
							isCorrect={true}
							value={reservationBirthday}
							setValue={setReservationBirthday}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>영문 이름</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={reservationFirstNameEN}
							setValue={setReservationFirstNameEN}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>영문 성</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="성"
							isCorrect={true}
							value={reservationLastNameEN}
							setValue={setReservationLastNameEN}
						></InputField>
					</EachReservationField>

					<EachReservationField>
						<Bold20DarkGray>전화번호</Bold20DarkGray>
						<InputField
							type="tel"
							placeholder="+82 (대한민국)"
							isCorrect={true}
							value={"+82 (대한민국)"}
							setValue={setReservationPhoneCode}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<InputField
							type="tel"
							placeholder="01012345678"
							isCorrect={true}
							value={reservationPhoneNumber}
							setValue={setReservationPhoneNumber}
						></InputField>
					</EachReservationField>

					<EachReservationField>
						<Bold20DarkGray>이메일</Bold20DarkGray>
						<InputField
							type="email"
							placeholder="example@example.com"
							isCorrect={true}
							value={reservationEmail}
							setValue={setReservationEmail}
						></InputField>
					</EachReservationField>
				</ReservationGrid>
				{paymentData.itemType === "Hotel" && (
					<EachReservationField marginTop={30}>
						<Bold20DarkGray>여권번호</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="1234567"
							isCorrect={true}
							value={reservationPassportNumber}
							setValue={setReservationPassportNumber}
						></InputField>
					</EachReservationField>
				)}
			</GrayBox>

			{showInfoModal && <InfoModal setInfoModal={setInfoModal} />}
		</DetailSectionContainer>
	);
}
