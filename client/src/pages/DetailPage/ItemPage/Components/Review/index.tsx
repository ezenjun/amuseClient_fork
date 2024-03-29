import React, { useEffect, useState } from "react";
import { ReactComponent as Right } from "../ReviewPicture/Icons/right.svg";
import { ReactComponent as Left } from "../ReviewPicture/Icons/left.svg";
import { ReactComponent as NoRight } from "../ReviewPicture/Icons/right_no.svg";
import { ReactComponent as NoLeft } from "../ReviewPicture/Icons/left_no.svg";
import StarIcon from "../../../../../assets/Icons/star.svg";
import BackStarIcon from "../../../../../assets/Icons/star_back.svg";
import ReviewDetail from "./Detail";
import axios from "axios";
import * as S from "./style";
import * as C from "./constants";

interface ReviewProps {
  itemId: number | null;
}

interface ReviewData {
  rated: number;
  review_count: number;
  reviews: {
    user_name: string;
    review_content: string;
    user_rate: number;
    create_date: string;
    images: { review_img: string }[];
  }[];
}

function Review({ itemId }: ReviewProps) {
  // Review Data
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [reviewRated, setReviewRated] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const reviewStar = 112 * (reviewRated / 5);

  // paging
  const [displayedItemCount, setDisplayedItemCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const subReviewData = reviewData?.reviews?.slice(
    currentIndex,
    currentIndex + displayedItemCount
  );
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    !reviewData?.reviews ||
    currentIndex + displayedItemCount >= reviewData.reviews.length;

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + displayedItemCount);
  };
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - displayedItemCount);
  };

  // Review API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/review`)
      .then((response) => {
        setReviewData(response.data.data);
        setReviewRated(response.data.data.rated.toFixed(1));
        setReviewCount(response.data.data.review_count);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <S.Review>
      <S.Title>
        <S.Content>{C.REVIEW.TITLE}</S.Content>
        <S.Count>
          {reviewCount}
          {C.REVIEW.COUNT}
        </S.Count>
      </S.Title>

      <S.Rated>
        <S.Score>
          <S.StarIcon src={StarIcon} alt="star" />
          <S.ItemScore>{reviewRated}</S.ItemScore>
          {C.REVIEW.RATED}
        </S.Score>
        <S.Divide />
        <S.Total>
          <S.BackStar>
            <S.TotalIcon src={BackStarIcon} alt="star" />
            <S.TotalIcon src={BackStarIcon} alt="star" />
            <S.TotalIcon src={BackStarIcon} alt="star" />
            <S.TotalIcon src={BackStarIcon} alt="star" />
            <S.TotalIcon src={BackStarIcon} alt="star" />
          </S.BackStar>
          <S.TotalStar width={reviewStar}>
            <S.TotalIcon src={StarIcon} alt="star" />
            <S.TotalIcon src={StarIcon} alt="star" />
            <S.TotalIcon src={StarIcon} alt="star" />
            <S.TotalIcon src={StarIcon} alt="star" />
            <S.TotalIcon src={StarIcon} alt="star" />
          </S.TotalStar>

          <S.TotalCount>
            {reviewCount}
            {C.REVIEW.TOTAL}
          </S.TotalCount>
        </S.Total>
      </S.Rated>

      {reviewData?.reviews &&
        subReviewData?.map((review, index) => (
          <S.ReviewData>
            <ReviewDetail
              key={index}
              name={review.user_name}
              content={review.review_content}
              rate={review.user_rate}
              date={review.create_date}
              img={review.images}
            />
            {isNextDisabled === true && subReviewData.length - 1 === index && (
              <S.LastReview>{C.REVIEW.LAST}</S.LastReview>
            )}
          </S.ReviewData>
        ))}

      {(!isNextDisabled || !isPrevDisabled) && (
        <S.Page>
          <S.Button onClick={handlePrevClick} disabled={isPrevDisabled}>
            {isPrevDisabled ? <NoLeft /> : <Left />}
          </S.Button>
          {Math.ceil(currentIndex / displayedItemCount) + 1}
          <S.Button onClick={handleNextClick} disabled={isNextDisabled}>
            {isNextDisabled ? <NoRight /> : <Right />}
          </S.Button>
        </S.Page>
      )}
    </S.Review>
  );
}

export default Review;
