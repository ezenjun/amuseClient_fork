import React from "react";
import {
	EachPaymentTabletContainer,
	InfoTextContainer,
	ItemInfoTabletContainer,
	ItemNameContainer,
	PaymentButtonContainer,
} from "../../../PaymentHistory/components/styles";
import { useNavigate } from "react-router";
import SquareImage from "../../../../../../components/Images/SquareImage";
import {
	Bold20Black,
	Regular14Gray,
} from "../../../../../../components/Text/Text";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../../utils/DateFunctions";
import { WebButton } from "../../../../../../components/Button/WebButton";
import { ReviewData } from "../../../../../../Types/DataTypes";

type Props = {
	data: ReviewData;
};

const EachUnwrittenReviewTablet = ({ data }: Props) => {
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

export default EachUnwrittenReviewTablet;
