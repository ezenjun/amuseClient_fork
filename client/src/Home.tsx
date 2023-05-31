import React, { ReactNode, useEffect, useState } from "react";
import Style from "./App.module.css";
import Header from "./Headers/Header";
import MainLists from "./MainPage/MainLists/MainLists";
import MainBanner from "./MainPage/MainBanner/MainBanner";
import MainTiles from "./MainPage/MainTiles/MainTiles";
import MainMoreAbout from "./MainPage/MainMoreAbout/MainMoreAbout";
import Footer from "./Footers/Footer";
import Fade from "./Fade";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "./atoms";
import axios from "axios";

function Home() {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

  //redirect 했을 때 token 값 받아서 localStorage에 저장하기
  useEffect(() => {
    let token: string | null = new URL(window.location.href).searchParams.get("token");
    if (token == null) {
      return;
    } else {
      console.log(token);
      localStorage.setItem("loginToken", token);
      setLoggedIn(true);
    }
  }, []);

  const [listTitle, setListTitle] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState<number[]>([]);
  // const [itemIds, setItemIds] = useState<number[]>([]);
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [titles, setTitles] = useState<string[]>([]);
  // const [startPrices, setStartPrice] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("http://ammuse.store/main-page/lists")
      .then((response) => {
        const Items = response.data.data.listItems;
        const list_title = Items.map((item: any) => item.list_title);
        setListTitle(list_title);
        const item_count = Items.map((item: any) => item.item_count);
        setItemCount(item_count);

        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("home api 연결 실패");
      });
  }, []);

  return (
    <Fade>
      <div>
        <Header />
        <div className={Style["liner"]}></div>
        <br />
        <div className={Style["App"]}>
          <MainLists />
          <MainBanner />
          <MainTiles />
          <MainMoreAbout />
        </div>
        <Footer />
      </div>
    </Fade>
  );
}

export default Home;
