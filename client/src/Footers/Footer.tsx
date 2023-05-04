import React, { ReactNode } from "react";
import Style from "./Footer.module.css";

function Footer() {
  return (
    <div className={Style["footer"]}>
      <div className={Style["footer_text"]}>
        <p>어뮤즈트래블 협력업체 및 기관</p>
      </div>
      <div className={Style["bottom"]}>
        <p className={Style["bottom_text"]}>
          고객센터 02-719-6811 평일 오전9시 ~ 오후6시
          <br />
          (점심시간: 오후12시 ~ 오후1시)
          <br />
          <br />
          <p className={Style["smallText"]}>
            (주) 어뮤즈 | 어뮤즈트래블 <br />
            대표 : 오서연 <br />
            주소 : 서울시 중구 청계천로 40 한국관광공사 서울센터 / 사업자등록번호 : 707-86-00503 <br />
            관광사업등록번호 : 제 2019-000091호 / 통신판매업신고번호 : 제 2019-서울마포-2624호 <br />
            전화 : 02-719-6811~5 / 이메일 : info@amusetravel.com <br />
            개인정보관리책임 : 신우주
          </p>
        </p>
      </div>
    </div>
  );
}

export default Footer;
