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

interface CancelPaymentProps {
	data: paymentCancelContent | undefined;
}

const CancelPayment = ({ data }: CancelPaymentProps) => {
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
					<WebButton color="white" fontSize={20} verticalPadding={15}>
						환불 규정 확인
					</WebButton>
					<WebButton color="gray2" fontSize={20} verticalPadding={15}>
						취소 요청
					</WebButton>
				</MobileButtonContainer>
			)}
		</ReservationInfoContainer>
	);
};

export default CancelPayment;
