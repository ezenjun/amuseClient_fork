import React from "react";
import { EachMenu, MenuText, SideBarBox, SideBarMenuContainer } from "./styles";
import {
	Bold24Gray,
	Regular20Black,
	Regular20Gray,
} from "../../../../components/Text/Text";
import { ReactComponent as Setting } from "../../../../assets/Icons/MypageMenu/Settings.svg";
import { ReactComponent as Favorite } from "../../../../assets/Icons/MypageMenu/Favorite.svg";
import { ReactComponent as Payment } from "../../../../assets/Icons/MypageMenu/Payment.svg";
import { ReactComponent as Review } from "../../../../assets/Icons/MypageMenu/Review.svg";
import { useLocation, useNavigate } from "react-router";
import { Common } from "../../../../styles";

const SideBarMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<SideBarMenuContainer>
			<Bold24Gray>마이페이지</Bold24Gray>
			<SideBarBox>
				<EachMenu
					onClick={() => navigate("/MyPage/Settings")}
					active={location.pathname === "/MyPage/Settings"}
				>
					<Setting
						fill={
							location.pathname === "/MyPage/Settings"
								? `${Common.colors.black}`
								: `${Common.colors.gray}`
						}
					/>
					<MenuText active={location.pathname === "/MyPage/Settings"}>
						설정
					</MenuText>
				</EachMenu>
				<EachMenu
					onClick={() => navigate("/MyPage/like")}
					active={location.pathname === "/MyPage/like"}
				>
					<Favorite
						fill={
							location.pathname === "/MyPage/like"
								? `${Common.colors.black}`
								: `${Common.colors.gray}`
						}
					/>
					<MenuText active={location.pathname === "/MyPage/like"}>
						관심 상품
					</MenuText>
				</EachMenu>
				<EachMenu
					onClick={() => navigate("/MyPage/payment-history")}
					active={location.pathname === "/MyPage/payment-history"}
				>
					<Payment
						fill={
							location.pathname === "/MyPage/payment-history"
								? `${Common.colors.black}`
								: `${Common.colors.gray}`
						}
					/>
					<MenuText
						active={location.pathname === "/MyPage/payment-history"}
					>
						결제 내역
					</MenuText>
				</EachMenu>
				<EachMenu
					onClick={() => navigate("/MyPage/review")}
					active={location.pathname === "/MyPage/review"}
				>
					<Review
						fill={
							location.pathname === "/MyPage/review"
								? `${Common.colors.black}`
								: `${Common.colors.gray}`
						}
					/>
					<MenuText active={location.pathname === "/MyPage/review"}>
						상품 리뷰
					</MenuText>
				</EachMenu>
			</SideBarBox>
		</SideBarMenuContainer>
	);
};

export default SideBarMenu;
