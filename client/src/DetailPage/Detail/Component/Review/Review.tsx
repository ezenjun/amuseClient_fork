import React from 'react';
import './Review.scss';

function Review() {
  return (
    <div className="Review">
      <div className="review-header">
        <p className="review-title">후기</p>
        <p className="review-number">5</p>
      </div>
      <img src="images/reviewtest.png" alt="test1" />
      <img src="images/reviewtest2.png" alt="test1" />
    </div>
  );
}

export default Review;
