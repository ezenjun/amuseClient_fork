import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../MainPage/ListStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import RightIcon from "../MainPage/ArrowIcons/right.png";
import NoRightIcon from "../MainPage/ArrowIcons/right_no.png";
import LeftIcon from "../MainPage/ArrowIcons/left.png";
import NoLeftIcon from "../MainPage/ArrowIcons/left_no.png";
import { BoxProps } from "../Interfaces/PropsInterfaces";
import { SubListsProps } from "../Interfaces/PropsInterfaces";
import axios from "axios";
import { useCookies } from "react-cookie";

const numberWithCommas = (number: number | null): string => {
  if (number === null) {
    return "N/A"; // 또는 원하는 다른 대체 값을 반환할 수 있습니다.
  }
  return number.toLocaleString("en");
};

function SubLists({ title, itemInfos }: SubListsProps) {
  console.log("itemInfos", itemInfos);
  const [bestItemIds, setBestItemIds] = useState<number[]>([]);
  const [bestItemTitle, setBestItemTitle] = useState<string[]>([]);
  const [bestItemPrice, setBestItemPrice] = useState<number[]>([]);
  const [bestItemImageUrl, setBestItemImageUrl] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState<boolean[]>([]);

  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);

  useEffect(() => {
    const ids = itemInfos.map((item: any) => item.item_db_id);
    setBestItemIds(ids);
    console.log("ids", bestItemIds);
    const titles = itemInfos.map((item: any) => item.title);
    setBestItemTitle(titles);
    const startPrices = itemInfos.map((item: any) => item.startPrice);
    setBestItemPrice(startPrices);
    const imgUrl = itemInfos.map((item: any) => item.imageUrl);
    setBestItemImageUrl(imgUrl);
  }, [itemInfos]);

  const handleLikeClick = (itemId: number) => {
    const updatedIsLiked = [...isLiked];
    updatedIsLiked[itemId] = !updatedIsLiked[itemId];
    setIsLiked(updatedIsLiked);
    const token = cookies["__jwtkid__"];
    console.log(itemId, "like it");
    axios
      .post(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/like-plus`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        alert("관심상품에 등록되었습니다.\n관심상품 관리는 마이페이지에서 가능합니다.");
      })
      .catch((error) => {
        console.error("Error liking item:", error);
      });
  };

  const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick, title, startPrice, imageUrl }) => (
    <div className={Style["box"]} style={{ marginRight }}>
      <div
        className={Style["box_before"]}
        onClick={handleClick}
        style={{ backgroundImage: `url(${imageUrl})`, cursor: "pointer" }}
      ></div>
      <div className={Style["like_count"]}>
        <FontAwesomeIcon
          icon={isLiked[itemId] ? fullHeart : faHeart}
          style={{
            color: "#ffffff",
            width: "24px",
            height: "24px",
            marginLeft: "4px",
            marginTop: "4px",
            justifyItems: "center",
            zIndex: "9",
            cursor: "pointer",
          }}
          onClick={() => handleLikeClick(itemId)}
        />
      </div>
      <p className={Style["tripTitle"]} onClick={handleClick}>
        {title}
      </p>
      <p className={Style["tripCost"]} onClick={handleClick}>
        가격 : {startPrice}원 ~
      </p>
    </div>
  );
  /**
   * Best Item -> Detail Page
   */
  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  const [displayedItemCount, setDisplayedItemCount] = useState(4);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1100) {
      setDisplayedItemCount(4);
    } else if (windowWidth >= 900) {
      setDisplayedItemCount(3);
    } else if (windowWidth >= 650) {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + displayedItemCount);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - displayedItemCount);
  };

  const displayedItemIds = bestItemIds.slice(currentIndex, currentIndex + displayedItemCount);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + displayedItemCount >= bestItemIds.length;

  return (
    <div>
      <h2 style={{ marginTop: "30px", marginBottom: "1rem" }}>{title}</h2>
      <div className={Style["container"]}>
        {displayedItemIds.map((itemId: number, index: number) => (
          <Box
            key={itemId}
            marginRight={index === displayedItemIds.length - 1 ? "0" : "18px"}
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

export default SubLists;
