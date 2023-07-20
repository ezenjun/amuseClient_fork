import React, { useEffect, useState } from "react";
import "./Map.scss";
import MapDetail from "./MapDetail/MapDetail";
import axios from "axios";

interface MapProps {
  itemId: number | null;
}

interface MapData {
  title: string;
  content: string;
  day: number;
  sequenceId: number;
  timeCost: string;
  latitude: number;
  longitude: number;
}

function Map({ itemId }: MapProps) {
  /**
   * Map Data
   */
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  /**
   * Map API
   */
  useEffect(() => {
    axios
      .get(`https://vikrant.store/detail/${itemId}/course-intro`)
      .then((response) => {
        setMapData(response.data.data.course);
        //console.log(response.data.data.course)
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  /**
   * Select Day
   */
  useEffect(() => {
    if (mapData.length > 0) {
      setSelectedDay(mapData[0].day);
    }
  }, [mapData]);

  const uniqueDays = Array.from(new Set(mapData.map((data) => data.day)));

  /**
   * Click Button
   */
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className="Map">
      <div className="day-button">
        {uniqueDays.map((day) => (
          <button key={day} onClick={() => handleDayClick(day)} className={selectedDay === day ? "selected" : ""}>
            {day + "일차"}
          </button>
        ))}
      </div>
      {selectedDay && <MapDetail key={selectedDay} data={mapData.filter((item) => item.day === selectedDay)} />}
    </div>
  );
}

export default Map;
