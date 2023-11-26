import React from "react";
import { GuestInfoProps } from "../../../Interfaces/PropsInterfaces";
import {
	InfoRow,
	PersonalInfoContainer,
	RowKey,
	ScrollContainer,
} from "../styles";
import { Regular20DarkGray, Regular20Gray } from "../../Text/Text";

const GuestInfoModal = ({
	guestBirthDay,
	guestEmail,
	guestFirstNameEN,
	guestLastNameEN,
	guestName,
	guestPhoneNumber,
}: GuestInfoProps) => {
	return (
		<ScrollContainer>
			<PersonalInfoContainer>
				<InfoRow>
					<RowKey>
						<Regular20Gray>예약자 이름</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{guestName}</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>영문 이름</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>
						{guestLastNameEN + guestFirstNameEN}
					</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>생년월일</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{guestBirthDay}</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>전화번호</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{guestPhoneNumber}</Regular20DarkGray>
				</InfoRow>
				<InfoRow>
					<RowKey>
						<Regular20Gray>이메일 주소</Regular20Gray>
					</RowKey>
					<Regular20DarkGray>{guestEmail}</Regular20DarkGray>
				</InfoRow>
				{/* <InfoRow>
            <RowKey></RowKey>
            <Regular20DarkGray>{}</Regular20DarkGray>
        </InfoRow> */}
			</PersonalInfoContainer>
		</ScrollContainer>
	);
};

export default GuestInfoModal;
