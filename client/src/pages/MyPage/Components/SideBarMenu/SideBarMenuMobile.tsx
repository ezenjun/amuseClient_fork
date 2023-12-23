import React from "react";
import {
	EachMenuMobile,
	MenuTextMobile,
	SideBarBox,
	SideBarMenuMobileContainer,
} from "./styles";
import { Bold24Gray } from "../../../../components/Text/Text";
import { useLocation, useNavigate } from "react-router";
import { Common } from "../../../../styles";

const SideBarMenuMobile = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<SideBarMenuMobileContainer>
			<EachMenuMobile
				onClick={() => navigate("/MyPage/Settings")}
				active={location.pathname === "/MyPage/Settings"}
			>
				<MenuTextMobile
					active={location.pathname === "/MyPage/Settings"}
				>
					설정
				</MenuTextMobile>
			</EachMenuMobile>
			<EachMenuMobile
				onClick={() => navigate("/MyPage/like")}
				active={location.pathname === "/MyPage/like"}
			>
				<MenuTextMobile active={location.pathname === "/MyPage/like"}>
					관심 상품
				</MenuTextMobile>
			</EachMenuMobile>
			<EachMenuMobile
				onClick={() => navigate("/MyPage/payment-history")}
				active={location.pathname.includes("/MyPage/payment-history")}
			>
				<MenuTextMobile
					active={location.pathname.includes(
						"/MyPage/payment-history"
					)}
				>
					결제 내역
				</MenuTextMobile>
			</EachMenuMobile>
			<EachMenuMobile
				onClick={() => navigate("/MyPage/review")}
				active={location.pathname === "/MyPage/review"}
			>
				<MenuTextMobile active={location.pathname === "/MyPage/review"}>
					상품 리뷰
				</MenuTextMobile>
			</EachMenuMobile>
		</SideBarMenuMobileContainer>
	);
};

export default SideBarMenuMobile;
