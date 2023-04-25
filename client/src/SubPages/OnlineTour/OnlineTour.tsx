import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";
import "../SubPage.css";
import OnlineTourTitle from "../SubtitleImgs/OnlineTourTitle.jpg";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className="box" style={{ backgroundColor, marginRight }}>
    <p className="tripTitle">여행 제목</p>
    <p className="tripCost">가격 : ~~~</p>
  </div>
);

function Concierge() {
  const movePage = useNavigate();
  const moveToViewAll = () => {
    movePage("/ViewAll");
  };
  return (
    <div>
      <div className="App">
        <Header />
      </div>
      <div className="liner"></div>
      {/* <br /> */}
      <div className="subTitleContainer">
        <img className="mainPicture" src={OnlineTourTitle} alt="OnlineTour Title img" />
        <h2 className="subTitle">랜선으로 떠나는 국내 체험 여행</h2>
        <h3 className="subContent">랜선으로 진행하는 국내 체험 여행</h3>
      </div>

      <div className="App">
        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>랜선 여행 Best 상품🏞</h2>
        <div className="container">
          <Box backgroundColor="lightgray" marginRight="57px" />
          <Box backgroundColor="lightgray" marginRight="0" />
        </div>
        <div className="allBtn" onClick={moveToViewAll}>
          상품 모두보기
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Concierge;
