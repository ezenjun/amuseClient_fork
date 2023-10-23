import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CategoryData } from "../../Interfaces/DataInterfaces";
import {
  BannerProps,
  ListProps,
  BoxProps,
  DropdownProps,
} from "../../Interfaces/PropsInterfaces";
import axios from "axios";
import Style from "./SubPage.module.css";
import ChildTitle from "./SubtitleImgs/ChildTitle.jpg";
import Fade from "../../Fade";
import SubLists from "./SubLists";
import SubBanners from "./SubBanners";
import SubTiles from "./SubTiles";
import MainComponent from "../../MainComponent";
import Banner from "../../components/Banner";

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

const Box: React.FC<BoxProps> = ({
  marginRight,
  itemId,
  handleClick,
  title,
  startPrice,
  imageUrl,
}) => (
  <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
    <div
      className={Style["box_before"]}
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    <div className={Style["like_count"]}></div>
    <p className={Style["tripTitle"]}>{title}</p>
    <p className={Style["tripCost"]}>가격 : {startPrice}원 ~</p>
  </div>
);

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("like_num_desc");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className={Style["dropdown"]} style={{ float: "right" }}>
      <select value={selectedOption} onChange={handleDropdownChange}>
        <option value="best-item">좋아요 순</option>
        <option value="current-item">최신순</option>
      </select>
    </div>
  );
};

function SubPageComp() {
  const movePage = useNavigate();

  const { apiKey } = useParams() as { apiKey: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [cookies] = useCookies(["__jwtkid__"]);

  // console.log("apiKey = " + apiKey);
  const apiKeyNumber: number = Number(apiKey);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const hashtagAll = response.data.data.categories;
        // console.log("hash ", hashtagAll);
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

  const [displayedItemCount, setDisplayedItemCount] = useState(3);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 992) {
      setDisplayedItemCount(3);
    } else if (windowWidth >= 700) {
      setDisplayedItemCount(2);
    } else {
      setDisplayedItemCount(1);
    }
  };

  useEffect(() => {
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

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

  return (
    <MainComponent>
      {categoryData ? (
        <Fade>
          <Banner
            categoryData={categoryData}
            categoryImg={categoryData?.categoryImg}
            mainDescription={categoryData?.mainDescription}
            subDescription={categoryData?.subDescription}
          />
          <div className={Style["App"]}>{renderedComponents}</div>
        </Fade>
      ) : (
        <h3 style={{ margin: "1rem" }}>존재하지 않는 페이지입니다.</h3>
      )}
    </MainComponent>
  );
}

export default SubPageComp;
