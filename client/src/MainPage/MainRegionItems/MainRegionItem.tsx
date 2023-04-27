import React, { ReactNode } from "react";
import "./MainRegionItem.css";
import SeoulImg from "../MainImgs/seoul.jpg";
import GangwonImg from "../MainImgs/gangwon.jpg";
import ChungImg from "../MainImgs/chungcheong.jpg";
import Jeonla from "../MainImgs/jeonla.jpg";
import GS from "../MainImgs/gyeongsang.jpg";
import Jeju from "../MainImgs/jeju.jpg";
import Boeing from "../MainImgs/boeing.jpg";

const Box = ({ backgroundImage, text }: { backgroundImage: string; text: string }) => (
  <div className="regBox" style={{ margin: "auto", backgroundImage: `url(${backgroundImage})` }}>
    <p className="regionName">{text}</p>
  </div>
);
const EmptyBox = ({ backgroundColor }: { backgroundColor: string }) => (
  <div className="emptyBox" style={{ backgroundColor, margin: "auto" }}></div>
);

function MainRegionItem() {
  return (
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>지역 별 여행 상품📍</h2>
      <div className="container">
        <Box backgroundImage={SeoulImg} text="서울 / 경기도" />
        <Box backgroundImage={GangwonImg} text="강원도" />
        <Box backgroundImage={ChungImg} text="충청도" />
      </div>
      <div className="container">
        <Box backgroundImage={Jeonla} text="전라도" />
        <Box backgroundImage={GS} text="경상도" />
        <Box backgroundImage={Jeju} text="제주도" />
      </div>
      <div className="container">
        <Box backgroundImage={Boeing} text="해외" />
        <EmptyBox backgroundColor="white" />
        <EmptyBox backgroundColor="white" />
      </div>
    </>
  );
}

export default MainRegionItem;
