import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import Style from "./SubPage.module.css";
import ChildTitle from "./SubtitleImgs/ChildTitle.jpg";
import Fade from "../Fade";

const Box = ({ backgroundColor, marginRight }: { backgroundColor: string; marginRight: string }) => (
  <div className={Style["box"]} style={{ backgroundColor, marginRight }}>
    <p className={Style["tripTitle"]}>여행 제목</p>
    <p className={Style["tripCost"]}>가격 : ~~~</p>
  </div>
);

function SubPageComp() {
  const movePage = useNavigate();
  const moveToViewAll = () => {
    movePage("/ViewAll");
  };

  interface CategoryData {
    categoryId: string;
    categoryName: string;
    categoryImg: string;
    mainDescription: string;
    subDescription: string;
  }

  const { apiKey } = useParams() as { apiKey: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  //   console.log("apiKey = " + apiKey);
  useEffect(() => {
    axios
      .get(`https://ammuse.store/main/category`)
      .then((response) => {
        const hashtagAll = response.data.data.categories;

        let matchedIndex = -1;
        for (let i = 0; i < hashtagAll.length; i++) {
          if (hashtagAll[i].categoryName === apiKey) {
            matchedIndex = i;
            // console.log("idx = " + matchedIndex);
            break;
          }
        }
        if (matchedIndex !== -1) {
          const matchedCategory = hashtagAll[matchedIndex];
          setCategoryData(matchedCategory);
        }
      })
      .catch((error) => {
        console.log("subpage 연결 실패");
      });
  }, [apiKey]);

  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  return (
    <div>
      {categoryData ? (
        <div>
          {/* <h1>{categoryData.categoryId}</h1> */}
          <Header />
          <div className={Style["liner"]}></div>
          {/* <br /> */}
          <Fade>
            <div className={Style["subTitleContainer"]}>
              <img
                className={Style["mainPicture.image"]}
                src={categoryData.categoryImg ? categoryData.categoryImg : ChildTitle}
                alt="Title img"
              />
              <h2 className={Style["subTitle"]}>{categoryData.mainDescription}</h2>
              <h3 className={Style["subContent"]}>{categoryData.subDescription}</h3>
            </div>

            <div className={Style["App"]}>
              <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>{categoryData.categoryName} 여행 Best 상품🏞</h2>
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
      ) : (
        <h3 style={{ margin: "1rem" }}>존재하지 않는 페이지입니다.</h3>
      )}
    </div>
  );
}

export default SubPageComp;
