import React, { useEffect, useState } from "react";
import { PageContainer } from "../../styles";
import {
	Bold32Black,
	Regular20DarkGray,
	SemiBold13Black,
	SemiBold16Black,
} from "../../../../components/Text/Text";
import { SettingsContainer } from "../SettingsComponent/styles";
import Tabs from "../../../../components/Tabs/Tabs";
import { GridContainer, GridItem, ItemBottom, ItemTop } from "./styles";
import { likeTabList } from "../../../../constants";
import { useCookies } from "react-cookie";
import axios from "axios";
import { LikeItem } from "../../../../Interfaces/DataInterfaces";
import { useNavigate } from "react-router";
import { ReactComponent as LikeBefore } from "../../../../assets/Icons/heart.svg";
import { ReactComponent as LikeAfter } from "../../../../assets/Icons/heart_full.svg";

const Likes = () => {
	const navigate = useNavigate();
	const [selectedTab, setSelectedTab] = useState("전체");
	const [userLikedItems, setUserLikedItems] = useState<number[]>([]); // 현재 사용자가 좋아요한 아이템 목록
	const [likeData, setLikeData] = useState<LikeItem[]>();
	const [cookies] = useCookies(["__jwtkid__"]);
	const getTotalLikeData = async () => {
		const token = cookies["__jwtkid__"];
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/my-page/like/all`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				params: {
					page: 1,
					size: 30,
				},
			})
			.then((response) => {
				const res = response.data.data.itemInfoList;
				console.log(res);
				setLikeData(res);
				const likedItemIds = res.map((item: LikeItem) => item.itemDbId);
				setUserLikedItems(likedItemIds);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getLikeData = async (selectedTab?: string) => {
		const token = cookies["__jwtkid__"];
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/my-page/like`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				params: {
					"category-name": selectedTab,
					page: 1,
					size: 30,
				},
			})
			.then((response) => {
				const res = response.data.data.itemInfoList;
				console.log(res);
				setLikeData(res);
				const likedItemIds = res.map((item: LikeItem) => item.itemDbId);
				setUserLikedItems(likedItemIds);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const toggleLike = async (itemId: number, selectedTab: string) => {
		try {
			const token = cookies["__jwtkid__"];
			if (userLikedItems.includes(itemId)) {
				// 이미 좋아요한 상태면 좋아요 취소
				axios
					.post(
						`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/like-minus`,
						{ categoryName: selectedTab },
						{
							headers: {
								"Content-Type": "application/json",
								Authorization: `${token}`,
							},
						}
					)
					.then((response) => {
						alert("관심상품에서 삭제되었습니다.");
					});
				setUserLikedItems(userLikedItems.filter((id) => id !== itemId));
			} else {
				// 좋아요 추가
				axios
					.post(
						`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/like-plus`,
						{ categoryName: selectedTab },
						{
							headers: {
								"Content-Type": "application/json",
								Authorization: `${token}`,
							},
						}
					)
					.then((response) => {
						alert("관심상품에 등록되었습니다.");
					});
				setUserLikedItems([...userLikedItems, itemId]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (selectedTab === "전체") {
			getTotalLikeData();
		} else {
			getLikeData(selectedTab);
		}
	}, [selectedTab]);
	return (
		<PageContainer>
			<Bold32Black>관심 상품</Bold32Black>
			<SettingsContainer>
				<Tabs
					tabList={likeTabList}
					gap={16}
					activeTab={selectedTab}
					setActiveTab={setSelectedTab}
					wrap={true}
				></Tabs>
				<GridContainer>
					{likeData && likeData.length > 0 ? (
						likeData.map((item) => {
							return (
								<GridItem
									key={item.itemDbId}
									onClick={() =>
										navigate(`/detail/${item.itemDbId}`)
									}
								>
									<ItemTop imgUrl={item.imageUrl}>
										{userLikedItems.includes(
											item.itemDbId
										) ? (
											// 현재 사용자가 좋아요한 경우
											<LikeAfter
												onClick={(e) => {
													e.stopPropagation();
													toggleLike(
														item.itemDbId,
														selectedTab
													);
												}}
												style={{ cursor: "pointer" }}
											/>
										) : (
											// 현재 사용자가 좋아요하지 않은 경우
											<LikeBefore
												onClick={(e) => {
													e.stopPropagation();
													toggleLike(
														item.itemDbId,
														selectedTab
													);
												}}
												style={{ cursor: "pointer" }}
											/>
										)}
									</ItemTop>
									<ItemBottom>
										<SemiBold13Black>
											{item.title}
										</SemiBold13Black>
										<SemiBold16Black>
											가격: {item.startPrice} ~
										</SemiBold16Black>
									</ItemBottom>
								</GridItem>
							);
						})
					) : (
						<Regular20DarkGray>
							관심상품 데이터가 존재하지 않습니다.
						</Regular20DarkGray>
					)}
				</GridContainer>
			</SettingsContainer>
		</PageContainer>
	);
};

export default Likes;
