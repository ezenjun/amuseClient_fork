import React, { FC } from 'react';
import './TitleDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';

interface TitleDetailProps {
    country: string;
    city: string;
    title: string;
    rated: number;
}

const TitleDetail: FC<TitleDetailProps> = ({
    country, city, title, rated
}) => (
    <div className="Detail-title">
      {/* 헤더의 위치 */}
      <div className="location">
        <p className="country">{country}</p>
        <FontAwesomeIcon className="icon-right" icon={faChevronRight} />
        <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
        <p className="city">{city}</p>
      </div>

      {/* 헤더의 제목 */}
      <div className="title">
        <p className="title">{title}</p>
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
        <p className="score">{rated}</p>
        <p className="count">(12)</p>
        <FontAwesomeIcon className="icon-right" icon={faChevronRight} />
      </div>
    </div>
);

export default TitleDetail;
