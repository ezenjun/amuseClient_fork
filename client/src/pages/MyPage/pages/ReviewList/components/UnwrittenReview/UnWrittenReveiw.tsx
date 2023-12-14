import React from "react";
import { ReviewData } from "../../../../../../Types/DataTypes";
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
import EachUnwrittenReview from "./EachUnwrittenReview";
import { Review } from "../../../../../../Interfaces/DataInterfaces";
import GrayBox from "../../../../../../components/Box/GrayBox";

interface UnwrittenReivewProps {
	data: Review[];
}

const UnWrittenReveiw = ({ data }: UnwrittenReivewProps) => {
	return (
		<HistoryContainer>
			{data.length > 0 ? (
				<>
					{data.map((review) => {
						return (
							<EachDayContainer key={review.paymentDate}>
								<Regular16Gray>
									결제일 :{" "}
									{formatDate(new Date(review.paymentDate))}
								</Regular16Gray>
								{review.items.map((item) => {
									return (
										<PaymentListContainer>
											<EachUnwrittenReview
												key={item.reviewId}
												data={item}
											/>
										</PaymentListContainer>
									);
								})}
							</EachDayContainer>
						);
					})}
				</>
			) : (
				<GrayBox verticalPadding={24} horizontalPadding={31}>
					<Bold20Gray>작성할 리뷰가 없습니다.</Bold20Gray>
				</GrayBox>
			)}
		</HistoryContainer>
	);
};

export default UnWrittenReveiw;
