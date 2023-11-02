import React, { useEffect, useState } from "react";
import { SubListsProps } from "../../Interfaces/PropsInterfaces";
import { useNavigate } from "react-router-dom";
import RightIcon from "./Icons/right.png";
import NoRightIcon from "./Icons/right_no.png";
import LeftIcon from "./Icons/left.png";
import NoLeftIcon from "./Icons/left_no.png";
import Box from "./Box";
import * as S from "./style";

const numberWithCommas = (number: number | null): string => {
  if (number === null) return "N/A";
  return number.toLocaleString("en");
};

function SubLists({ title, itemInfos }: SubListsProps) {
  const [bestItemIds, setBestItemIds] = useState<number[]>([]);
  const [bestItemTitle, setBestItemTitle] = useState<string[]>([]);
  const [bestItemPrice, setBestItemPrice] = useState<number[]>([]);
  const [bestItemImageUrl, setBestItemImageUrl] = useState<string[]>([]);

  useEffect(() => {
    const ids = itemInfos.map((item: any) => item.item_db_id);
    const titles = itemInfos.map((item: any) => item.title);
    const startPrices = itemInfos.map((item: any) => item.startPrice);
    const imgUrl = itemInfos.map((item: any) => item.imageUrl);
    setBestItemIds(ids);
    setBestItemTitle(titles);
    setBestItemPrice(startPrices);
    setBestItemImageUrl(imgUrl);
  }, [itemInfos]);

  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  const [displayedItemCount, setDisplayedItemCount] = useState(4);
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
    <S.List>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Count>{`${bestItemIds.length}개`}</S.Count>
      </S.Header>
      <S.BoxList>
        {displayedItemIds.map((itemId: number, index: number) => (
          <Box
            key={itemId}
            itemId={itemId}
            title={bestItemTitle[index + currentIndex]}
            startPrice={numberWithCommas(bestItemPrice[index + currentIndex])}
            handleClick={() => navigateToDetail(itemId)}
            imageUrl={bestItemImageUrl[index + currentIndex]}
          />
        ))}
      </S.BoxList>
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
    </S.List>
  );
}

export default SubLists;
