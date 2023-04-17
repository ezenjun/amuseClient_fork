import React from 'react';
import './ReviewPicture.scss';
import SubPicture from '../Picture/SubPicture/SubPicture';

function ReviewPicture() {
  return (
    <div className="ReviewPicture">
      <p className="review-title">여행자 후기 사진</p>
      <div className="subpicture">
        <SubPicture src="images/day2-3.png" alt="test1" />
        <SubPicture src="images/day3-3.png" alt="test1" />
        <SubPicture src="images/picturetest.png" alt="test1" />
      </div>
    </div>
  );
}

export default ReviewPicture;
