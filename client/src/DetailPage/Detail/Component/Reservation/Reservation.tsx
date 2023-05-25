import React, { useEffect, useState } from 'react';
import './Reservation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as solidFaEnelope } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as regularFaEnelope } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

interface ReservationProps {
  itemId: number | null;
  productCode: number;
  startPrice: number;
  likeNum: number;
};

interface ManagerData {
  email: string;
  img: string;
  name: string;
  test: string;
  title: string;
}

function Reservation({ itemId, productCode, startPrice, likeNum }: ReservationProps) {
  /**
   * Manager Data
   */
  const [managerData, setManagerData] = useState<ManagerData>();
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Manager API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/manager-info`)
      .then((response) => {
        setManagerData(response.data.data)

        //console.log(response.data.data)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, [itemId]);

  /**
   * Email Connect
   */
  const handleInquiryClick = () => {
    if (managerData && managerData.email) {
      const subject = encodeURIComponent(`${managerData?.title} 문의하기`);
      const body = encodeURIComponent('안녕하세요, AmuseTravel 입니다 :-)\n\n문의 내용을 입력해주세요.\n\n감사합니다.');
      window.location.href = `mailto:${managerData.email}?subject=${subject}&body=${body}`;
    }
  };


  // Share btn
  const [showTooltip, setShowTooltip] = useState(false);
  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  const handleCopyLink = async (): Promise<void> => {
    console.log(window.location.href);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard!');
    } else {
      console.log('Copying to clipboard is not supported in this browser.');
    }
  };
  


  return (
    <div className="reservation">
      {/* 가격, 티켓선택, 위시 div */}
      <div className="reservation-main">
        {/* 가격, 링크 */}
        <div className="reservation-top">
          <div className="reservation-price">
            <p>시작가</p>
            <p className="price">{startPrice}</p>
            <p>부터</p>
          </div>
          <div className="reservation-link">
            <button className='share-btn' onClick={handleTooltipToggle}>
              <FontAwesomeIcon icon={faShareNodes} className="share-icon" />
            </button>
            {showTooltip && (
              <div className="tooltip">
                <span className='link'>{window.location.href}</span>
                <button className='copy-btn' onClick={handleCopyLink}>링크 복사</button>
              </div>
            )}
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
          <p>{likeNum}명이 이 상품을 위시리스트에 담았습니다</p>
        </div>
      </div>
      {/* 담당자, 문의하기 div */}
      <div className="manager">
        <div className="manager-profile">
          <img className="manager-image" src={managerData?.img ?? "img"} alt="manager" />
          <p className="manager-name">{managerData?.name ?? "name"}</p>
        </div>
        <div
          className="manager-inquiry"
          onClick={handleInquiryClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon className="icon" icon={isHovered ? regularFaEnelope : solidFaEnelope} />
          <p className="inquiry">문의하기</p>
        </div>
      </div>
      {/* 상품코드 div */}
      <div className="product-code">
        <span>상품코드 : &nbsp;</span>
        <span>{productCode}</span>
      </div>
    </div>
  );
}

export default Reservation;
