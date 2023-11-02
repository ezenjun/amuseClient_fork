// import React, { ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Style from "../SubPage.module.css";
import ViewAllList from "./ViewAllList";
import MainComponent from "../../../MainComponent";

function ViewAll() {
  return (
    <MainComponent>
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
        모든 상품
      </h1>
      <div className={Style["App"]}>
        <ViewAllList />
      </div>
      <Footer />
    </MainComponent>
  );
}

export default ViewAll;
