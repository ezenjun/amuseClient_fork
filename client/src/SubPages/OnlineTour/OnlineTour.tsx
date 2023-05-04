import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";
import Style from "../SubPage.module.css";
import OnlineTourTitle from "../SubtitleImgs/OnlineTourTitle.jpg";
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
          <img className={Style["mainPicture.img"]} src={OnlineTourTitle} alt="OnlineTour Title img" />
          <h2 className={Style["subTitle"]}>랜선으로 떠나는 국내 체험 여행</h2>
          <h3 className={Style["subContent"]}>랜선으로 진행하는 국내 체험 여행</h3>
        </div>

        <div className={Style["App"]}>
          <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>랜선 여행 Best 상품🏞</h2>
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
