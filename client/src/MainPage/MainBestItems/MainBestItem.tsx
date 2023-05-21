import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../BestAndNewStyle.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import RightIcon from "../ArrowIcons/right.png";
import NoRightIcon from "../ArrowIcons/right_no.png";
import LeftIcon from "../ArrowIcons/left.png";
import NoLeftIcon from "../ArrowIcons/left_no.png";

const numberWithCommas = (number: number): string => {
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

function MainBestItem() {
  /**
   * Best Item API
   */
  const [bestItemIds, setBestItemIds] = useState<number[]>([]);
  const [bestItemTitle, setBestItemTitle] = useState<string[]>([]);
  const [bestItemPrice, setBestItemPrice] = useState<number[]>([]);
  const [bestItemImageUrl, setBestItemImageUrl] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState<boolean[]>([]);

  const handleLikeClick = (index: number) => {
    const updatedIsLiked = [...isLiked];
    updatedIsLiked[index] = !updatedIsLiked[index];
    setIsLiked(updatedIsLiked);
  };

  const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick, title, startPrice, imageUrl }) => (
    <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
      <div className={Style["box_before"]} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={Style["like_count"]}>
        <FontAwesomeIcon
          icon={isLiked[itemId] ? fullHeart : faHeart}
          style={{ color: "#ffffff", width: "20px", height: "20px", marginTop: "10px", marginLeft: "10px" }}
          onClick={() => handleLikeClick(itemId)}
        />
      </div>
      <p className={Style["tripTitle"]}>{title}</p>
      <p className={Style["tripCost"]}>가격 : {startPrice}원 ~</p>
    </div>
  );

  useEffect(() => {
    axios
      .get("https://ammuse.store/main/best-item")
      .then((response) => {
        const bestItems = response.data.data.items;
        const ids = bestItems.map((item: any) => item.item_db_id);
        setBestItemIds(ids);
        const titles = bestItems.map((item: any) => item.title);
        setBestItemTitle(titles);
        const startPrices = bestItems.map((item: any) => item.startPrice);
        setBestItemPrice(startPrices);
        const imgUrl = bestItems.map((item: any) => item.imageUrl);
        setBestItemImageUrl(imgUrl);
        const likes = new Array(ids.length).fill(false);
        setIsLiked(likes);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("mainbest 연결 실패");
      });
  }, []);

  /**
   * Best Item -> Detail Page
   */
  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  console.log(currentIndex);

  const displayedItemIds = bestItemIds.slice(currentIndex, currentIndex + 3);

  console.log(displayedItemIds);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + 3 >= bestItemIds.length;
  return (
    <div>
      <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>실시간 Best 여행 상품🏞</h2>
      <div className={Style["container"]}>
        {displayedItemIds.map((itemId: number, index: number) => (
          <Box
            key={itemId}
            marginRight={index === displayedItemIds.length - 1 ? "0" : "32px"}
            itemId={itemId}
            title={bestItemTitle[index + currentIndex]}
            startPrice={numberWithCommas(bestItemPrice[index + currentIndex])}
            handleClick={() => navigateToDetail(itemId)}
            imageUrl={bestItemImageUrl[index + currentIndex]}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button
          onClick={handlePrevClick}
          disabled={isPrevDisabled}
          style={{ background: "transparent", border: "transparent" }}
        >
          <img src={isPrevDisabled ? NoLeftIcon : LeftIcon} alt="Previous" style={{ width: "24px", height: "24px" }} />
        </button>
        <button
          onClick={handleNextClick}
          disabled={isNextDisabled}
          style={{ background: "transparent", border: "transparent" }}
        >
          <img src={isNextDisabled ? NoRightIcon : RightIcon} alt="Next" style={{ width: "24px", height: "24px" }} />
        </button>
      </div>
    </div>
  );
}

export default MainBestItem;
