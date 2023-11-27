import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { ReactComponent as Right } from "./Icons/right.svg";
import { ReactComponent as Left } from "./Icons/left.svg";
import { ReactComponent as NoRight } from "./Icons/right_no.svg";
import { ReactComponent as NoLeft } from "./Icons/left_no.svg";
import Sub from "../Picture/Sub";
import axios from "axios";
import * as S from "./style";
import * as C from "./constants";

function ReviewPicture({ itemId }: ItemIdProps) {
  // Review Picture Data
  const [reviewPictureData, setReviewPictureData] = useState<
    { review_img: string }[]
  >([]);
  const reviewPicture = reviewPictureData
    ? reviewPictureData.map((obj) => obj.review_img)
    : [];
  const [reviewPictureCount, setReviewPictureCount] = useState<number>(0);
  const [displayedItemCount, setDisplayedItemCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const subReviewPicture = reviewPicture.slice(
    currentIndex,
    currentIndex + displayedItemCount
  );
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    currentIndex + displayedItemCount >= reviewPicture.length;

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + displayedItemCount);
  };
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - displayedItemCount);
  };

  // Review Picture API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/review`)
      .then((response) => {
        setReviewPictureData(response.data.data.review_all_imgs);
        setReviewPictureCount(response.data.data.review_all_imgs.length);
      })
      .catch((error) => {
        console.log("Review 연결 실패");
      });
  }, [itemId]);

  return (
    <S.Picture>
      <S.Title>
        <S.Content>{C.REVIEW.TITLE}</S.Content>
        <S.Count>
          {reviewPictureCount}
          {C.REVIEW.COUNT}
        </S.Count>
      </S.Title>
      <S.List>
        {subReviewPicture.map((picture, key) => (
          <Sub
            src={picture}
            alt={picture}
            modal={reviewPicture}
            clickId={key + 1}
            type="review"
          />
        ))}
      </S.List>
      {(!isNextDisabled || !isPrevDisabled) && (
        <S.Page>
          <S.Button onClick={handlePrevClick} disabled={isPrevDisabled}>
            {isPrevDisabled ? <NoLeft /> : <Left />}
          </S.Button>
          {Math.ceil(currentIndex / 8) + 1}
          <S.Button onClick={handleNextClick} disabled={isNextDisabled}>
            {isNextDisabled ? <NoRight /> : <Right />}
          </S.Button>
        </S.Page>
      )}
    </S.Picture>
  );
}

export default ReviewPicture;
