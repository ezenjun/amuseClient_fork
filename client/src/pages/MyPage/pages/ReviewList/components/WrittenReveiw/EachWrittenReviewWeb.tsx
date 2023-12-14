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

type Props = {
	data: WrittenReview;
};

const EachWrittenReviewWeb = ({ data }: Props) => {
	const navigate = useNavigate();
	return (
		<S.WrittenReviewContainer
			onClick={() => navigate(`/detail/${data.itemId}`)}
		>
			<S.ItemInfo>
				<S.ItemInfoLeft>
					<SquareImage
						size={60}
						imgUrl={data.imageUrl}
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
				<Bold16AppColor>수정하기</Bold16AppColor>
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
						<Bold24Black>4.8</Bold24Black>
						<Regular16Gray> / 5</Regular16Gray>
					</S.ScoreContainer>
				</S.StarContainer>

				<Regular16Gray>
					이용할 수 있는 혜택은 되게 많은데 ㅠㅠ 여유로운 일정을
					즐기다 보면 결국 뽕뽑지 못하고 끝나는 것 같아요… 자꾸
					이티켓에 집착해서 일정을 짜게 된게 아쉽네요.
				</Regular16Gray>
			</S.ReviewContent>
		</S.WrittenReviewContainer>
	);
};

export default EachWrittenReviewWeb;
