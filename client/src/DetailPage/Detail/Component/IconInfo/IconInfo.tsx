import React, { useEffect, useState } from 'react';
import axios from "axios";
import './IconInfo.scss';
import { faCalendar, faLanguage, faRoad, faRoute } from '@fortawesome/free-solid-svg-icons';
import IconDetail from './IconDetail/IconDetail';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconInfoProps {
  itemId: number | null;
};

interface IconInfoData {
  icon: IconProp;
  text: string;
};

function IconInfo({ itemId }: IconInfoProps) {
  /**
   * IconInfo Data
   */
  const [iconInfoData, setIconInfoData] = useState<IconInfoData[]>([]);
  
  /**
   * IconInfo API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/icon-info`)
      .then((response) => {
        setIconInfoData(response.data.data.icon_infos)

        //console.log(response.data.data.icon_infos)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="Detail-icon-info">
      {/*
      {iconInfoData.map((iconInfo) => (
        <IconDetail icon={iconInfo.icon} text={iconInfo.text}/>
      ))}
      */}
      <IconDetail icon={faRoad} text="차량 이동" />
      <IconDetail icon={faCalendar} text="2박 3일" />
      <IconDetail icon={faLanguage} text="한국어" />
      <IconDetail icon={faRoute} text="강도 보통" />
    </div>
  );
}

export default IconInfo;
