import React, { useEffect, useState } from 'react';
import './Map.scss';
import MapDetail from './MapDetail/MapDetail';
import axios from 'axios';

type MapProps = {
  itemId: number | null;
};

type MapData = {
  title: string;
  content: string;
  sequenceId: number;
  timeCost: string;
  latitude: number;
  longitude: number;
};

const mapEx = [
  { day: 1, lat: 37.5994, lng: 126.8653, title: '해상 케이블카' },
  { day: 1, lat: 37.5984, lng: 126.8683, title: '하멜 등대' },
  { day: 1, lat: 37.5974, lng: 126.8693, title: '벽화마을' },
  { day: 2, lat: 35.6000, lng: 126.8653, title: '부산 바다' },
  { day: 2, lat: 35.6005, lng: 126.8653, title: '여수 밤바다' },
  { day: 3, lat: 37.6012, lng: 126.9501, title: '우리집' },
];

function Map({ itemId }: MapProps) {

  const uniqueDays = Array.from(new Set(mapEx.map(item => item.day)));
  const [selectedDay, setSelectedDay] = useState<number | null>(uniqueDays[0] || null);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className='Map'>
      <div className='day-button'>
        {uniqueDays.map((day) => (
          <button 
            key={day}
            onClick={() => handleDayClick(day)}
            className={selectedDay === day ? 'selected' : ''}
          >
            {day + "일차"}
          </button>
        ))}
      </div>
      {selectedDay && (
        <MapDetail
          key={selectedDay}
          data={mapEx.filter((item) => item.day === selectedDay)}
        />
      )}
    </div>
  );
}

export default Map;
