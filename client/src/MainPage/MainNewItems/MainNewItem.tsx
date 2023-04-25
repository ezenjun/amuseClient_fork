import React, { ReactNode } from "react";
import "../BestAndNew.css";

const Box = ({ marginRight }: { marginRight: string }) => (
  <div className="box" style={{ marginRight }}>
    <p className="tripTitle">여행 제목</p>
    <p className="tripCost">가격 : ~~~</p>
  </div>
);

function MainNewItem() {
  return (
    <>
      <h2 style={{ marginTop: "3rem" }}>어뮤즈의 최신 여행 패키지🚙</h2>
      <div className="container">
        <Box marginRight="32px" />
        <Box marginRight="32px" />
        <Box marginRight="0" />
      </div>
    </>
  );
}

export default MainNewItem;
