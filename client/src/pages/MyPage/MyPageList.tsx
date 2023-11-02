import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./MyPageList.css";
import { useNavigate } from "react-router-dom";

export default function MyPagelist() {
	const navigate = useNavigate();
	const navigateToSettings = () => {
		navigate("./settings");
	};
	const navigateToLikes = () => {
		navigate("./likes");
	};
	const navigateToSecession = () => {
		navigate("./payment");
	};
	const navigateToOrders = () => {
		navigate("/MyPage/PaymentList");
	};
	return (
		<>
			<Box
				sx={{
					width: "100%",
					maxWidth: 270,
					bgcolor: "background.paper",
				}}
			>
				<h2 className="title">마이페이지</h2>
				<nav aria-label="main mailbox folders">
					<List>
						<ListItem disablePadding onClick={navigateToSettings}>
							<ListItemButton>
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText primary="설정" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding onClick={navigateToLikes}>
							<ListItemButton>
								<ListItemIcon>
									<FavoriteIcon />
								</ListItemIcon>
								<ListItemText primary="관심상품" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding onClick={navigateToOrders}>
							<ListItemButton>
								<ListItemIcon>
									<CreditCardIcon />
								</ListItemIcon>
								<ListItemText primary="결제 내역" />
							</ListItemButton>
						</ListItem>
					</List>
				</nav>
			</Box>
		</>
	);
}
