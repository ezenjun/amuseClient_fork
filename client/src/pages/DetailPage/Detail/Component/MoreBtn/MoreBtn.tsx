import React from 'react';
import './MoreBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function MoreBtn() {
  return (
    <button className="more-btn">
      상품 설명 더 보기
      <FontAwesomeIcon className="icon-down" icon={faChevronDown} />
    </button>
  );
}

export default MoreBtn;
