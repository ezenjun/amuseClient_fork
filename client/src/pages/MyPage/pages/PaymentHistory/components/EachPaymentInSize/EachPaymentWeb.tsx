import React from "react";
import {
	EachPaymentContainer,
	InfoTextContainer,
	ItemInfoContainer,
	ItemNameContainer,
} from "../styles";
import { useNavigate } from "react-router";
import SquareImage from "../../../../../../components/Images/SquareImage";
import {
	Bold20Black,
	Bold24DarkGray,
	Regular14Gray,
} from "../../../../../../components/Text/Text";
import { ReactComponent as ArrowRightMobile } from "../../../../../../assets/Icons/Arrow/arrow_right_mobile.svg";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../../utils/DateFunctions";
import Chips from "../../../../../../components/Chips/Chips";
import { WebButton } from "../../../../../../components/Button/WebButton";
import { PaymentHistoryData } from "../../../../../../Types/DataTypes";

type Props = {
	data: PaymentHistoryData;
};

const EachPaymentWeb = ({ data }: Props) => {
	const navigate = useNavigate();
	return (
		<EachPaymentContainer
			onClick={() =>
				navigate(`./${data.mainPaymentId}`, {
					state: data.mainPaymentId,
				})
			}
		>
			<ItemInfoContainer>
				<SquareImage
					size={60}
					imgUrl={data.itemImage}
					borderRadius={8}
				></SquareImage>
				<InfoTextContainer>
					<ItemNameContainer>
						<Bold20Black>{data.itemName}</Bold20Black>
						<ArrowRightMobile></ArrowRightMobile>
					</ItemNameContainer>

					<Regular14Gray>
						{formatDate(new Date(data.travelStartDate))} ~{" "}
						{formatDate(new Date(data.travelEndDate))}{" "}
						{calculateNightStay(
							data.travelStartDate,
							data.travelEndDate
						)}
					</Regular14Gray>
				</InfoTextContainer>
			</ItemInfoContainer>
			{data.payStatus === "SUCCESS" && (
				<Chips color="red">결제 완료</Chips>
			)}
			{data.payStatus === "PENDING" && (
				<Chips color="gray">결제 취소</Chips>
			)}
			<Bold24DarkGray style={{ whiteSpace: "nowrap" }}>
				{data.itemPayPrice.toLocaleString()} 원
			</Bold24DarkGray>
			{data.payStatus === "SUCCESS" && (
				<WebButton
					color="gray2"
					verticalPadding={12}
					fontSize={16}
					width={140}
				>
					결제 취소
				</WebButton>
			)}
			{data.payStatus === "PENDING" && (
				<WebButton
					color="red"
					verticalPadding={12}
					fontSize={16}
					width={140}
				>
					다시 예약
				</WebButton>
			)}
		</EachPaymentContainer>
	);
};

export default EachPaymentWeb;