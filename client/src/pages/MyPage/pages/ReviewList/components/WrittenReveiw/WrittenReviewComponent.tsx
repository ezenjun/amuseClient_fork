import React from "react";
import {
	EachDayContainer,
	HistoryContainer,
	PaymentListContainer,
} from "../../../PaymentHistory/styles";
import {
	Bold20Gray,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import { formatDate } from "../../../../../../utils/DateFunctions";
import EachUnwrittenReview from "../UnwrittenReview/EachUnwrittenReview";
import { WrittenReview } from "../../../../../../Types/DataTypes";
import EachWrittenReview from "./EachWrittenReview";
import GrayBox from "../../../../../../components/Box/GrayBox";

interface WrittenReviewProps {
	data: WrittenReview[];
}

const WrittenReviewComponent = ({ data }: WrittenReviewProps) => {
	return (
		<HistoryContainer>
			{data.length > 0 ? (
				<>
					{data.map((review) => {
						return (
							<EachDayContainer key={review.paymentDate}>
								<Regular16Gray>
									작성일 :{" "}
									{formatDate(new Date(review.paymentDate))}
								</Regular16Gray>
								<PaymentListContainer>
									<EachWrittenReview
										key={review.itemId}
										data={review}
									/>
								</PaymentListContainer>
							</EachDayContainer>
						);
					})}
				</>
			) : (
				<GrayBox verticalPadding={24} horizontalPadding={31}>
					<Bold20Gray>작성한 리뷰가 없습니다.</Bold20Gray>
				</GrayBox>
			)}
		</HistoryContainer>
	);
};

export default WrittenReviewComponent;
