import React, { ReactNode } from "react";
import "../BestAndNew.css";
import { useNavigate } from "react-router-dom";

const Box = ({ marginRight }: { marginRight: string }) => (
  <div className="box" style={{ marginRight }}>
    <p className="tripTitle">여행 제목</p>
    <p className="tripCost">가격 : ~~~</p>
  </div>
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
        <Box marginRight="32px"></Box>
        <Box marginRight="32px" />
        <Box marginRight="0" />
      </div>
    </div>
  );
}

export default MainBestItem;
