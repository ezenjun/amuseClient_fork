import React, { ReactNode } from "react";
import Style from "../BestAndNewStyle.module.css";
import { useNavigate } from "react-router-dom";

const Box = ({ marginRight }: { marginRight: string }) => (
  <div className={Style["box"]} style={{ marginRight }}>
    <p className={Style["tripTitle"]}>여행 제목</p>
    <p className={Style["tripCost"]}>가격 : ~~~</p>
  </div>
);

function MainBestItem() {
  const movePage = useNavigate();
  const navigateToDetail = () => {
    movePage("/Detail");
  };

  return (
    <div>
      <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>실시간 Best 여행 상품🏞</h2>
      <div className={Style["container"]} onClick={navigateToDetail}>
        <Box marginRight="32px"></Box>
        <Box marginRight="32px" />
        <Box marginRight="0" />
      </div>
    </div>
  );
}

export default MainBestItem;
