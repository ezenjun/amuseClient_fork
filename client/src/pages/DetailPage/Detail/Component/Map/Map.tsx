import React, { useEffect, useState } from "react";
import "./Map.scss";
// import MapDetail from "./MapDetail/MapDetail";
import axios from "axios";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { MapData } from "../../../../../Interfaces/DataInterfaces";
import JsMap from "./MapDetail/JsMap";

function Map({ itemId }: ItemIdProps) {
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
			.get(
				`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/course-intro`
			)
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
				{uniqueDays.map((day) => {
					if (Number(day) > 0)
						return (
							<button
								key={day}
								onClick={() => handleDayClick(day)}
								className={
									selectedDay === day ? "selected" : ""
								}
							>
								{day + "일차"}
							</button>
						);
				})}
			</div>
			{selectedDay ? (
				<JsMap
					key={selectedDay}
					data={mapData.filter((item) => item.day === selectedDay)}
				/>
			) : (
				<></>
			)}
		</div>
	);
}

export default Map;
