import './TitleDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';

interface TitleDetailProps {
    country: string;
    city: string;
    title: string;
    rated: number;
    review_count: number;
}

function TitleDetail({ country, city, title, rated, review_count } : TitleDetailProps){
  return(
    <div className="Detail-title">
      {/* 제목의 위치 */}
      <div className="location">
        <p className="country">{country}</p>
        <FontAwesomeIcon className="icon-right" icon={faChevronRight} />
        <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
        <p className="city">{city}</p>
      </div>

      {/* 제목의 제목 */}
      <div className="title">
        <p className="title">{title}</p>
      </div>

      {/* 제목의 별점 */}
      <div className="review">
        <div className="star">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <p className="score">{rated}</p>
        <p className="count">({review_count})</p>
        <FontAwesomeIcon className="icon-right" icon={faChevronRight} />
      </div>
    </div>
  );
};

export default TitleDetail;
