import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { MapData } from "../../../../../Interfaces/DataInterfaces";
import axios from "axios";
import JsMap from "./Detail/JsMap";
import * as S from "./style";

function Map({ itemId }: ItemIdProps) {
  // Map Data
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Map API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/course-intro`)
      .then((response) => {
        setMapData(response.data.data.course);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  // Select Day
  useEffect(() => {
    if (mapData.length > 0) setSelectedDay(mapData[0].day);
  }, [mapData]);

  const uniqueDays = Array.from(new Set(mapData.map((data) => data.day)));

  // Click Button
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };
  return (
    <>
      {mapData.length > 0 ? (
        <>
          <S.Day>
            {uniqueDays.map((day) => {
              if (Number(day) > 0)
                return (
                  <S.DayButton
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={selectedDay === day ? "selected" : ""}
                  >
                    {day + "일차"}
                  </S.DayButton>
                );
            })}
          </S.Day>
          {selectedDay ?? (
            <JsMap
              key={selectedDay}
              data={mapData.filter((item) => item.day === selectedDay)}
            />
          )}
        </>
      ) : (
        <S.Map></S.Map>
      )}
    </>
  );
}

export default Map;
