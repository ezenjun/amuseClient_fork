import React, { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./MainTiles.module.css";
import SeoulImg from "../MainImgs/seoul.jpg";
import GangwonImg from "../MainImgs/gangwon.jpg";
import ChungImg from "../MainImgs/chungcheong.jpg";
import Jeonla from "../MainImgs/jeonla.jpg";
import GS from "../MainImgs/gyeongsang.jpg";
import Jeju from "../MainImgs/jeju.jpg";
import Boeing from "../MainImgs/boeing.jpg";

const Box = ({ backgroundImage, text, onClick }: { backgroundImage: string; text: string; onClick: () => void }) => (
  <div className={Style["regBox"]} onClick={onClick} style={{ backgroundImage: `url(${backgroundImage})` }}>
    <p className={Style["regionName"]}>{text}</p>
  </div>
);
const EmptyBox = ({ backgroundColor }: { backgroundColor: string }) => (
  <div className={Style["emptyBox"]} style={{ backgroundColor, margin: "auto" }}></div>
);

function MainTiles() {
  const movePage = useNavigate();
  const moveToGyeonggi = () => {
    // movePage("/toGyeonggi");
    // movePage(`/search/경기도`);
  };
  const moveToGangwon = () => {
    // movePage("/toGangwon");
  };
  const moveToChungcheong = () => {
    // movePage("/toChungcheong");
  };
  const moveToJeolla = () => {
    // movePage("/toJeolla");
  };
  const moveToGyeongsang = () => {
    // movePage("/toGyeongsang");
  };
  const moveToJeju = () => {
    // movePage("/toJeju");
  };
  const moveToOverSea = () => {
    // movePage("/toOverSea");
  };

  const [mobileHeader, setMobileHeader] = useState(0);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 700) {
      setMobileHeader(0);
    } else {
      setMobileHeader(1);
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
    <>
      {/* <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>지역 별 여행 상품📍</h2>
      {mobileHeader === 0 && ( // 넓은 화면
        <div>
          <div className={Style["container"]}>
            <Box backgroundImage={SeoulImg} text="서울 / 경기도" onClick={moveToGyeonggi} />
            <Box backgroundImage={GangwonImg} text="강원도" onClick={moveToGangwon} />
            <Box backgroundImage={ChungImg} text="충청도" onClick={moveToChungcheong} />
          </div>
          <div className={Style["container"]}>
            <Box backgroundImage={Jeonla} text="전라도" onClick={moveToJeolla} />
            <Box backgroundImage={GS} text="경상도" onClick={moveToGyeongsang} />
            <Box backgroundImage={Jeju} text="제주도" onClick={moveToJeju} />
          </div>
          <div className={Style["container"]}>
            <Box backgroundImage={Boeing} text="해외" onClick={moveToOverSea} />
            <EmptyBox backgroundColor="white" />
            <EmptyBox backgroundColor="white" />
          </div>
        </div>
      )}
      {mobileHeader === 1 && ( // 좁은 화면
        <div>
          <div className={Style["container"]}>
            <Box backgroundImage={SeoulImg} text="서울 / 경기도" onClick={moveToGyeonggi} />
            <Box backgroundImage={GangwonImg} text="강원도" onClick={moveToGangwon} />
          </div>
          <div className={Style["container"]}>
            <Box backgroundImage={ChungImg} text="충청도" onClick={moveToChungcheong} />
            <Box backgroundImage={Jeonla} text="전라도" onClick={moveToJeolla} />
          </div>
          <div className={Style["container"]}>
            <Box backgroundImage={GS} text="경상도" onClick={moveToGyeongsang} />
            <Box backgroundImage={Jeju} text="제주도" onClick={moveToJeju} />
          </div>
          <div className={Style["container"]}>
            <Box backgroundImage={Boeing} text="해외" onClick={moveToOverSea} />
            <EmptyBox backgroundColor="white" />
          </div>
        </div>
      )} */}
    </>
  );
}

export default MainTiles;
