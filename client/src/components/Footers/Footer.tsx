import React, { ReactNode } from "react";
import Style from "./Footer.module.css";
import MainMoreAbout from "../../pages/MainPage/MainMoreAbout/MainMoreAbout";

function Footer() {
  return (
    <div className={Style["footer"]}>
      <div className={Style["bottom"]}>
        <MainMoreAbout />
        <div className={Style["bottom_text"]}>
          고객센터
          <span style={{ color: "#e5003d" }}>&nbsp;02-719-6811&nbsp;</span>
          평일 오전9시 ~ 오후6시
          <br />
          (점심시간: 오후12시 ~ 오후1시)
          <div className={Style["smallText"]}>
            <br />
            (주) 어뮤즈 | 어뮤즈트래블 <br />
            대표 : 오서연 <br />
            주소 : 서울시 중구 청계천로 40 한국관광공사 서울센터 <br />
            사업자등록번호 : 707-86-00503 <br />
            관광사업등록번호 : 제 2019-000091호 <br />
            통신판매업신고번호 : 제 2019-서울마포-2624호 <br />
            전화 : 02-719-6811~5 / 이메일 : info@amusetravel.com <br />
            개인정보관리책임 : 신우주
            <div className={Style["docsBtn"]}>
              <span>이용약관&nbsp;</span>
              <span>개인정보취급정책</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
