import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./MainRegionItem.css";
import SeoulImg from "../MainImgs/seoul.jpg";
import GangwonImg from "../MainImgs/gangwon.jpg";
import ChungImg from "../MainImgs/chungcheong.jpg";
import Jeonla from "../MainImgs/jeonla.jpg";
import GS from "../MainImgs/gyeongsang.jpg";
import Jeju from "../MainImgs/jeju.jpg";
import Boeing from "../MainImgs/boeing.jpg";

const Box = ({ backgroundImage, text, onClick }: { backgroundImage: string; text: string; onClick: () => void }) => (
  <div className="regBox" onClick={onClick} style={{ margin: "auto", backgroundImage: `url(${backgroundImage})` }}>
    <p className="regionName">{text}</p>
  </div>
);
const EmptyBox = ({ backgroundColor }: { backgroundColor: string }) => (
  <div className="emptyBox" style={{ backgroundColor, margin: "auto" }}></div>
);

function MainRegionItem() {
  const movePage = useNavigate();
  const moveToGyeonggi = () => {
    movePage("/toGyeonggi");
  };
  const moveToGangwon = () => {
    movePage("/toGangwon");
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

  return (
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>지역 별 여행 상품📍</h2>
      <div className="container">
        <Box backgroundImage={SeoulImg} text="서울 / 경기도" onClick={moveToGyeonggi} />
        <Box backgroundImage={GangwonImg} text="강원도" onClick={moveToGangwon} />
        <Box backgroundImage={ChungImg} text="충청도" onClick={moveToChungcheong} />
      </div>
      <div className="container">
        <Box backgroundImage={Jeonla} text="전라도" onClick={moveToJeolla} />
        <Box backgroundImage={GS} text="경상도" onClick={moveToGyeongsang} />
        <Box backgroundImage={Jeju} text="제주도" onClick={moveToJeju} />
      </div>
      <div className="container">
        <Box backgroundImage={Boeing} text="해외" onClick={moveToOverSea} />
        <EmptyBox backgroundColor="white" />
        <EmptyBox backgroundColor="white" />
      </div>
    </>
  );
}

export default MainRegionItem;
