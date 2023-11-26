import React from "react";
import { BookerInfoProps } from "../../../Interfaces/PropsInterfaces";
import {
	InfoRow,
	PersonalInfoContainer,
	RowKey,
	ScrollContainer,
} from "../styles";
import { Regular20DarkGray, Regular20Gray } from "../../Text/Text";

const BookerInfoModal = ({
	bookerBirthDay,
	bookerEmail,
	bookerFirstNameEN,
	bookerLastNameEN,
	bookerName,
	bookerPhoneNumber,
}: BookerInfoProps) => {
	return (
		<ScrollContainer>
			<PersonalInfoContainer>
				<InfoRow>
					<RowKey>
						<Regular20Gray>예약자 이름</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{bookerName}</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>영문 이름</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>
						{bookerLastNameEN + bookerFirstNameEN}
					</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>생년월일</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{bookerBirthDay}</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>전화번호</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{bookerPhoneNumber}</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>이메일 주소</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{bookerEmail}</Regular20DarkGray>
				</InfoRow>
				{/* <InfoRow>
					<RowKey></RowKey>
					<Regular20DarkGray>{}</Regular20DarkGray>
				</InfoRow> */}
			</PersonalInfoContainer>
		</ScrollContainer>
	);
};

export default BookerInfoModal;
