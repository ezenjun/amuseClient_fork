import React, { ReactNode } from "react";
import "./MainRegionItem.css";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className="regBox" style={{ backgroundColor, marginRight }}></div>
);

function MainRegionItem() {
  return (
    <>
      <h2 style={{ marginTop: "3rem" }}>지역 별 여행 상품📍</h2>
      <div className="container">
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="0" />
      </div>
      <div className="container">
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="0" />
      </div>
      <div className="container">
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="white" marginRight="32px" />
        <Box backgroundColor="white" marginRight="0" />
      </div>
    </>
  );
}

export default MainRegionItem;
