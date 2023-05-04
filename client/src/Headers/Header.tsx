import React, { ReactNode } from "react";
import Style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import logoimage from "../MainPage/MainImgs/amuse_logo.png";
import Concierge from "../SubPages/Concierge/Concierge";
import { Link } from "react-router-dom";
import MyPagelist from "../MyPages/MyPageList";
import MyPageMenu from "../MyPages/MyPageMenu";

function Header() {
  const movePage = useNavigate();
  const navigateToHome = () => {
    movePage("/");
  };
  const navigateToConcierge = () => {
    movePage("/Concierge");
  };
  const navigateToChildCare = () => {
    movePage("/ChildCare");
  };
  const navigateToSeniorCare = () => {
    movePage("/SeniorCare");
  };
  const navigateToOnlineTour = () => {
    movePage("/OnlineTour");
  };
  const navigateToLogIn = () => {
    movePage("/LogIn");
  };
  const navigateToSignUP = () => {
    movePage("/SignUP");
  };

  return (
    <div>
      <div className={Style["top"]}>
        <img className={Style["logo"]} src={logoimage} alt="Amuse Travel Logo" onClick={navigateToHome} />
        <div className={Style["search-box"]}>
          <input type="text" placeholder="🔍 여행 키워드를 검색해보세요!" />
          <button className={Style["searchBtn"]}>검색</button>
        </div>
        <div className={Style["whiteSquare"]}></div>
        <button className={Style["loginBtn"]} onClick={navigateToLogIn}>
          로그인
        </button>
        <button className={Style["signInBtn"]} onClick={navigateToSignUP}>
          회원가입
        </button>
        <MyPageMenu />
      </div>
      <div className={Style["menu"]}>
        <div className={Style["menu-item"]} onClick={navigateToConcierge}>
          👨🏼‍🦯 컨시어지 여행
        </div>
        <div className={Style["menu-item"]} onClick={navigateToChildCare}>
          👶🏻 아이돌봄 여행
        </div>
        <div className={Style["menu-item"]} onClick={navigateToSeniorCare}>
          👴🏼 어르신돌봄 여행
        </div>
        <div className={Style["menu-item"]} onClick={navigateToOnlineTour}>
          🖥 랜선 여행
        </div>
        <div className={Style["menu-item"]}> </div>
        <div className={Style["menu-item"]}>회사 소개</div>
      </div>
    </div>
  );
}

export default Header;
