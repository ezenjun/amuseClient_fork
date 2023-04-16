import React, { ReactNode } from "react";
import "./MainRecommendItem.css";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className="recBox" style={{ backgroundColor, marginRight }}></div>
);

function MainRecommendItem() {
  return (
    <>
      <h2 style={{ marginTop: "3rem" }}>어뮤즈가 추천하는 여행🚙</h2>
      <div className="container">
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="0" />
      </div>
    </>
  );
}

export default MainRecommendItem;
