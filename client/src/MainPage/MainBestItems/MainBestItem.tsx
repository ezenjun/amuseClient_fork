import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../BestAndNewStyle.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

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
  const [bestItemTitle, setBestItemTitle] = useState([]);
  const [bestItemPrice, setBestItemPrice] = useState<number[]>([]);
  const [bestItemImageUrl, setBestItemImageUrl] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick, title, startPrice, imageUrl }) => (
    <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
      <div className={Style["box_before"]} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={Style["like_count"]}>
        <FontAwesomeIcon
          icon={isLiked ? fullHeart : faHeart}
          style={{ color: "#ffffff", width: "20px", height: "20px", marginTop: "10px", marginLeft: "10px" }}
          onClick={handleLikeClick}
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
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, []);

  /**
   * Best Item -> Detail Page
   */
  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  return (
    <div>
      <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>실시간 Best 여행 상품🏞</h2>
      <div className={Style["container"]}>
        {bestItemIds.slice(0, 3).map((itemId: any, index: number) => (
          <Box
            key={itemId}
            marginRight={index === bestItemIds.length - 1 ? "0" : "32px"}
            itemId={itemId}
            title={bestItemTitle[index]}
            startPrice={numberWithCommas(bestItemPrice[index])}
            handleClick={() => navigateToDetail(itemId)}
            imageUrl={bestItemImageUrl[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default MainBestItem;
