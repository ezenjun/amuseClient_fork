import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyPagelist from "./MyPageList";
import Settings from "./MyPage/Settings/Settings";
import Likes from "./MyPage/Likes";
import Notifications from "./MyPage/Notifications";
import Inquiries from "./MyPage/Inquiries";
import Orders from "./MyPage/Orders";
import Quotes from "./MyPage/Quotes";
import Bills from "./MyPage/Bills";
import "./MyPage.css";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../atoms";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const { category } = useParams();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      alert("아직 로그인하지 않았습니다.");
      navigate("/login");
    }
  }, []);

  const handleCategory = (): JSX.Element | undefined => {
    switch (category) {
      case "Settings":
        return <Settings />;
        break;
      case "Likes":
        return <Likes />;
        break;
      case "Notifications":
        return <Notifications />;
        break;
      // case 'Inquiries':
      //     return <Inquiries />;
      //     break;
      case "Orders":
        return <Orders />;
        break;
      // case 'Quotes':
      //     return <Quotes />;
      //     break;
      // case 'Bills':
      //     return <Bills />;
      //     break;
    }
  };

  return (
    <>
      <div className="myPage">
        <MyPagelist />
        <div className="myPage_box">{handleCategory()}</div>
      </div>
    </>
  );
}
