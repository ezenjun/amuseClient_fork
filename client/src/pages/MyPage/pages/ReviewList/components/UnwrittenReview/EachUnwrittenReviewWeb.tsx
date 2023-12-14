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
import { ReviewData, WrittenReview } from "../../../../../../Types/DataTypes";
import {
	EachPaymentContainer,
	InfoTextContainer,
	ItemInfoContainer,
	ItemNameContainer,
} from "../../../PaymentHistory/components/styles";
import { useSetRecoilState } from "recoil";
import {
	createReviewID,
	createReviewVisibleState,
	reviewItemID,
} from "../../../../../../Recoil/ReveiwAtomState";

type Props = {
	data: ReviewData;
};

const EachUnwrittenReviewWeb = ({ data }: Props) => {
	const navigate = useNavigate();
	console.log(data);

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
		<EachPaymentContainer
			onClick={() => navigate(`/detail/${data.itemId}`)}
		>
			<ItemInfoContainer>
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
			</ItemInfoContainer>
			<WebButton
				color="red"
				verticalPadding={12}
				fontSize={16}
				width={140}
				onClick={(e) =>
					handleWriteReview(data.paymentId, data.itemId)(e)
				}
			>
				리뷰 작성
			</WebButton>
		</EachPaymentContainer>
	);
};

export default EachUnwrittenReviewWeb;
