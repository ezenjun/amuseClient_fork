import React from "react";
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
import {
	EachPaymentContainer,
	InfoTextContainer,
	ItemInfoContainer,
	ItemNameContainer,
} from "../../../PaymentHistory/components/styles";

type Props = {
	data: ReviewData;
};

const EachUnwrittenReviewWeb = ({ data }: Props) => {
	const navigate = useNavigate();
	return (
		<EachPaymentContainer
			onClick={() => navigate(`/detail/${data.itemId}`)}
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
			<WebButton
				color="red"
				verticalPadding={12}
				fontSize={16}
				width={140}
			>
				리뷰 작성
			</WebButton>
		</EachPaymentContainer>
	);
};

export default EachUnwrittenReviewWeb;
