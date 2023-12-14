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

const EachUnwrittenReviewMobile = ({ data }: Props) => {
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
			onClick={() => navigate(`/detail/${data.itemId}`)}
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
			</ItemInfoTabletContainer>
			<PaymentButtonContainer>
				<WebButton
					color="red"
					verticalPadding={15}
					fontSize={16}
					onClick={(e) =>
						handleWriteReview(data.paymentId, data.itemId)(e)
					}
				>
					리뷰 작성
				</WebButton>
			</PaymentButtonContainer>
		</EachPaymentTabletContainer>
	);
};

export default EachUnwrittenReviewMobile;
