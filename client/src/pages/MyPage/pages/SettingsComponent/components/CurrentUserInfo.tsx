import React, { useEffect, useState } from "react";
import { UserInfo } from "../../../../../Interfaces/DataInterfaces";
import { useCookies } from "react-cookie";
import axios from "axios";
import GrayBox from "../../../../../components/Box/GrayBox";
import {
	Regular16Black,
	Regular16Gray,
	Regular20Black,
} from "../../../../../components/Text/Text";
import {
	Left,
	Row,
	RowKey,
	SettingContainer,
	UserInfoContainer,
} from "./styles";
import { WebButton } from "../../../../../components/Button/WebButton";

const CurrentUserInfo = () => {
	const [cookies] = useCookies(["__jwtkid__"]);
	const [userData, setUserData] = useState<UserInfo>();
	const [isEdit, setIsEdit] = useState(false);
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
		<UserInfoContainer>
			<Row>
				<RowKey>
					<Regular16Gray>이름</Regular16Gray>
				</RowKey>
				<Regular16Black>{userData?.name}</Regular16Black>
			</Row>
			<Row>
				<RowKey>
					<Regular16Gray>생년월일</Regular16Gray>
				</RowKey>
				<Regular16Black>
					{userData?.birthday.replaceAll("-", ". ")}
				</Regular16Black>
			</Row>
			<Row>
				<RowKey>
					<Regular16Gray>전화번호</Regular16Gray>
				</RowKey>
				<Regular16Black>
					{userData?.phoneNumber ? userData?.phoneNumber : "미등록"}
				</Regular16Black>
			</Row>
			<Row>
				<RowKey>
					<Regular16Gray>이메일</Regular16Gray>
				</RowKey>
				<Regular16Black>{userData?.email}</Regular16Black>
			</Row>
		</UserInfoContainer>
	);
};

export default CurrentUserInfo;
