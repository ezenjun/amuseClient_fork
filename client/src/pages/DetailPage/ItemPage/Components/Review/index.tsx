import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewDetail from "./Detail/ReviewDetail";
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
    images: string;
  }[];
}

function Review({ itemId }: ReviewProps) {
  // Review Data
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  // Review API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/review`)
      .then((response) => {
        setReviewData(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <S.Review>
      <S.Review>
        <S.Title>
          <S.Content>{C.REVIEW.TITLE}</S.Content>
          <S.Count>
            {0}
            {C.REVIEW.COUNT}
          </S.Count>
        </S.Title>
        {reviewData?.reviews &&
          reviewData.reviews.map((review, index) => (
            <ReviewDetail
              key={index}
              name={review.user_name}
              content={review.review_content}
              img={review.images}
            />
          ))}
      </S.Review>
    </S.Review>
  );
}

export default Review;
