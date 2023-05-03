import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";

function GangwonPage() {
  return (
    <div>
      <div className="App">
        <Header />
      </div>
      <div className="liner"></div>
      {/* <br /> */}
      <h1 style={{ marginLeft: "5rem" }}>강원도</h1>
      <Footer />
    </div>
  );
}

export default GangwonPage;
