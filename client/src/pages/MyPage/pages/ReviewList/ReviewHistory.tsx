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
import GrayBox from "../../../../components/Box/GrayBox";
import EachUnwrittenReview from "./components/UnwrittenReview/EachUnwrittenReview";
import EachWrittenReview from "./components/WrittenReveiw/EachWrittenReview";
import axios from "axios";
import { Review } from "../../../../Interfaces/DataInterfaces";
import UnWrittenReveiw from "./components/UnwrittenReview/UnWrittenReveiw";
import WrittenReviewComponent from "./components/WrittenReveiw/WrittenReviewComponent";
import { WrittenReview } from "../../../../Types/DataTypes";
import { useRecoilState } from "recoil";
import { createReviewVisibleState } from "../../../../Recoil/ReveiwAtomState";
import WriteReview from "../WriteReview/WriteReview";

const ReviewHistory = () => {
	const [selectedTab, setSelectedTab] = useState("리뷰 작성");
	const [createReviewModalVisible, setCreateReviewModalVisible] =
		useRecoilState(createReviewVisibleState);
	const [unWrittenHistory, setUnWrittenHistory] = useState<Review[]>([]);
	const [writtenHistory, setWrittenHistory] = useState<WrittenReview[]>([]);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [cookies] = useCookies(["__jwtkid__"]);
	const getTotalReviewDataCount = (reviewList?: Review[]): number => {
		let totalCount = 0;

		if (!reviewList || reviewList.length === 0) {
			return totalCount; // ReviewList의 길이가 0이면 0을 반환
		}

		reviewList.forEach((review) => {
			totalCount += review.items.length;
		});

		return totalCount;
	};

	const getWrittenReviewData = async () => {
		const token = cookies["__jwtkid__"];
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/my-page/item/review`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				const res = response.data.data.reviewInfos;
				console.log(res);
				setWrittenHistory(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getUnWrittenReviewData = async () => {
		const token = cookies["__jwtkid__"];
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/my-page/item/no-review`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				const res = response.data.data;
				console.log(res);
				setUnWrittenHistory(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (selectedTab.includes("리뷰 작성")) {
			getUnWrittenReviewData();
		} else {
			getWrittenReviewData();
		}
	}, [selectedTab]);
	return (
		<PageContainer>
			<Bold32Black>상품 리뷰</Bold32Black>
			<SettingsContainer>
				<Tabs
					tabList={[
						`리뷰 작성 (${getTotalReviewDataCount(
							unWrittenHistory
						)})`,
						`작성한 리뷰 (${
							writtenHistory ? writtenHistory.length : 0
						})`,
					]}
					gap={20}
					width={screenWidth < 768 ? 270 : undefined}
					activeTab={selectedTab}
					setActiveTab={setSelectedTab}
				></Tabs>
				{selectedTab.includes("리뷰 작성") ? (
					<UnWrittenReveiw data={unWrittenHistory}></UnWrittenReveiw>
				) : (
					<WrittenReviewComponent
						data={writtenHistory}
					></WrittenReviewComponent>
				)}
				{createReviewModalVisible && <WriteReview />}
			</SettingsContainer>
		</PageContainer>
	);
};

export default ReviewHistory;
