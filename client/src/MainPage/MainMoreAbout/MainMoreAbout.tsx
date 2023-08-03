import React, { useState, useEffect } from "react";
import Style from "./MainMoreAbout.module.css";
import bcorplogo from "../MainImgs/bcorplogo.svg";
import logo01 from "../MainImgs/logo01.svg";
import logo02 from "../MainImgs/logo02.svg";
import logo03 from "../MainImgs/logo03.svg";
import logo04 from "../MainImgs/logo04.svg";
import logo05 from "../MainImgs/logo05.svg";
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
  const [isMobile, setIsMobile] = useState(0);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 700) {
      setIsMobile(0);
    } else {
      setIsMobile(1);
    }
  };
  useEffect(() => {
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>어뮤즈트래블에 대해 더 알고싶다면? 🔍</h2>
      {isMobile ? (
        <div className={Style["middle-mobile"]}>
          <div className={Style["sns-mobile"]} onClick={gotoBlog}>
            <img src={NaverIcon} alt="" />
            <h4>네이버 블로그</h4>
          </div>
          <div className={Style["sns-mobile"]} onClick={gotoInstagram}>
            <img src={InstaIcon} alt="" />
            <h4>인스타그램</h4>
          </div>
          <div className={Style["sns-mobile"]} onClick={gotoFacebook}>
            <img src={FaceIcon} alt="" />
            <h4>페이스북</h4>
          </div>
        </div>
      ) : (
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
      )}
      {/* <div style={{ clear: "left" }}></div>
      <div
        className={Style["imgContainer"]}
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
      >
        <img className={Style["logoImgs"]} src={bcorplogo} alt="Bcorp Logo" />
        <img className={Style["logoImgs"]} src={logo01} alt="Logo 01" />
        <img className={Style["logoImgs"]} src={logo02} alt="Logo 02" />
        <img className={Style["logoImgs"]} src={logo03} alt="Logo 03" />
        <img className={Style["logoImgs"]} src={logo04} alt="Logo 04" />
        <img className={Style["logoImgs"]} src={logo05} alt="Logo 05" />
      </div>
      <div style={{ clear: "left" }}></div> */}
    </div>
  );
}

export default MainMoreAbout;
