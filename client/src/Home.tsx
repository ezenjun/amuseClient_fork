import React, { useEffect, useState } from "react";
import _ from "lodash";
import Style from "./SubPage/SubPage.module.css";
// import AppStyle from "./App.module.css";
// import MainLists from "./MainPage/MainLists/MainLists";
// import MainBanner from "./MainPage/MainBanner/MainBanner";
// import MainTiles from "./MainPage/MainTiles/MainTiles";
// import MainMoreAbout from "./MainPage/MainMoreAbout/MainMoreAbout";
// import { useRecoilState } from "recoil";
// import { isLoggedIn, isManager } from "./atoms";
// import { redirect, useLocation } from "react-router-dom";
import Fade from "./Fade";
import axios from "axios";
import { CategoryData } from "./interfaces/DataInterfaces";
import { ListProps, BannerProps } from "./interfaces/PropsInterfaces";
import { useCategoryContext } from "./components/Headers/Contexts/CategoryContext";
import ChildTitle from "./SubPage/SubtitleImgs/ChildTitle.jpg";
import SubLists from "./SubPage/SubLists";
import SubBanners from "./SubPage/SubBanners";
import SubTiles from "./SubPage/SubTiles";
import MainComponent from "./MainComponent";
import { useCookies } from "react-cookie";

function Home() {
  interface TileProps {
    page_component_id: string;
    type: string;
    title: string;
    tileCount: number;
    tileList: tileList[];
  }

  interface tileList {
    tile_id: number;
    tile_name: string;
    tile_images: string;
    itemInfos: [];
  }
  const { categoriesInfo } = useCategoryContext();
  const [apiKeyNumber, setApiKeyNumber] = useState(0);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [cookies] = useCookies(["__jwtkid__"]);

  // const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // const [manager, setManager] = useRecoilState(isManager);
  // const location = useLocation();

  useEffect(() => {
    let infoIndex = _.findIndex(categoriesInfo, { categoryName: "home" });
    if (infoIndex < 0) {
      infoIndex = _.findIndex(categoriesInfo, { categoryName: "Home" });
    }
    if (categoriesInfo?.length) {
      const info = categoriesInfo[infoIndex];
      // console.log(info);
      setApiKeyNumber(info.categoryId);
    }
  }, [categoriesInfo]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const hashtagAll = response.data.data.categories;

        let matchedIndex = -1;
        for (let i = 0; i < hashtagAll.length; i++) {
          if (hashtagAll[i].categoryId === apiKeyNumber) {
            matchedIndex = i;
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
  // const [bannerContent, setBannerContent] = useState<string[]>([]);
  // const [bannerPCUrl, setBannerPCUrl] = useState<string[]>([]);
  // const [ItemTitle, setItemTitle] = useState<string[]>([]);
  // const [ItemPrice, setItemPrice] = useState<number[]>([]);
  // const [ItemImageUrl, setItemImageUrl] = useState<string[]>([]);

  useEffect(() => {
    if (apiKeyNumber > 0) {
      fetchPageData(apiKeyNumber);
    }
  }, [apiKeyNumber]);

  const fetchPageData = (apiKeyNumber: number) => {
    const token = cookies["__jwtkid__"];
    axios
      .get(
        `${process.env.REACT_APP_AMUSE_API}/main/category/${apiKeyNumber}/page`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        const ComponentInfos = response.data.data.pageComponentInfos;
        const items = ComponentInfos.map((item: any) => item);
        setItems(items);
        const types = items.map((item: any) => item.type);
        setComTypes(types);
        // console.log("컴포넌트", response.data.data);
      })
      .catch((error) => {
        // console.log("subpage 컴포넌트 연결 실패");
      });
  };

  const renderedComponents = comTypes.map((type, index) => {
    if (type === "리스트") {
      const listItem: ListProps = Items[index];
      // console.log("subpage list ", listItem.itemInfos);
      return (
        <SubLists
          key={index}
          title={listItem.title}
          itemInfos={listItem.itemInfos}
        />
      );
    } else if (type === "타일") {
      const tileItem: TileProps = Items[index];
      return (
        <SubTiles
          key={index}
          title={tileItem.title}
          tileCount={tileItem.tileCount}
          tileList={tileItem.tileList}
        />
      );
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

  // const [listTitle, setListTitle] = useState<string[]>([]);
  // const [itemCount, setItemCount] = useState<number[]>([]);
  // const [itemIds, setItemIds] = useState<number[]>([]);
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [titles, setTitles] = useState<string[]>([]);
  // const [startPrices, setStartPrice] = useState<number[]>([]);

  return (
    <MainComponent>
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
                src={
                  categoryData.categoryImg
                    ? categoryData.categoryImg
                    : ChildTitle
                }
                alt="Title img"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  objectPosition: "left",
                }}
              />
              <h2 className={Style["subTitle"]}>
                {categoryData.mainDescription}
              </h2>
              <h3 className={Style["subContent"]}>
                {categoryData.subDescription}
              </h3>
            </div>
          )}

          <div className={Style["App"]}>
            <div>
              <div>{renderedComponents}</div>
            </div>
          </div>
        </div>
      </Fade>
    </MainComponent>
  );
}

export default Home;
