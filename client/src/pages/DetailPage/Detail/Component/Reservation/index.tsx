import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as solidFaEnelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as regularFaEnelope } from "@fortawesome/free-regular-svg-icons";
import { GuideData } from "../../../../../Interfaces/DataInterfaces";
import Payment from "../../../../../components/Payment";
import Share from "./share.svg";
import Heart from "./wish.svg";
import * as S from "./style";
import axios from "axios";

interface ReservationProps {
  itemId: number | null;
  productCode: number;
  likeNum: number;
}

function Reservation({ itemId, productCode, likeNum }: ReservationProps) {
  // startPrice API
  const [startPrice, setStartPrice] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
      .then((response) => {
        setStartPrice(response.data.data.startPrice);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  // Manager Data
  const [guideData, setGuideData] = useState<GuideData>();
  const [isHovered, setIsHovered] = useState(false);

  // Manager API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/guide-info`)
      .then((response) => {
        setGuideData(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  // Email Connect
  const handleInquiryClick = () => {
    if (guideData && guideData.email) {
      const subject = encodeURIComponent(`[어뮤즈트래블 상품 문의하기]`);
      const body = encodeURIComponent(
        "안녕하세요, AmuseTravel 입니다 :-)\n\n아래에 문의 내용을 입력해주세요.\n\n감사합니다.\n\n---------------------\n\n"
      );
      window.location.href = `mailto:${guideData.email}?subject=${subject}&body=${body}`;
    }
  };

  // Share btn
  const [showTooltip, setShowTooltip] = useState(false);
  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <S.Reservation>
      <S.Main>
        {startPrice ? (
          <>
            <S.StartPrice>시작가</S.StartPrice>
            <S.Info>
              <S.Price>
                <S.PriceNum>{startPrice.toLocaleString("en")}원</S.PriceNum>
                <S.PriceMin>~</S.PriceMin>
              </S.Price>
              <S.Share src={Share} onClick={handleTooltipToggle} />
            </S.Info>
          </>
        ) : (
          <S.Info>
            <S.StartPrice>{"상품 준비중"}</S.StartPrice>
            <S.Share src={Share} onClick={handleTooltipToggle} />
          </S.Info>
        )}
        <Payment />
        <S.Wish>
          <S.Heart src={Heart} />
          위시리스트
        </S.Wish>
        <S.HeartCount>
          {likeNum === undefined ? 0 : likeNum}명이 이 상품을 위시리스트에
          담았습니다
        </S.HeartCount>
      </S.Main>

      <S.Manager>
        <S.Profile>
          <S.ProfileImg src={guideData?.profileImageUrl ?? "img"} />
          <S.ProfileName>{guideData?.userName ?? "name"}</S.ProfileName>
        </S.Profile>

        <S.Inquiry
          onClick={handleInquiryClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isHovered ? regularFaEnelope : solidFaEnelope}
          />
          <S.InquiryText>문의하기</S.InquiryText>
        </S.Inquiry>
      </S.Manager>

      <S.ProductCode>
        <S.ProductCodeText>상품코드 : {productCode}</S.ProductCodeText>
      </S.ProductCode>
    </S.Reservation>
  );
}

export default Reservation;
