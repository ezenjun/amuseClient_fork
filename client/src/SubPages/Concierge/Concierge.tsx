import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";
import "../SubPage.css";
import ConciergeTitle from "../SubtitleImgs/ConciergeTitle.jpg";

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
        <img className="mainPicture" src={ConciergeTitle} alt="Concierge Title img" />
        <h2 className="subTitle">누구나 즐겁게 떠나는 여행</h2>
        <h3 className="subContent">장애 유형별 맞춤형 일정으로 진행되는 풀컨시어지 여행</h3>
      </div>
      <div className="App">
        <h2 style={{ marginTop: "2rem" }}>컨시어지 여행 Best 상품🏞</h2>
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
