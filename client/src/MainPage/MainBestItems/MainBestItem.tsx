import React, { ReactNode } from "react";
import "./MainBestItem.css";
import { useNavigate } from "react-router-dom";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className="box" style={{ backgroundColor, marginRight }}></div>
);

function MainBestItem() {
  const movePage = useNavigate();
  const navigateToDetail = () => {
    movePage("/Detail");
  };
  
  return (
    <div>
      <h2 style={{ marginTop: "1rem" }}>실시간 Best 여행 상품🏞</h2>
      <div className="container" onClick={navigateToDetail}>
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="32px" />
        <Box backgroundColor="lightgray" marginRight="0" />
      </div>
    </div>
  );
}

export default MainBestItem;
