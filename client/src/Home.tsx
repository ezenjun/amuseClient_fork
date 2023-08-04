import React, { ReactNode, useEffect, useState } from "react";
import _ from "lodash";
// import AppStyle from "./App.module.css";
import Style from "./SubPages/SubPage.module.css";
// import MainLists from "./MainPage/MainLists/MainLists";
// import MainBanner from "./MainPage/MainBanner/MainBanner";
// import MainTiles from "./MainPage/MainTiles/MainTiles";
// import MainMoreAbout from "./MainPage/MainMoreAbout/MainMoreAbout";
import Fade from "./Fade";
import { useRecoilState } from "recoil";
import { isLoggedIn, isManager } from "./atoms";
import axios from "axios";
import { redirect, useLocation } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { CategoryData } from "./Interfaces/DataInterfaces"
import { TileProps,ListProps,BannerProps } from "./Interfaces/PropsInterfaces"
import { useCategoryContext } from "./Headers/Contexts/CategoryContext";
import ChildTitle from "./SubPages/SubtitleImgs/ChildTitle.jpg";
import SubLists from "./SubPages/SubLists";
import SubBanners from "./SubPages/SubBanners";
import SubTiles from "./SubPages/SubTiles";


function Home() {

  const { categoriesInfo } = useCategoryContext();
  const [apiKeyNumber,setApiKeyNumber] = useState(0)
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

  // const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // const [manager, setManager] = useRecoilState(isManager);
  // const [cookies, setCookie, removeCookie] = useCookies(["__jwtk__"]);

  const location = useLocation();

  useEffect(() => {
    let infoIndex = _.findIndex(categoriesInfo,{categoryName: 'home'})
    if(categoriesInfo?.length){
      const info = categoriesInfo[infoIndex]
      console.log(info)
      setApiKeyNumber(info.categoryId)
    }
  }, [categoriesInfo]);

  

  useEffect(() => {
    console.log("do")
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const hashtagAll = response.data.data.categories;

        let matchedIndex = -1;
        for (let i = 0; i < hashtagAll.length; i++) {
          if (hashtagAll[i].categoryId === apiKeyNumber) {
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
  }, [apiKeyNumber]);

  const [comTypes, setComTypes] = useState<[]>([]);
  const [Items, setItems] = useState<[]>([]);
  const [bannerContent, setBannerContent] = useState<string[]>([]);
  const [bannerPCUrl, setBannerPCUrl] = useState<string[]>([]);
  const [ItemTitle, setItemTitle] = useState<string[]>([]);
  const [ItemPrice, setItemPrice] = useState<number[]>([]);
  const [ItemImageUrl, setItemImageUrl] = useState<string[]>([]);

  useEffect(() => {
    fetchPageData(apiKeyNumber);
  }, [apiKeyNumber]);

  const fetchPageData = (apiKeyNumber: number) => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category/${apiKeyNumber}/page`)
      .then((response) => {
        const ComponentInfos = response.data.data.pageComponentInfos;
        const items = ComponentInfos.map((item: any) => item);
        setItems(items);
        console.log(items);
        const types = items.map((item: any) => item.type);
        setComTypes(types);
        console.log("컴포넌트", types);
      })
      .catch((error) => {
        console.log("subpage 컴포넌트 연결 실패");
      });
  };

  const renderedComponents = comTypes.map((type, index) => {
    console.log(type);
    if (type === "리스트") {
      const listItem: ListProps = Items[index];
      // console.log("subpage list ", listItem.itemInfos);
      return <SubLists key={index} title={listItem.title} itemInfos={listItem.itemInfos} />;
    } else if (type === "타일") {
      const tileItem: TileProps = Items[index];
      return <SubTiles key={index} />;
    } else if (type === "배너") {
      const bannerItem: BannerProps = Items[index];
      return (
        <SubBanners
          key={index}
          title={bannerItem.title}
          content={bannerItem.content}
          bannerUrl={bannerItem.pcBannerUrl}
          bannerLink={bannerItem.pcBannerLink}
        />
      );
    }
    return null;
  });

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
        {/* <Header />
        <MainBanner />
        <div className={Style["App"]}>
          <MainLists />
          <MainTiles />
          {/* <MainMoreAbout /> 
        </div> */}
        
      {categoryData && (
        <div className={Style["subTitleContainer"]}>
          <img
            className={Style["mainPicture.image"]}
            src={categoryData.categoryImg ? categoryData.categoryImg : ChildTitle}
            alt="Title img"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
          <h2 className={Style["subTitle"]}>{categoryData.mainDescription}</h2>
          <h3 className={Style["subContent"]}>{categoryData.subDescription}</h3>
        </div>
        )}

            <div className={Style["App"]}>
              <div>
                <div>{renderedComponents}</div>
              </div>
            </div>
      </div>
    </Fade>
  );
}

export default Home;
