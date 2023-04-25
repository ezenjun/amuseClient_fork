import React, { ReactNode } from "react";
import "./MainMoreAbout.css";
import bcorplogo from "../MainImgs/bcorplogo.svg";
import logo01 from "../MainImgs/logo01.svg";
import logo02 from "../MainImgs/logo02.svg";
import logo03 from "../MainImgs/logo03.svg";
import logo04 from "../MainImgs/logo04.svg";
import logo05 from "../MainImgs/logo05.svg";

function gotoBlog() {
  window.open("https://blog.naver.com/amusetravel", "_blank");
}
function gotoInstagram() {
  window.open("https://www.instagram.com/amusetravel_kor/", "_blank");
}
function gotoFacebook() {
  window.open("https://www.facebook.com/amusetravel", "_blank");
}

function MainMoreAbout() {
  return (
    <>
      <h2 style={{ marginTop: "3rem" }}>어뮤즈트래블에 대해 더 알고싶다면? 🔍</h2>
      <div className="middle">
        <h4 className="sns" onClick={gotoBlog}>
          네이버 블로그
        </h4>
        <h4 className="sns" onClick={gotoInstagram}>
          인스타그램
        </h4>
        <h4 className="sns" onClick={gotoFacebook}>
          페이스북
        </h4>
      </div>
      <div style={{ clear: "left" }}></div>
      <div className="imgContainer">
        <img className="logoImgs" src={bcorplogo} alt="Bcorp Logo" />
        <img className="logoImgs" src={logo01} alt="Logo 01" />
        <img className="logoImgs" src={logo02} alt="Logo 02" />
        <img className="logoImgs" src={logo03} alt="Logo 03" />
        <img className="logoImgs" src={logo04} alt="Logo 04" />
        <img className="logoImgs" src={logo05} alt="Logo 05" />
      </div>
      <div style={{ clear: "left" }}></div>
    </>
  );
}

export default MainMoreAbout;
