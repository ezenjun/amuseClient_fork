import React from "react";
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

interface PaymentInfoProps {
	data: PaymentInformationProps | undefined;
}

const PaymentInformation = ({ data }: PaymentInfoProps) => {
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
								<ArrowRightMobile></ArrowRightMobile>
							</RowDetail>
						</GrayboxRow>
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
								<ArrowRightMobile></ArrowRightMobile>
							</RowDetail>
						</GrayboxRow>
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
								<ArrowRightMobile></ArrowRightMobile>
							</RowDetail>
						</GrayboxRow>
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
