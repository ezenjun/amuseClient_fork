import React, { useState } from "react";
import { useInfoContext } from "../../../../../Contexts/InfoContext";
import { InfoModal } from "../../../Modal/InfoModal";
import styles from "./Reservation.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import {
	Bold20DarkGray,
	Regular16Black,
} from "../../../../../../components/Text/Text";
import GrayBox from "../../../../../../components/Box/GrayBox";
import { EachReservationField, ReservationGrid } from "./styles";
import InputField from "../../../../../../components/Input/InputField";

export function ReservationInfo() {
	const [showInfoModal, setInfoModal] = useState(false);
	const { name, email, phone, setPhone, setName, birthday, setBirthDay } =
		useInfoContext(); // 이게 글로벌된 유저 정보라고 가정
	const [reservationPhoneNumber, setReservationPhoneNumber] = useState(phone);

	const clickHandler = (e: any) => {
		setInfoModal(true);
		document.body.style.overflow = "hidden";
	};

	// const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	//   setUserInfo(!useUserInfo);
	// };
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let target = e.target.value;
		setReservationPhoneNumber(target.replace(/[^0-9]/g, ""));
	};
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
							value={name}
							setValue={setName}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>생년월일</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={name}
							setValue={setName}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>영문 이름</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={name}
							setValue={setName}
						></InputField>
					</EachReservationField>
					<EachReservationField>
						<Bold20DarkGray>영문 성</Bold20DarkGray>
						<InputField
							type="text"
							placeholder="이름"
							isCorrect={true}
							value={name}
							setValue={setName}
						></InputField>
					</EachReservationField>

					<EachReservationField>
						<Bold20DarkGray>전화번호</Bold20DarkGray>
						<InputField
							type="tel"
							placeholder="+82 (대한민국)"
							isCorrect={true}
							value={"+82 (대한민국)"}
							setValue={setName}
						></InputField>
					</EachReservationField>
					<InputField
						type="tel"
						placeholder="01012345678"
						isCorrect={true}
						value={phone}
						setValue={setName}
					></InputField>
					<EachReservationField>
						<Bold20DarkGray>이메일</Bold20DarkGray>
						<InputField
							type="email"
							placeholder="example@example.com"
							isCorrect={true}
							value={name}
							setValue={setName}
						></InputField>
					</EachReservationField>
				</ReservationGrid>
				{/* <div className={styles.infoContainer}>
					<ul className={styles.info}>
						<li>
							<span>예약자 이름</span>
							<span>{name}</span>
						</li>
						<li>
							<span>이메일 주소</span>
							<span>{email}</span>
						</li>
						<li>
							<span>휴대폰 번호</span>
							<span>{phone}</span>
							<input
								type="phone"
								style={{
									padding: "0.5rem",
									width: "300px",
									border: "1px solid #efefef",
									backgroundColor: "#efefef",
									borderRadius: "3px",
								}}
								value={reservationPhoneNumber}
								onChange={(e) => {
									phoneNumberHandler(e);
								}}
							/>
						</li>

						<li>예약 안내 정보가 입력하신 이메일로 발송됩니다.</li>
					</ul>
					
				</div> */}
			</GrayBox>

			{showInfoModal && <InfoModal setInfoModal={setInfoModal} />}
		</DetailSectionContainer>
	);
}
