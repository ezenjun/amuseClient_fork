import React from 'react';
import './Title.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';

function Title() {
  return (
    <div className="Detail-title">
      {/* 헤더의 위치 */}
      <div className="location">
        <p className="country">대한민국</p>
        <FontAwesomeIcon className="icon-right" icon={faChevronRight} />
        <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
        <p className="city">제주도</p>
      </div>
      {/* 헤더의 제목 */}
      <div className="title">
        <p className="title">[2박3일] 놀멍쉬멍 즐겨보는 제주 나들이</p>
      </div>
      {/* 헤더의 별점 */}
      <div className="review">
        <div className="star">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <p className="score">5.0</p>
        <p className="count">(12)</p>
        <FontAwesomeIcon className="icon-right" icon={faChevronRight} />
      </div>
    </div>
  );
}

export default Title;
