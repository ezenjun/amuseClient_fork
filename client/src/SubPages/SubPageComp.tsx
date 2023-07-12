import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import Style from "./SubPage.module.css";
import ChildTitle from "./SubtitleImgs/ChildTitle.jpg";
import Fade from "../Fade";
import SubLists from "./SubLists";
import SubBanners from "./SubBanners";
import SubTiles from "./SubTiles";

interface BannerProps {
  page_component_id: number;
  type: string;
  title: string;
  content: string;
  itemInfos: [];
  mobileBannerLink: string;
  pcBannerUrl: string;
  pcBannerLink: string;
  mobileBannerUrl: string;
}

interface ListProps {
  page_component_id: string;
  type: string;
  title: string;
  content: null;
  itemInfos: [];
  pcBannerUrl: null;
  pcBannerLink: null;
  mobileBannerUrl: null;
  mobileBannerLink: null;
}

interface TileProps {
  page_component_id: string;
  type: string;
  title: string;
  content: null;
  itemInfos: [];
  pcBannerUrl: null;
  pcBannerLink: null;
  mobileBannerUrl: null;
  mobileBannerLink: null;
}

interface BoxProps {
  marginRight: string;
  itemId: number;
  handleClick: () => void;
  title: string;
  startPrice: string;
  imageUrl: string;
}

const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick, title, startPrice, imageUrl }) => (
  <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
    <div className={Style["box_before"]} style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className={Style["like_count"]}>
      {/* <FontAwesomeIcon
        icon={isLiked[itemId] ? fullHeart : faHeart}
        style={{ color: "#ffffff", width: "20px", height: "20px", marginTop: "10px", marginLeft: "10px" }}
        onClick={() => handleLikeClick(itemId)}
      /> */}
    </div>
    <p className={Style["tripTitle"]}>{title}</p>
    <p className={Style["tripCost"]}>가격 : {startPrice}원 ~</p>
  </div>
);

interface DropdownProps {
  onChange: (sortOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("like_num_desc");

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
  // const navigateToDetail = (itemId: number) => {
  //   movePage(`/detail/${itemId}`);
  // };
  // const moveToViewAll = () => {
  //   movePage("/ViewAll");
  // };

  interface CategoryData {
    categoryId: string;
    categoryName: string;
    categoryImg: string;
    mainDescription: string;
    subDescription: string;
  }

  const { apiKey } = useParams() as { apiKey: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

  // console.log("apiKey = " + apiKey);
  const apiKeyNumber: number = Number(apiKey);
  useEffect(() => {
    axios
      .get(`https://ammuse.store/main/category`)
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
  const [bannerContent, setBannerContent] = useState<string[]>([]);
  const [bannerPCUrl, setBannerPCUrl] = useState<string[]>([]);
  const [ItemTitle, setItemTitle] = useState<string[]>([]);
  const [ItemPrice, setItemPrice] = useState<number[]>([]);
  const [ItemImageUrl, setItemImageUrl] = useState<string[]>([]);

  useEffect(() => {
    fetchPageData(apiKeyNumber);
  }, [apiKeyNumber]);

  console.log("apikeynum = ", apiKeyNumber);
  const fetchPageData = (apiKeyNumber: number) => {
    axios
      .get(`http://43.200.171.174/main/category/${apiKeyNumber}/page`)
      .then((response) => {
        const ComponentInfos = response.data.data.pageComponentInfos;
        const items = ComponentInfos.map((item: any) => item);
        setItems(items);
        // console.log(items);
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

  return (
    <div>
      {categoryData ? (
        <div>
          <Fade>
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

            <div className={Style["App"]}>
              <div>
                <div>{renderedComponents}</div>
              </div>
            </div>
          </Fade>
        </div>
      ) : (
        <h3 style={{ margin: "1rem" }}>존재하지 않는 페이지입니다.</h3>
      )}
    </div>
  );
}

export default SubPageComp;
