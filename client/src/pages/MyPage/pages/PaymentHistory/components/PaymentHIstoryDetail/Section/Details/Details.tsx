import React from "react";
import { ReservationInfoContainer } from "../../styles";
import {
	Bold32Black,
	Regular20Black,
	Regular20Gray,
} from "../../../../../../../../components/Text/Text";
import { paymentDetailMatterResponseDto } from "../../../../../../../../Interfaces/DataInterfaces";
import { GrayBoxList, GrayboxRow, RowDetail, RowName } from "../styles";
import GrayBox from "../../../../../../../../components/Box/GrayBox";
import { ReactComponent as ArrowRightMobile } from "../../../../../../../../assets/Icons/Arrow/arrow_right_web.svg";
import { formatDate } from "../../../../../../../../utils/DateFunctions";

interface DetailProps {
	data: paymentDetailMatterResponseDto | undefined;
}

const Details = ({ data }: DetailProps) => {
	const additionalInfoHTML = {
		__html: data?.itemAdditionalInformation || "",
	};

	return (
		<ReservationInfoContainer>
			<Bold32Black>세부 사항</Bold32Black>
			<GrayBoxList>
				{data?.reservationNumber && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>예약 번호</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{data.reservationNumber}
								</Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
				{data?.reservationDateTime && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>결제 일시</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{new Date(
										data.reservationDateTime
									).toLocaleString()}
								</Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
				{data?.itemAdditionalInformation && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>추가 정보</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black
									dangerouslySetInnerHTML={additionalInfoHTML}
								></Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
			</GrayBoxList>
		</ReservationInfoContainer>
	);
};

export default Details;
