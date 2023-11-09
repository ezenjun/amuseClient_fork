import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MyPagelist from "./MyPageList";

import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../atoms";
import { useNavigate } from "react-router-dom";
import MainComponent from "../../MainComponent";
import { MyPageContainer } from "./styles";

export default function MyPage() {
	const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedIn) {
			alert("아직 로그인하지 않았습니다.");
			navigate("/login");
		}
	}, []);

	return (
		<MainComponent>
			<MyPageContainer>
				<MyPagelist />
				<Outlet />
			</MyPageContainer>
		</MainComponent>
	);
}
