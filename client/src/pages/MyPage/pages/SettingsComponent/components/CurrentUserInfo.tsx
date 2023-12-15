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
import { Row, RowKey, UserInfoContainer } from "./styles";

interface CurrentUserInfoProps {
	userData: UserInfo;
}

const CurrentUserInfo = ({ userData }: CurrentUserInfoProps) => {
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
