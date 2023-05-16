import React from 'react';
import './Reservation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';


function Reservation() {
  return (
    <div className="reservation">
      {/* 가격, 티켓선택, 위시 div */}
      <div className="reservation-main">
        {/* 가격, 링크 */}
        <div className="reservation-top">
          <div className="reservation-price">
            <p>시작가</p>
            <p className="price">511,000원</p>
            <p>부터</p>
          </div>
          <div className="reservation-link">
            <FontAwesomeIcon icon={faShareNodes} className="share-icon" />
          </div>
        </div>
        {/* 티켓 선택 btn */}
        <div className="selectticket-btn-div">
          <button className="selectticket-btn">티켓 선택</button>
        </div>
        {/* 위시리스트 담기 btn */}
        <div className="wishlist-btn-div">
          <button className="wishlist-btn">
            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            위시리스트 담기
          </button>
        </div>
        {/* 위시리스트에 담은 사람 수 div */}
        <div className="wish-people">
          <p>102명이 이 상품을 위시리스트에 담았습니다</p>
        </div>
      </div>
      {/* 담당자, 문의하기 div */}
      <div className="manager">
        <div className="manager-profile">
          <img className="manager-image" src="./images/manager.jpeg" alt="manager" />
          <p className="manager-name">김찬중</p>
        </div>
        <div className="manager-inquiry">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <p className="inquiry">문의하기</p>
        </div>
      </div>
      {/* 상품코드 div */}
      <div className="product-code">
        <span>상품코드 : &nbsp;</span>
        <span>DOM-601CE6F918070</span>
      </div>
    </div>
  );
}

export default Reservation;
