import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { PageContainer } from "../../styles";
import {
	Bold20Gray,
	Bold32Black,
	Regular16Gray,
} from "../../../../components/Text/Text";
import { SettingsContainer } from "../SettingsComponent/styles";
import Tabs from "../../../../components/Tabs/Tabs";
import {
	EachDayContainer,
	HistoryContainer,
	PaymentListContainer,
} from "../PaymentHistory/styles";
import { formatDate } from "../../../../utils/DateFunctions";
import EachPayment from "../PaymentHistory/components/EachPayment";
import GrayBox from "../../../../components/Box/GrayBox";
import EachUnwrittenReview from "./components/UnwrittenReview/EachUnwrittenReview";

const ReviewHistory = () => {
	const [selectedTab, setSelectedTab] = useState("전체");
	const [reviewHistory, setReviewHistory] = useState({});
	const number = 3;
	const date = new Date();
	const review = {
		itemImage:
			"https://amuseimg.s3.ap-northeast-2.amazonaws.com/images/file_name",
		itemName: "[호텔] 서울 신라호텔 숙박권",
		reviewId: 31,
		itemId: 104,
		reservationDateTime: "2023-11-16T17:51:41.25818",
		travelEndDate: "2023-11-16",
		travelStartDate: "2023-11-16",
	};
	return (
		<PageContainer>
			<Bold32Black>상품 리뷰</Bold32Black>
			<SettingsContainer>
				<Tabs
					tabList={[
						`리뷰 작성 (${number})`,
						`작성한 리뷰 (${number})`,
					]}
					gap={20}
					width={270}
					activeTab={selectedTab}
					setActiveTab={setSelectedTab}
				></Tabs>
				{reviewHistory ? (
					<HistoryContainer>
						<EachDayContainer key={date.toDateString()}>
							<Regular16Gray>
								{formatDate(new Date(date))}
							</Regular16Gray>
							<PaymentListContainer>
								<EachUnwrittenReview
									key={review.reviewId}
									data={review}
								/>
								{/* {reviews.map((review) => (
									<EachPayment
										key={review.reviewId}
										data={review}
									/>
								))} */}
							</PaymentListContainer>
						</EachDayContainer>
					</HistoryContainer>
				) : (
					<HistoryContainer>
						<GrayBox verticalPadding={24} horizontalPadding={31}>
							<Bold20Gray>작성할 리뷰가 없습니다.</Bold20Gray>
						</GrayBox>
					</HistoryContainer>
				)}
			</SettingsContainer>
		</PageContainer>
	);
};

export default ReviewHistory;
