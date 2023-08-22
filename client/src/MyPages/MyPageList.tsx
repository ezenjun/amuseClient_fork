import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import "./MyPageList.css"
import { useNavigate } from 'react-router-dom';

export default function MyPagelist() {
    const navigate = useNavigate();
    const navigateToSettings = () => {
      navigate("/MyPage/Settings");
    };
    const navigateToLikes = () => {
      navigate("/MyPage/Likes");
    };
    const navigateToSecession = () => {
      navigate("/MyPage/Likes");
    };
    const navigateToNotifications = () => {
      navigate("/MyPage/Notifications");
    };
    
    // const navigateToInquiries = () => {
    //   navigate("/MyPage/Inquiries");
    // };
    const navigateToOrders = () => {
      navigate("/MyPage/Orders");
    };
    // const navigateToQuotes = () => {
    //   navigate("/MyPage/Quotes");
    // };
    // const navigateToBills = () => {
    //   navigate("/MyPage/Bills");
    // };
  return (
    <>
    <Box sx={{ width: '100%', maxWidth: 270, bgcolor: 'background.paper' }}>
      <h2 className='title'>마이페이지</h2>
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
          {/* <ListItem disablePadding onClick={navigateToSecession}>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="회원탈퇴" />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem disablePadding onClick={navigateToNotifications}>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="알림" />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem disablePadding onClick={navigateToInquiries}>
            <ListItemButton>
              <ListItemIcon>
                <RoomServiceIcon />
              </ListItemIcon>
              <ListItemText primary="문의" />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem disablePadding onClick={navigateToOrders}>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="주문상품" />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem disablePadding onClick={navigateToQuotes}>
            <ListItemButton>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="상품견적" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={navigateToBills}>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="맞춤견적" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
    </Box>
    </>
  );
}