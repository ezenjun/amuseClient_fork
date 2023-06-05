import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import Style from "./SubPage.module.css";
import ChildTitle from "./SubtitleImgs/ChildTitle.jpg";
import Fade from "../Fade";
import MainLists from "../MainPage/MainLists/MainLists";
import MainTiles from "../MainPage/MainTiles/MainTiles";
import MainBanner from "../MainPage/MainBanner/MainBanner";

const numberWithCommas = (number: number | null): string => {
  if (number === null) {
    return "N/A"; // 또는 원하는 다른 대체 값을 반환할 수 있습니다.
  }
  return number.toLocaleString("en");
};

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
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };
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
  const apiKeyNumber: number = Number(apiKey) + 1;
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

  const [bestItemIds, setBestItemIds] = useState<number[]>([]);
  const [bestItemTitle, setBestItemTitle] = useState<string[]>([]);
  const [bestItemPrice, setBestItemPrice] = useState<number[]>([]);
  const [bestItemImageUrl, setBestItemImageUrl] = useState<string[]>([]);

  // const [itemSort, setItemSort] = useState("best-item");

  // const handleSortChange = (sortOption: string) => {
  //   setItemSort(sortOption);
  // };

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
  const [ItemIds, setItemIds] = useState<number[]>([]);
  const [ItemTitle, setItemTitle] = useState<string[]>([]);
  const [ItemPrice, setItemPrice] = useState<number[]>([]);
  const [ItemImageUrl, setItemImageUrl] = useState<string[]>([]);

  useEffect(() => {
    fetchPageData(apiKeyNumber);
  }, [apiKeyNumber]);

  console.log("apikeynum = ", apiKeyNumber);
  const fetchPageData = (apiKeyNumber: number) => {
    axios
      .get(`http://ammuse.store/main/category/${apiKeyNumber}/page`)
      .then((response) => {
        const ComponentInfos = response.data.data.pageComponentInfos;
        const items = ComponentInfos.map((item: any) => item);
        const types = items.map((item: any) => item.type);
        setComTypes(types);
        console.log("컴포넌트", types);
        // const titles = bestItems.map((item: any) => item.title);
        // setBestItemTitle(titles);
        // const startPrices = bestItems.map((item: any) => item.startPrice);
        // setBestItemPrice(startPrices);
        // const imgUrl = bestItems.map((item: any) => item.imageUrl);
        // setBestItemImageUrl(imgUrl);
      })
      .catch((error) => {
        console.log("subpage 컴포넌트 연결 실패");
      });
  };

  return (
    <div>
      {categoryData ? (
        <div>
          <Header />
          <div className={Style["liner"]}></div>
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
                {comTypes.map((type, index) => {
                  if (type === "리스트") {
                    return <MainLists />;
                  } else if (type === "타일") {
                    return <MainTiles />;
                  } else if (type === "배너") {
                    return <MainBanner />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <Footer />
          </Fade>
        </div>
      ) : (
        <h3 style={{ margin: "1rem" }}>존재하지 않는 페이지입니다.</h3>
      )}
    </div>
  );
}

export default SubPageComp;
