import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
import "./ViewAllList.css";
import { useNavigate } from "react-router-dom";
import { CategoryMenuProps } from "../../Interfaces/PropsInterfaces";

export default function ViewAllList() {
  const navigate = useNavigate();
  const navigateToHear = () => {
    navigate("./");
  };
  const [hashtag, setHashtag] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const hashtagAll = response.data.data.categories;
        const categoryNames = hashtagAll.map((id: any) => id.categoryName);
        setHashtag(categoryNames);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("해시태그 연결 실패");
      });
  }, []);

  const CategoryMenu: React.FC<CategoryMenuProps> = ({ hashtagName, handleClick }) => (
    <ListItem disablePadding onClick={handleClick}>
      <ListItemButton>
        <ListItemText primary={hashtagName} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 240, bgcolor: "background.paper" }}>
        <h2 className="title" style={{ marginTop: "2rem" }}>
          검색 조건
        </h2>
        <nav aria-label="main mailbox folders">
          <List className="listbox">
            {hashtag.map((hashtagName: string, index: number) => (
              <CategoryMenu key={index} hashtagName={hashtagName} handleClick={navigateToHear} />
            ))}
            {/* <ListItem disablePadding onClick={navigateToHear}>
              <ListItemButton>
                <ListItemText primary="카테고리1" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={navigateToHear}>
              <ListItemButton>
                <ListItemText primary="카테고리2" />
              </ListItemButton>
            </ListItem> */}
          </List>
        </nav>
      </Box>
    </>
  );
}
