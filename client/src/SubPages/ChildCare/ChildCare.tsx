import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";
import Style from "../SubPage.module.css";
import ChildTitle from "../SubtitleImgs/ChildTitle.jpg";
import Fade from "../../Fade";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className={Style["box"]} style={{ backgroundColor, marginRight }}>
    <p className={Style["tripTitle"]}>여행 제목</p>
    <p className={Style["tripCost"]}>가격 : ~~~</p>
  </div>
);

function Concierge() {
  const movePage = useNavigate();
  const moveToViewAll = () => {
    movePage("/ViewAll");
  };
  return (
    <div>
      <div className={Style["App"]}>
        <Header />
      </div>
      <div className={Style["liner"]}></div>
      {/* <br /> */}
      <Fade>
        <div className={Style["subTitleContainer"]}>
          <img className={Style["mainPicture.image"]} src={ChildTitle} alt="Child Title img" />
          <h2 className={Style["subTitle"]}>아이와 함께하는 돌봄여행</h2>
          <h3 className={Style["subContent"]}>어린이/어른 코스로 구성된 어린이 동반 가족 여행</h3>
        </div>

        <div className={Style["App"]}>
          <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>아이돌봄 여행 Best 상품🏞</h2>
          <div className={Style["container"]}>
            <Box backgroundColor="lightgray" marginRight="57px" />
            <Box backgroundColor="lightgray" marginRight="0" />
          </div>
          <div className={Style["allBtn"]} onClick={moveToViewAll}>
            상품 모두보기
          </div>
        </div>
        <Footer />
      </Fade>
    </div>
  );
}

export default Concierge;
