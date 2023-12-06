import React from "react";
import {
	EachPaymentContainer,
	EachPaymentTabletContainer,
	InfoTextContainer,
	ItemInfoContainer,
	ItemInfoTabletContainer,
	ItemNameContainer,
	PaymentButtonContainer,
} from "../../../PaymentHistory/components/styles";
import { useNavigate } from "react-router";
import SquareImage from "../../../../../../components/Images/SquareImage";
import {
	Bold16DarkGray,
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
import {
	PaymentHistoryData,
	ReviewData,
} from "../../../../../../Types/DataTypes";

type Props = {
	data: ReviewData;
};

const EachPaymentTablet = ({ data }: Props) => {
	const navigate = useNavigate();
	return (
		<EachPaymentTabletContainer
			onClick={() => navigate(`/detail/${data.itemId}`)}
		>
			<ItemInfoTabletContainer>
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
				<PaymentButtonContainer>
					<WebButton
						color="red"
						verticalPadding={12}
						fontSize={16}
						width={140}
						onClick={() => navigate(`/detail/104`)}
					>
						리뷰 작성
					</WebButton>
				</PaymentButtonContainer>
			</ItemInfoTabletContainer>
		</EachPaymentTabletContainer>
	);
};

export default EachPaymentTablet;
