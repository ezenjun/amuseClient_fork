import React, { ReactNode } from "react";
import "./MainRegionItem.css";

const Box = ({ backgroundColor, text }: { backgroundColor: string; text: string }) => (
  <div className="regBox" style={{ backgroundColor, margin: "auto" }}>
    <h2 className="regionName">{text}</h2>
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
        <Box backgroundColor="lightgray" text="서울/경기도" />
        <Box backgroundColor="lightgray" text="강원도" />
        <Box backgroundColor="lightgray" text="충청도" />
      </div>
      <div className="container">
        <Box backgroundColor="lightgray" text="전라도" />
        <Box backgroundColor="lightgray" text="경상도" />
        <Box backgroundColor="lightgray" text="제주도" />
      </div>
      <div className="container">
        <Box backgroundColor="lightgray" text="해외" />
        <EmptyBox backgroundColor="white" />
        <EmptyBox backgroundColor="white" />
      </div>
    </>
  );
}

export default MainRegionItem;
