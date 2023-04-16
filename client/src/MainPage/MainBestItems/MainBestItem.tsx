import React, { ReactNode } from "react";
import "./MainBestItem.css";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className="box" style={{ backgroundColor, marginRight }}></div>
);

function MainBestItem() {
  return (
    <div>
      <h2 style={{ marginTop: "1rem" }}>실시간 Best 여행 상품🏞</h2>
      <div className="container">
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="0" />
      </div>
    </div>
  );
}

export default MainBestItem;
