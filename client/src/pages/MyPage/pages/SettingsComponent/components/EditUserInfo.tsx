import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { UserInfo } from "../../../../../Interfaces/DataInterfaces";
import {
	EditInput,
	EditInputContainer,
	Row,
	RowKey,
	UserInfoContainer,
} from "./styles";
import {
	Regular16Black,
	Regular16Gray,
} from "../../../../../components/Text/Text";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MypageInfo } from "../../../../../Recoil/MypageAtomState";

interface UserInfoProps {
	userData: UserInfo;
}

const EditUserInfo = ({ userData }: UserInfoProps) => {
	const setUserInfo = useSetRecoilState(MypageInfo);

	const [userBirthday, setUserBirthday] = useState(userData.birthday);
	const [userEmail, setUserEmail] = useState(userData.email);
	const [userPhone, setUserPhone] = useState(userData.phoneNumber);
	const [userName, setuserName] = useState(userData.name);
	const [userLoginType, setUserLoginType] = useState(userData.loginType);

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement>,
		setter: React.Dispatch<React.SetStateAction<string>>
	) => {
		setter(event.target.value);
	};

	useEffect(() => {
		setUserInfo((prevUserInfo) => ({
			...prevUserInfo,
			birthday: userBirthday,
			email: userEmail,
			phoneNumber: userPhone,
		}));
	}, [userBirthday, userEmail, userPhone, setUserInfo]);

	return (
		<UserInfoContainer>
			<Row>
				<RowKey>
					<Regular16Gray>이름</Regular16Gray>
				</RowKey>
				<EditInputContainer>
					<EditInput
						type="text"
						disabled
						placeholder="이름"
						value={userName ? userName : ""}
					></EditInput>
				</EditInputContainer>
			</Row>
			<Row>
				<RowKey>
					<Regular16Gray>생년월일</Regular16Gray>
				</RowKey>
				<EditInputContainer>
					<EditInput
						type="text"
						disabled={
							userLoginType === "LOCAL" || userBirthday !== ""
						}
						placeholder="생년월일"
						value={userBirthday ? userBirthday : ""}
						onChange={(event) =>
							handleInputChange(event, setUserBirthday)
						}
					></EditInput>
				</EditInputContainer>
			</Row>
			<Row>
				<RowKey>
					<Regular16Gray>전화번호</Regular16Gray>
				</RowKey>
				<EditInputContainer>
					<EditInput
						type="text"
						placeholder="전화번호"
						value={userPhone ? userPhone : ""}
						onChange={(event) =>
							handleInputChange(event, setUserPhone)
						}
					></EditInput>
				</EditInputContainer>
			</Row>
			<Row>
				<RowKey>
					<Regular16Gray>이메일</Regular16Gray>
				</RowKey>
				<EditInputContainer>
					<EditInput
						type="text"
						disabled={userLoginType !== "LOCAL"}
						placeholder="이메일"
						value={userEmail ? userEmail : ""}
						onChange={(event) =>
							handleInputChange(event, setUserEmail)
						}
					></EditInput>
				</EditInputContainer>
			</Row>
		</UserInfoContainer>
	);
};

export default EditUserInfo;
