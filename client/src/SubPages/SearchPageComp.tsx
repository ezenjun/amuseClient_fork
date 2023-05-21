import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import Style from "./SubPage.module.css";

function SearchPageComp() {
  const { apiKey } = useParams() as { apiKey: string };

  return (
    <div>
      <Header />
      <div className={Style["liner"]}></div>
      {/* <br /> */}

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
          backgroundColor: "lightblue",
          margin: "0",
        }}
      >
        "{apiKey}" 검색 결과
      </h1>
      <div className={Style["App"]}></div>
      <Footer />
    </div>
  );
}

export default SearchPageComp;
