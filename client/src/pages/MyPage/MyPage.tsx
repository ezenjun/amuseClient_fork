import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../atoms";
import { useNavigate } from "react-router-dom";
import MainComponent from "../../MainComponent";
import { MyPageContainer } from "./styles";
import SideBarMenu from "./Components/SideBarMenu/SideBarMenu";
import SideBarMenuMobile from "./Components/SideBarMenu/SideBarMenuMobile";

export default function MyPage() {
	const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
	const navigate = useNavigate();
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [window.innerWidth, screenWidth]);

	useEffect(() => {
		if (!loggedIn) {
			alert("아직 로그인하지 않았습니다.");
			navigate("/login");
		}
	}, []);

	return (
		<MainComponent>
			<MyPageContainer>
				{screenWidth > 768 && <SideBarMenu />}
				{screenWidth < 768 && <SideBarMenuMobile />}
				<Outlet />
			</MyPageContainer>
		</MainComponent>
	);
}
