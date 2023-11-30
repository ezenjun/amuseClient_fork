import React, { useEffect, useState } from "react";
import { PageContainer } from "../../styles";
import { Bold32Black, Regular20Black } from "../../../../components/Text/Text";
import GrayBox from "../../../../components/Box/GrayBox";
import { SettingsContainer } from "./styles";
import { useCookies } from "react-cookie";
import axios from "axios";
import { UserInfo } from "../../../../Interfaces/DataInterfaces";
import CurrentUserInfo from "./components/CurrentUserInfo";
import { Left, SettingContainer } from "./components/styles";
import { WebButton } from "../../../../components/Button/WebButton";

type Props = {};

const SettingsComponent = (props: Props) => {
	const [isEdit, setIsEdit] = useState(false);
	const updateUserInfo = () => {
		console.log("post");
		setIsEdit(false);
	};
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
					<CurrentUserInfo></CurrentUserInfo>
				</GrayBox>

				<GrayBox verticalPadding={26} horizontalPadding={31}>
					<Regular20Black>포인트 사용</Regular20Black>
				</GrayBox>
			</SettingsContainer>
		</PageContainer>
	);
};

export default SettingsComponent;
