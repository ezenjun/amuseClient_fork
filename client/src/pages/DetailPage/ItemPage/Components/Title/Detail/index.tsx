import React, { useEffect, useState } from "react";
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
  review: number;
  startPrice: number;
}

function TitleDetail({
  country,
  city,
  title,
  rated,
  review,
  startPrice,
}: TitleDetailProps) {
  const [mobileHeader, setMobileHeader] = useState(0);
  const handleResize = () => {
    if (window.innerWidth > 768) setMobileHeader(0);
    else setMobileHeader(1);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <S.Info>
        <S.Review>
          <S.Star>
            <FontAwesomeIcon icon={faStar} />
          </S.Star>
          {rated}
          <S.Count>({review})</S.Count>
          <S.Right>
            <FontAwesomeIcon icon={faChevronRight} />
          </S.Right>
        </S.Review>
        {mobileHeader === 1 && (
          <S.StartPrice>
            <S.Text>시작가</S.Text>
            <S.Price>{startPrice.toLocaleString("en")}원</S.Price>
            <S.Start>~</S.Start>
          </S.StartPrice>
        )}
      </S.Info>
    </S.TitleDetail>
  );
}

export default TitleDetail;
