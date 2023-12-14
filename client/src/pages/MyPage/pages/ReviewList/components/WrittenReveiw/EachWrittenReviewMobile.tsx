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
	Bold24Black,
	Bold24DarkGray,
	Regular14Gray,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import { ReactComponent as ArrowRightMobile } from "../../../../../../assets/Icons/Arrow/arrow_right_mobile.svg";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../../utils/DateFunctions";
import { WebButton } from "../../../../../../components/Button/WebButton";
import { ReviewData, WrittenReview } from "../../../../../../Types/DataTypes";
import HorizontalLine from "../../../../../../components/Lines/HorizontalLine";
import * as S from "./styles";
import { ReactComponent as Star } from "../../../../../../assets/Icons/Star_22.svg";

type Props = {
	data: WrittenReview;
};

const EachWrittenReviewMobile = ({ data }: Props) => {
	const navigate = useNavigate();
	return (
		<S.WrittenReviewContainer
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
			<HorizontalLine></HorizontalLine>
			<S.StarContainer>
				<Star width={22} height={22}></Star>
				<S.ScoreContainer>
					<Bold24Black>4.8</Bold24Black>
					<Regular16Gray> / 5</Regular16Gray>
				</S.ScoreContainer>
			</S.StarContainer>
			<S.ReviewContent>
				<Regular16Gray>
					이용할 수 있는 혜택은 되게 많은데 ㅠㅠ 여유로운 일정을
					즐기다 보면 결국 뽕뽑지 못하고 끝나는 것 같아요… 자꾸
					이티켓에 집착해서 일정을 짜게 된게 아쉽네요.
				</Regular16Gray>
			</S.ReviewContent>
			<PaymentButtonContainer>
				<WebButton
					color="buttonLG"
					verticalPadding={15}
					fontSize={16}
					onClick={() => navigate(`/detail/104`)}
				>
					수정하기
				</WebButton>
			</PaymentButtonContainer>
		</S.WrittenReviewContainer>
	);
};

export default EachWrittenReviewMobile;
