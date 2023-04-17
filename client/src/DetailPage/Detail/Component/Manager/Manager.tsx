/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './Manager.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

function Manager() {
  return (
    <div className="Manager">
      <div className="manager-profile">
        <img className="manager-image" src="./images/manager.jpeg" alt="manager" />
        <p className="manager-name">김찬중</p>
        <div className="manager-inquiry">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <p className="inquiry">문의하기</p>
        </div>
      </div>
      <div className="manager-info">
        <p>
          어린이 돌봄여행 코스는 창의력 향상과 자아 탐색에 도움이 될 수 있도록 구성하였습니다.
          <br />
          어르신 돌봄여행 코스는 활동강도가 높지 않아서 누구나 여행을 즐길 수 있도록 구성하였습니다.
          <br />
          자세한 상담을 원하시는 분들은 02-719-6811으로 문의바랍니다.
        </p>
      </div>
    </div>
  );
}

export default Manager;
