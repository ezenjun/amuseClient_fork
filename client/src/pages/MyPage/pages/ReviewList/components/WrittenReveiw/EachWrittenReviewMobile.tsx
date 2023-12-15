import React from "react";
import {
	InfoTextContainer,
	ItemInfoTabletContainer,
	ItemNameContainer,
	PaymentButtonContainer,
} from "../../../PaymentHistory/components/styles";
import { useNavigate } from "react-router";
import SquareImage from "../../../../../../components/Images/SquareImage";
import {
	Bold20Black,
	Bold24Black,
	Regular14Gray,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../../utils/DateFunctions";
import { WebButton } from "../../../../../../components/Button/WebButton";
import { WrittenReview } from "../../../../../../Types/DataTypes";
import HorizontalLine from "../../../../../../components/Lines/HorizontalLine";
import * as S from "./styles";
import { ReactComponent as Star } from "../../../../../../assets/Icons/Star_22.svg";
import { useSetRecoilState } from "recoil";
import {
	editReviewId,
	editReviewVisibleState,
	editReviewobject,
} from "../../../../../../Recoil/ReviewAtomState";

type Props = {
	data: WrittenReview;
};

const EachWrittenReviewMobile = ({ data }: Props) => {
	const navigate = useNavigate();
	const setEditReviewObject = useSetRecoilState(editReviewobject);
	const setEditReviewId = useSetRecoilState(editReviewId);
	const setEditReviewModalVisible = useSetRecoilState(editReviewVisibleState);
	const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		const updatedEditReviewObject = {
			rate: data.rating,
			reviewContent: data.reviewContent,
			oldImgs: data.reviewImages.map((image) => image.imgUrl),
			newImgs: [],
		};
		setEditReviewId(data.reviewId);
		setEditReviewObject(updatedEditReviewObject);
		setEditReviewModalVisible(true);
	};
	return (
		<S.WrittenReviewContainer
			onClick={() => navigate(`/detail/${data.itemId}`)}
		>
			<ItemInfoTabletContainer>
				<SquareImage
					size={60}
					imgUrl={data.itemImages[0].imgUrl}
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
			<HorizontalLine></HorizontalLine>
			<S.StarContainer>
				<Star width={22} height={22}></Star>
				<S.ScoreContainer>
					<Bold24Black>{data.rating}</Bold24Black>
					<Regular16Gray> / 5</Regular16Gray>
				</S.ScoreContainer>
			</S.StarContainer>
			<S.ReviewContent>
				<Regular16Gray>{data.reviewContent}</Regular16Gray>
			</S.ReviewContent>
			<PaymentButtonContainer>
				<WebButton
					color="buttonLG"
					verticalPadding={15}
					fontSize={16}
					onClick={onEdit}
				>
					수정하기
				</WebButton>
			</PaymentButtonContainer>
		</S.WrittenReviewContainer>
	);
};

export default EachWrittenReviewMobile;
