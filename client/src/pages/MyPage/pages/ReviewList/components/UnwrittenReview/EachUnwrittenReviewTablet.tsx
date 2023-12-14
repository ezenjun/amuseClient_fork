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
import { ReviewData, WrittenReview } from "../../../../../../Types/DataTypes";
import { useSetRecoilState } from "recoil";
import {
	createReviewID,
	createReviewVisibleState,
	reviewItemID,
} from "../../../../../../Recoil/ReveiwAtomState";

type Props = {
	data: ReviewData;
};

const EachUnwrittenReviewTablet = ({ data }: Props) => {
	const navigate = useNavigate();
	const setCreateReviewModalVisible = useSetRecoilState(
		createReviewVisibleState
	);
	const setCreateReviewID = useSetRecoilState(createReviewID);
	const setCreateReviewItemID = useSetRecoilState(reviewItemID);

	const handleWriteReview =
		(reviewId: number, itemId: number) =>
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			setCreateReviewID(reviewId);
			setCreateReviewItemID(itemId);
			setCreateReviewModalVisible(true);
		};
	return (
		<EachPaymentTabletContainer
			onClick={() => navigate(`/detail/${data.itemDbId}`)}
		>
			<ItemInfoTabletContainer>
				<SquareImage
					size={60}
					imgUrl={data.imageUrl}
					borderRadius={8}
				></SquareImage>
				<InfoTextContainer>
					<ItemNameContainer>
						<Bold20Black>{data.title}</Bold20Black>
					</ItemNameContainer>
					<Regular14Gray>
						{formatDate(new Date(data.startDate))} ~{" "}
						{formatDate(new Date(data.endDate))}{" "}
						{calculateNightStay(data.startDate, data.endDate)}
					</Regular14Gray>
				</InfoTextContainer>
				<PaymentButtonContainer>
					<WebButton
						color="red"
						verticalPadding={12}
						fontSize={16}
						width={140}
						onClick={(e) =>
							handleWriteReview(data.paymentId, data.itemDbId)(e)
						}
					>
						리뷰 작성
					</WebButton>
				</PaymentButtonContainer>
			</ItemInfoTabletContainer>
		</EachPaymentTabletContainer>
	);
};

export default EachUnwrittenReviewTablet;
