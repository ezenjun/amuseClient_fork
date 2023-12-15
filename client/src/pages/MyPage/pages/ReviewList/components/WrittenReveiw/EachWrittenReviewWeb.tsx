import React from "react";
import { useNavigate } from "react-router";
import SquareImage from "../../../../../../components/Images/SquareImage";
import {
	Bold16AppColor,
	Bold20Black,
	Bold24Black,
	Regular14Gray,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import { ReactComponent as Star } from "../../../../../../assets/Icons/Star_22.svg";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../../utils/DateFunctions";
import { ReviewData, WrittenReview } from "../../../../../../Types/DataTypes";
import * as S from "./styles";
import {
	InfoTextContainer,
	ItemNameContainer,
} from "../../../PaymentHistory/components/styles";
import HorizontalLine from "../../../../../../components/Lines/HorizontalLine";
import { Common } from "../../../../../../styles";
import { useSetRecoilState } from "recoil";
import {
	editReviewId,
	editReviewVisibleState,
	editReviewobject,
} from "../../../../../../Recoil/ReviewAtomState";

type Props = {
	data: WrittenReview;
};

const EachWrittenReviewWeb = ({ data }: Props) => {
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
			<S.ItemInfo>
				<S.ItemInfoLeft>
					<SquareImage
						size={60}
						imgUrl={data.itemImages[0].imgUrl}
						borderRadius={8}
					/>
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
				</S.ItemInfoLeft>
				<Bold16AppColor onClick={onEdit}>수정하기</Bold16AppColor>
			</S.ItemInfo>
			<HorizontalLine></HorizontalLine>
			<S.ReviewContent>
				<S.StarContainer>
					<Star
						width={22}
						height={22}
						fill={Common.colors.appColor}
					></Star>
					<S.ScoreContainer>
						<Bold24Black>{data.rating}</Bold24Black>
						<Regular16Gray> / 5</Regular16Gray>
					</S.ScoreContainer>
				</S.StarContainer>

				<Regular16Gray>{data.reviewContent}</Regular16Gray>
			</S.ReviewContent>
		</S.WrittenReviewContainer>
	);
};

export default EachWrittenReviewWeb;
