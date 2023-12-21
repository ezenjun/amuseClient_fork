import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ReactComponent as Review } from "../../assets/Icons/MypageMenu/Review.svg";

import "./MyPageMenu.css";
import * as S from "../../components/Header/Components/Login/style";
import { Common } from "../../styles";

export default function MyPageMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const navigate = useNavigate();
	const navigateToSettings = () => {
		navigate("/MyPage/Settings");
		setAnchorEl(null);
	};
	const navigateToLikes = () => {
		navigate("/MyPage/like");
		setAnchorEl(null);
	};
	const navigateToNotifications = () => {
		navigate("/MyPage/Notifications");
		setAnchorEl(null);
	};

	const navigateToOrders = () => {
		navigate("/MyPage/PaymentList");
		setAnchorEl(null);
	};

	return (
		<>
			<S.MyPage onClick={handleClick}>마이페이지</S.MyPage>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={navigateToSettings}>
					<SettingsIcon />
					<div className="mypage_category_item">설정</div>
				</MenuItem>
				<MenuItem onClick={navigateToLikes}>
					<FavoriteIcon />
					<div className="mypage_category_item">관심상품</div>
				</MenuItem>
				<MenuItem onClick={() => navigate("/MyPage/payment-history")}>
					<CreditCardIcon />
					<div className="mypage_category_item">결제 내역</div>
				</MenuItem>
				<MenuItem onClick={() => navigate("/MyPage/review")}>
					<Review fill={`${Common.colors.black}`} />
					<div className="mypage_category_item">상품 리뷰</div>
				</MenuItem>
			</Menu>
		</>
	);
}
