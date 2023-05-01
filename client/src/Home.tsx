import React, { ReactNode } from "react";
import "./App.css";
import Header from "./Headers/Header";
import MainBestItem from "./MainPage/MainBestItems/MainBestItem";
import MainNewItem from "./MainPage/MainNewItems/MainNewItem";
import MainNews from "./MainPage/MainNews/MainNews";
import MainRegionItem from "./MainPage/MainRegionItems/MainRegionItem";
import MainMoreAbout from "./MainPage/MainMoreAbout/MainMoreAbout";
import Footer from "./Footers/Footer";
import Fade from "./Fade";

function Home() {
  return (
    <Fade>
      <div>
        <div className="App">
          <Header />
        </div>
        <div className="liner"></div>
        <br />
        <div className="App">
          <MainBestItem />
          <MainNewItem />
          <MainNews />
          <MainRegionItem />
          <MainMoreAbout />
        </div>
        <Footer />
      </div>
    </Fade>
  );
}

export default Home;
