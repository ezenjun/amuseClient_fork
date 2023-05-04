import React, { ReactNode } from "react";
import Style from "../BestAndNewStyle.module.css";

const Box = ({ marginRight }: { marginRight: string }) => (
  <div className={Style["box"]} style={{ marginRight }}>
    <p className={Style["tripTitle"]}>여행 제목</p>
    <p className={Style["tripCost"]}>가격 : ~~~</p>
  </div>
);

function MainNewItem() {
  return (
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>어뮤즈의 최신 여행 패키지🚙</h2>
      <div className={Style["container"]}>
        <Box marginRight="32px" />
        <Box marginRight="32px" />
        <Box marginRight="0" />
      </div>
    </>
  );
}

export default MainNewItem;
