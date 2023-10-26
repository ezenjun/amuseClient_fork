import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as solidFaEnelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as regularFaEnelope } from "@fortawesome/free-regular-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { GuideData } from "../../../../../Interfaces/DataInterfaces";
import { useCookies } from "react-cookie";
import Share from "./share.svg";
import Heart from "./wish.svg";
import * as S from "./style";
import axios from "axios";
import "./Reservation.scss";

interface ReservationProps {
  itemId: number | null;
  productCode: number;
  likeNum: number;
}

function Reservation({ itemId, productCode, likeNum }: ReservationProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
  const movePage = useNavigate();
  const { orderData, setOrderData, orderTicketData } = useOrderContext();

  /**
   * startPrice API
   */
  const [startPrice, setStartPrice] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
      .then((response) => {
        setStartPrice(response.data.data.startPrice);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  /**
   * Manager Data
   */
  const [guideData, setGuideData] = useState<GuideData>();
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Manager API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/guide-info`)
      .then((response) => {
        setGuideData(response.data.data);

        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  /**
   * Email Connect
   */
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

  /**
   * Ticket Button
   */
  const handleButtonClick = () => {
    handleBuyTicket();
  };

  const handleBuyTicket = () => {
    if (cookies.__jwtkid__) {
      let count = 0;
      for (let i = 0; i < orderTicketData.length; i++) {
        if (orderTicketData[i].count) count += 1;
      }
      if (count > 0) movePage("/order");
      else alert("티켓을 선택해 주세요");
    } else {
      alert("로그인이 필요합니다.");
    }
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
        <S.Payment onClick={handleButtonClick}>결제</S.Payment>
        <S.Wish>
          <S.Heart src={Heart} />
          위시리스트
        </S.Wish>
        <S.HeartCount>
          {likeNum === undefined ? 0 : likeNum}명이 이 상품을 위시리스트에
          담았습니다
        </S.HeartCount>
      </S.Main>

      {/* 담당자, 문의하기 div */}
      <div className="manager" style={{ marginTop: 32 }}>
        <div className="manager-profile">
          <img
            className="manager-image"
            src={guideData?.profileImageUrl ?? "img"}
            alt="manager"
          />
          <p className="manager-name">{guideData?.userName ?? "name"}</p>
        </div>
        <div
          className="manager-inquiry"
          onClick={handleInquiryClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isHovered ? regularFaEnelope : solidFaEnelope}
          />
          <p className="inquiry">문의하기</p>
        </div>
      </div>
      {/* 상품코드 div */}
      <div className="product-code">
        <span>상품코드 : &nbsp;</span>
        <span>{productCode}</span>
      </div>
    </S.Reservation>
  );
}

export default Reservation;
