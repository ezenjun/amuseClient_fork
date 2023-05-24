import React, { useEffect, useState } from 'react';
import './Review.scss';
import axios from 'axios';
import ReviewDetail from './ReviewDetail/ReviewDetail';

interface ReviewProps {
  itemId: number | null;
};

interface ReviewData {
  rated : number;
  review_count : number;
  reviews : {
    user_name : string;
    review_content : string;
    images : string;
  }[];
}

function Review({ itemId }: ReviewProps) {
  /**
   * Review Data
   */
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  /**
   * Review API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/review`)
      .then((response) => {
        setReviewData(response.data.data)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, [itemId]);

  console.log(reviewData?.reviews)

  return (
    <div className="Review">
      <div className="review-header">
        <p className="review-title">후기</p>
        <p className="review-number">{reviewData?.review_count}</p>
      </div>
      <div className='ReviewDetail'>
        {reviewData?.reviews && reviewData.reviews.map((review, index) => (
          <ReviewDetail key={index} name={review.user_name} content={review.review_content} img={review.images} />
        ))}
      </div>
    </div>
  );
}

export default Review;
