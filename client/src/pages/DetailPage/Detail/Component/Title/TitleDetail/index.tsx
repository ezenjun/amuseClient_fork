import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import * as S from "./style";

interface TitleDetailProps {
  country: string;
  city: string;
  title: string;
  rated: number;
  review_count: number;
}

function TitleDetail({
  country,
  city,
  title,
  rated,
  review_count,
}: TitleDetailProps) {
  return (
    <S.TitleDetail>
      <S.Location>
        {country}
        <FontAwesomeIcon icon={faChevronRight} />
        <S.City>
          <FontAwesomeIcon icon={faLocationDot} />
          {city}
        </S.City>
      </S.Location>

      <S.Title>{title}</S.Title>

      <S.Review>
        <S.Star>
          <FontAwesomeIcon icon={faStar} />
        </S.Star>
        {rated}
        <S.Count>({review_count})</S.Count>
        <S.Right>
          <FontAwesomeIcon icon={faChevronRight} />
        </S.Right>
      </S.Review>
    </S.TitleDetail>
  );
}

export default TitleDetail;
