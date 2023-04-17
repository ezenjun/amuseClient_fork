import React from 'react';
import './IconInfo.scss';
import {
  faCalendar, faLanguage, faRoad, faRoute,
} from '@fortawesome/free-solid-svg-icons';
import IconDetail from './IconDetail/IconDetail';

function IconInfo() {
  return (
    <div className="Detail-icon-info">
      <IconDetail icon={faRoad} text="차량 이동" />
      <IconDetail icon={faCalendar} text="2박 3일" />
      <IconDetail icon={faLanguage} text="한국어" />
      <IconDetail icon={faRoute} text="강도 보통" />
    </div>
  );
}

export default IconInfo;
