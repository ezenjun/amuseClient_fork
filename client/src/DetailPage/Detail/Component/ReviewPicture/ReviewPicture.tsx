import React, { useEffect, useState } from 'react';
import './ReviewPicture.scss';
import SubPicture from '../Picture/SubPicture/SubPicture';
import axios from 'axios';

interface ReviewPictureProps {
  itemId: number | null;
};

function ReviewPicture({ itemId }: ReviewPictureProps) {
  /**
   * Review Picture Data
   */
  const [reviewPictureData, setReviewPictureData] = useState<string[]>([]);
  //const subReviewPicture = reviewPictureData.slice(0, 3);

  /**
   * Review Picture API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/review`)
      .then((response) => {
        setReviewPictureData(response.data.data.reviews)

        console.log(response.data.data.reviews)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="ReviewPicture">
      <p className="review-title">여행자 후기 사진</p>
      {/*
      <div className="subpicture">
        <SubPicture src="images/day2-3.png" alt="test1" />
        <SubPicture src="images/day3-3.png" alt="test1" />
      </div>
  */}
    </div>
  );
}

export default ReviewPicture;
