import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BoxProps } from "../../../../Interfaces/PropsInterfaces";
import { SubListsProps } from "../../../../Interfaces/PropsInterfaces";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import Style from "../../../MainPage/ListStyle.module.css";
import RightIcon from "../../../MainPage/ArrowIcons/right.png";
import NoRightIcon from "../../../MainPage/ArrowIcons/right_no.png";
import LeftIcon from "../../../MainPage/ArrowIcons/left.png";
import NoLeftIcon from "../../../MainPage/ArrowIcons/left_no.png";
import axios from "axios";
import * as S from "./style";

const numberWithCommas = (number: number | null): string => {
  if (number === null) {
    return "N/A";
  }
  return number.toLocaleString("en");
};

function SubLists({ title, itemInfos }: SubListsProps) {
  const [bestItemIds, setBestItemIds] = useState<number[]>([]);
  const [bestItemTitle, setBestItemTitle] = useState<string[]>([]);
  const [bestItemPrice, setBestItemPrice] = useState<number[]>([]);
  const [bestItemImageUrl, setBestItemImageUrl] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState<boolean[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);

  useEffect(() => {
    const ids = itemInfos.map((item: any) => item.item_db_id);
    setBestItemIds(ids);
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
    axios
      .post(
        `${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/like-plus`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        alert(
          "관심상품에 등록되었습니다.\n관심상품 관리는 마이페이지에서 가능합니다."
        );
      })
      .catch((error) => {
        console.error("Error liking item:", error);
      });
  };

  const Box: React.FC<BoxProps> = ({
    itemId,
    handleClick,
    title,
    startPrice,
    imageUrl,
  }) => (
    <S.Box>
      <S.BoxImage src={imageUrl} onClick={handleClick} />
      <S.BoxLike>
        <FontAwesomeIcon
          icon={isLiked[itemId] ? fullHeart : faHeart}
          style={{
            color: "#ffffff",
            width: "20px",
            height: "20px",
            zIndex: "9",
            cursor: "pointer",
          }}
          onClick={() => handleLikeClick(itemId)}
        />
      </S.BoxLike>
      <S.BoxTitle onClick={handleClick}>{title}</S.BoxTitle>
      <S.BoxPrice onClick={handleClick}>
        {startPrice !== "N/A" ? (
          <p style={{ margin: 0 }}>가격 : {startPrice}원 ~</p>
        ) : (
          <></>
        )}
      </S.BoxPrice>
    </S.Box>
  );

  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  const [displayedItemCount, setDisplayedItemCount] = useState(8);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + displayedItemCount);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - displayedItemCount);
  };

  const displayedItemIds = bestItemIds.slice(
    currentIndex,
    currentIndex + displayedItemCount
  );

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    currentIndex + displayedItemCount >= bestItemIds.length;

  return (
    <S.SubLists>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Count>{`${bestItemIds.length}개`}</S.Count>
      </S.Header>
      <div className={Style["container"]}>
        {displayedItemIds.map((itemId: number, index: number) => (
          <Box
            key={itemId}
            marginRight={index === displayedItemIds.length - 1 ? "0" : "15px"}
            itemId={itemId}
            title={bestItemTitle[index + currentIndex]}
            startPrice={numberWithCommas(bestItemPrice[index + currentIndex])}
            handleClick={() => navigateToDetail(itemId)}
            imageUrl={bestItemImageUrl[index + currentIndex]}
          />
        ))}
      </div>
      {(!isNextDisabled || !isPrevDisabled) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={handlePrevClick}
            disabled={isPrevDisabled}
            style={{ background: "transparent", border: "transparent" }}
          >
            <img
              src={isPrevDisabled ? NoLeftIcon : LeftIcon}
              alt="Previous"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
          <div>
            {Math.ceil(currentIndex / 8) + 1} /
            {Math.ceil(bestItemIds.length / 8)}
          </div>
          <button
            onClick={handleNextClick}
            disabled={isNextDisabled}
            style={{ background: "transparent", border: "transparent" }}
          >
            <img
              src={isNextDisabled ? NoRightIcon : RightIcon}
              alt="Next"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>
      )}
    </S.SubLists>
  );
}

export default SubLists;
