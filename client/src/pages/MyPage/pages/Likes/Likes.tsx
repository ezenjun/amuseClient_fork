import React, { useState } from "react";
import { PageContainer } from "../../styles";
import {
	Bold32Black,
	SemiBold13Black,
	SemiBold16Black,
} from "../../../../components/Text/Text";
import { SettingsContainer } from "../SettingsComponent/styles";
import Tabs from "../../../../components/Tabs/Tabs";
import { GridContainer, GridItem, ItemBottom, ItemTop } from "./styles";

type Props = {};

const Likes = (props: Props) => {
	const [selectedTab, setSelectedTab] = useState("전체");
	const tabList = [
		"전체",
		"아이 돌봄여행",
		"부모님 돌봄여행",
		"해외 가족여행",
		"장애인 컨시어지여행",
	];
	return (
		<PageContainer>
			<Bold32Black>관심 상품</Bold32Black>
			<SettingsContainer>
				<Tabs tabList={tabList} gap={16}></Tabs>
				<GridContainer>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom>
							<SemiBold13Black>
								[아이돌봄호텔]웨스틴조선 서울 아이돌봄 패키지
								1박
							</SemiBold13Black>
							<SemiBold16Black>가격: 403,000원 ~</SemiBold16Black>
						</ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
					<GridItem>
						<ItemTop></ItemTop>
						<ItemBottom></ItemBottom>
					</GridItem>
				</GridContainer>
			</SettingsContainer>
		</PageContainer>
	);
};

export default Likes;
