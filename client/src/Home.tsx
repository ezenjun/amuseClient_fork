import React, { ReactNode, useEffect, useState } from "react";
import Style from "./App.module.css";
import MainLists from "./MainPage/MainLists/MainLists";
import MainBanner from "./MainPage/MainBanner/MainBanner";
import MainTiles from "./MainPage/MainTiles/MainTiles";
import MainMoreAbout from "./MainPage/MainMoreAbout/MainMoreAbout";
import Fade from "./Fade";
import { useRecoilState } from "recoil";
import { isLoggedIn, isManager } from "./atoms";
import axios from "axios";
import { redirect, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";

function Home() {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [manager, setManager] = useRecoilState(isManager);
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtk__"]);

  const location = useLocation();

  useEffect(()=>{
    const token = cookies["__jwtk__"]
    if(token){
      checkIsManager(token);
    }
  },[])

  const checkIsManager = (token:String) => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/admin/search/users?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 1000) {
          setManager(true);
        }
      });
  };

  const [listTitle, setListTitle] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState<number[]>([]);
  // const [itemIds, setItemIds] = useState<number[]>([]);
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [titles, setTitles] = useState<string[]>([]);
  // const [startPrices, setStartPrice] = useState<number[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("https://amuseapi.wheelgo.net/main-page/lists")
  //     .then((response) => {
  //       const Items = response.data.data.listItems;
  //       const list_title = Items.map((item: any) => item.list_title);
  //       setListTitle(list_title);
  //       const item_count = Items.map((item: any) => item.item_count);
  //       setItemCount(item_count);

  //       console.log(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log("home api 연결 실패");
  //     });
  // }, []);

  return (
    <Fade>
      <div>
        {/* <Header /> */}
        <MainBanner />
        <div className={Style["App"]}>
          <MainLists />
          <MainTiles />
          <MainMoreAbout />
        </div>
      </div>
    </Fade>
  );
}

export default Home;
