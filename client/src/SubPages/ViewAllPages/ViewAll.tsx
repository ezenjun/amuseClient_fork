import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";
import Style from "../SubPage.module.css";
import ViewAllList from "./ViewAllList";

function ViewAll() {
  return (
    <div>
      <div className={Style["App"]}>
        <Header />
      </div>
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
        모든 상품
      </h1>
      <div className={Style["App"]}>
        <ViewAllList />
      </div>
      <Footer />
    </div>
  );
}

export default ViewAll;
