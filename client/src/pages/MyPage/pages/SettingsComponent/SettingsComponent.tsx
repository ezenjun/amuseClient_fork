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
	DeleteBtnBox,
} from "./components/styles";
import { WebButton } from "../../../../components/Button/WebButton";
import EditUserInfo from "./components/EditUserInfo";
import { useRecoilValue } from "recoil";
import { MypageInfo } from "../../../../Recoil/MypageAtomState";
import { Modal } from "../../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../../../atoms";

const SettingsComponent = () => {
	const movePage = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
	const [cookies, setCookie, removeCookie] = useCookies([
		"__jwtkid__",
		"__usrN__",
		"accessToken",
	]);
	const token = cookies["__jwtkid__"];
	const [isEdit, setIsEdit] = useState(false);
	const [userData, setUserData] = useState<UserInfo>();
	const userInfo = useRecoilValue(MypageInfo);
	const updateUserInfo = () => {
		axios
			.put(`${process.env.REACT_APP_AMUSE_API}/my-page/info`, userInfo, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				getUserInfoAsToken();
				alert("정보가 수정되었습니다.");
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});

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


	const deleteUser = () => {
		axios
			.delete(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/withdraw`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				alert("탈퇴되었습니다.");
				setLoggedIn(false);
				removeCookie("accessToken");
				removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
				removeCookie("__usrN__", { path: "/", maxAge: 0 });
				movePage("/");
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
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
					{userData && (
						<>
							{isEdit ? (
								<EditUserInfo
									userData={userData}
								></EditUserInfo>
							) : (
								<CurrentUserInfo
									userData={userData}
								></CurrentUserInfo>
							)}
						</>
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


				<WebButton width={140} verticalPadding={12} color="red" fontSize={16} onClick={() => setShowModal(!showModal)}>
					회원 탈퇴하기
				</WebButton>
				{showModal && (
					<Modal setShowModal={setShowModal} title="탈퇴하시겠습니까?">
						<DeleteBtnBox>
							<WebButton width={120} verticalPadding={10} color="gray2" fontSize={16} onClick={() => setShowModal(!showModal)}>
								취소
							</WebButton>
							<WebButton width={120} verticalPadding={10} color="red" fontSize={16} onClick={() => deleteUser()}>
								탈퇴
							</WebButton>
						</DeleteBtnBox>
					</Modal>
				)}
			</SettingsContainer>
		</PageContainer>
	);
};

export default SettingsComponent;
