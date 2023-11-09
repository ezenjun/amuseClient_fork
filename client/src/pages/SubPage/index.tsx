import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CategoryData } from "../../Interfaces/DataInterfaces";
import { BannerProps, ListProps } from "../../Interfaces/PropsInterfaces";
import axios from "axios";
import Fade from "../../Fade";
import List from "../../components/List";
import Banner from "../../components/Banner";
import SubTiles from "../../components/Tile/SubTiles";
import MainComponent from "../../MainComponent";
import MainBanner from "../../components/MainBanner";
import * as S from "../../styles";

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

function SubPageComp() {
  const { apiKey } = useParams() as { apiKey: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [cookies] = useCookies(["__jwtkid__"]);
  const apiKeyNumber: number = Number(apiKey);

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

  useEffect(() => {
    fetchPageData(apiKeyNumber);
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
      })
      .catch((error) => {
        console.log("subpage 컴포넌트 연결 실패");
      });
  };

  const renderedComponents = comTypes.map((type, index) => {
    if (type === "리스트") {
      const listItem: ListProps = Items[index];
      return (
        <List
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
        <Banner
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

  return (
    <MainComponent>
      {categoryData && (
        <Fade>
          <MainBanner
            categoryData={categoryData}
            categoryImg={categoryData.categoryImg || ""}
            mainDescription={categoryData.mainDescription || ""}
            subDescription={categoryData.subDescription || ""}
          />
          <S.Render>{renderedComponents}</S.Render>
        </Fade>
      )}
    </MainComponent>
  );
}

export default SubPageComp;
