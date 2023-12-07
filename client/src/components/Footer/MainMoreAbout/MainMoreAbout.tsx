import React, { useState, useEffect } from "react";
import Style from "./MainMoreAbout.module.css";
import NaverIcon from "./naver-icon.png";
import InstaIcon from "./instagram-icon.png";
import FaceIcon from "./facebook-icon.png";

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
    <div className={Style["aboutBody"]}>
      <h2>어뮤즈트래블에 대해 더 알고싶다면? 🔍</h2>
      <div className={Style["middle"]}>
        <div className={Style["sns"]} onClick={gotoBlog}>
          <img src={NaverIcon} alt="" />
          <h4>네이버 블로그</h4>
        </div>
        <div className={Style["sns"]} onClick={gotoInstagram}>
          <img src={InstaIcon} alt="" />
          <h4>인스타그램</h4>
        </div>
        <div className={Style["sns"]} onClick={gotoFacebook}>
          <img src={FaceIcon} alt="" />
          <h4>페이스북</h4>
        </div>
      </div>
    </div>
  );
}

export default MainMoreAbout;
