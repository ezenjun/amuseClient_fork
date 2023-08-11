import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IconInfo.scss";
import { faCalendar, faLanguage, faRoad, faRoute } from "@fortawesome/free-solid-svg-icons";
import IconDetail from "./IconDetail/IconDetail";
import { ItemIdProps } from "../../../../Interfaces/PropsInterfaces";
import { IconInfoData } from "../../../../Interfaces/DataInterfaces";

function IconInfo({ itemId }: ItemIdProps) {
  /**
   * IconInfo Data
   */
  const [iconInfoData, setIconInfoData] = useState<IconInfoData[]>([]);
  const [startPoint, setStartPoint] = useState<string>("00");
  const [runningTime, setRunningTime] = useState<number>(0);
  const [minusOne, setMinusOne] = useState<number>(0);
  const [language, setLanguage] = useState<string>("한국어");
  const [activityIntensity, setActivityIntensity] = useState<string>("강도 보통");

  /**
   * IconInfo API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
      .then((response) => {
        console.log("아이콘 데이터", response.data.data);
        const res = response.data.data;
        if (res.activityIntensity) setActivityIntensity(res.activityIntensity);
        if (res.startPoint) setStartPoint(res.stratPoint);
        if (res.language) setLanguage(res.language);
        if (res.runningTime) {
          setRunningTime(res.runningTime);
          setMinusOne(res.runningTime - 1);
        }
        console.log(response.data.data.icon_infos);
      })
      .catch((error) => {
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
      <IconDetail icon={faRoad} text={`${startPoint} 출발`} />
      <IconDetail icon={faCalendar} text={`${minusOne}박 ${runningTime}일`} />
      <IconDetail icon={faLanguage} text={language} />
      <IconDetail icon={faRoute} text={activityIntensity} />
    </div>
  );
}

export default IconInfo;
