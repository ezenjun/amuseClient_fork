import React, { ReactNode, useEffect } from "react";
import Style from "./App.module.css";
import Header from "./Headers/Header";
import MainBestItem from "./MainPage/MainBestItems/MainBestItem";
import MainNewItem from "./MainPage/MainNewItems/MainNewItem";
import MainNews from "./MainPage/MainNews/MainNews";
import MainRegionItem from "./MainPage/MainRegionItems/MainRegionItem";
import MainMoreAbout from "./MainPage/MainMoreAbout/MainMoreAbout";
import Footer from "./Footers/Footer";
import Fade from "./Fade";
import { useRecoilState } from 'recoil';
import { isLoggedIn } from './atoms';

function Home() {
  
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

  //redirect 했을 때 token 값 받아서 localStorage에 저장하기
  useEffect(() => {
    let token:string | null = new URL(window.location.href).searchParams.get('token');
    if(token == null) {
      return;
    }
    else {
      console.log(token);
      localStorage.setItem("loginToken", token);
      setLoggedIn(true);
    }
    
  }, [])
  

  return (
    <Fade>
      <div>
        <Header />
        <div className={Style["liner"]}></div>
        <br />
        <div className={Style["App"]}>
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
