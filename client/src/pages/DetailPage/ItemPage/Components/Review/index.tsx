import React, { useEffect, useState } from "react";
import StarIcon from "../../../../../assets/Icons/star.svg";
import axios from "axios";
import ReviewDetail from "./Detail";
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
    images: string;
  }[];
}

function Review({ itemId }: ReviewProps) {
  // Review Data
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [reviewRated, setReviewRated] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);

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
          <S.TotalStar>
            {/* !FIX 컴포넌트 빼기 */}
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
        reviewData.reviews.map((review, index) => (
          <ReviewDetail
            key={index}
            name={review.user_name}
            content={review.review_content}
            rate={review.user_rate}
            date={review.create_date}
            img={review.images}
          />
        ))}
    </S.Review>
  );
}

export default Review;
