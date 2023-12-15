import React, { useEffect, useState } from "react";
import { PageContainer } from "../../styles";
import {
	Bold32Black,
	Regular16Black,
	Regular16Gray,
	Regular20Black,
} from "../../../../components/Text/Text";
import GrayBox from "../../../../components/Box/GrayBox";
import { SettingsContainer } from "./styles";
import { useCookies } from "react-cookie";
import axios from "axios";
import { UserInfo } from "../../../../Interfaces/DataInterfaces";
import CurrentUserInfo from "./components/CurrentUserInfo";
import {
	Left,
	Row,
	RowKey,
	SettingContainer,
	UserInfoContainer,
} from "./components/styles";
import { WebButton } from "../../../../components/Button/WebButton";

const SettingsComponent = () => {
	const [cookies] = useCookies(["__jwtkid__"]);
	const [isEdit, setIsEdit] = useState(false);
	const [userData, setUserData] = useState<UserInfo>();
	const updateUserInfo = () => {
		console.log("post");
		setIsEdit(false);
	};
	const getUserInfoAsToken = async () => {
		const token = cookies["__jwtkid__"];
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/my-page/info`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				const res = response.data.data;
				console.log(res);
				setUserData(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserInfoAsToken();
	}, []);
	return (
		<PageContainer>
			<Bold32Black>설정</Bold32Black>
			<SettingsContainer>
				<GrayBox verticalPadding={26} horizontalPadding={31}>
					<SettingContainer>
						<Left>
							<Regular20Black>내 설정</Regular20Black>
						</Left>
						<WebButton
							width={140}
							verticalPadding={12}
							color="gray2"
							fontSize={16}
							onClick={
								isEdit
									? () => updateUserInfo()
									: () => setIsEdit(true)
							}
						>
							{isEdit ? "저장" : "내 정보 수정"}
						</WebButton>
					</SettingContainer>
					{userData && (
						<CurrentUserInfo userData={userData}></CurrentUserInfo>
					)}
				</GrayBox>

				<GrayBox verticalPadding={26} horizontalPadding={31}>
					<Regular20Black>포인트 사용</Regular20Black>
					<UserInfoContainer>
						<Row marginTop={24}>
							<RowKey>
								<Regular16Gray>보유 포인트</Regular16Gray>
							</RowKey>
							<Regular16Black>{userData?.point}</Regular16Black>
						</Row>
					</UserInfoContainer>
				</GrayBox>
			</SettingsContainer>
		</PageContainer>
	);
};

export default SettingsComponent;
