import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { CourseIntroData } from "../../../../../Interfaces/DataInterfaces";
import Detail from "./Detail";
import axios from "axios";
import * as S from "./style";
import * as C from "./constants";

function CourseIntro({ itemId }: ItemIdProps) {
	// CourseIntro Data
	const [courseIntroData, setCourseIntroData] = useState<CourseIntroData[]>(
		[]
	);

	// CourseIntro API
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/course-intro`
			)
			.then((response) => {
				setCourseIntroData(response.data.data.course);
			})
			.catch((error) => {
				console.log("CourseIntro 연결 실패");
			});
	}, [itemId]);

	return (
		<S.CourseIntro>
			<S.Title>{C.CourseIntro.TITLE}</S.Title>
			{courseIntroData.map((courseIntro) => {
				return (
					<>
						<S.DayTitle>
							{courseIntro.day}
							{C.CourseIntro.DAY}
						</S.DayTitle>
						{courseIntro.dayCourseList.map((course) => {
							return (
								<Detail
									key={course.id}
									title={course.title}
									time={course.timeCost}
									content={course.content}
									imageSrc={course.image}
								/>
							);
						})}
					</>
				);
			})}
		</S.CourseIntro>
	);
}

export default CourseIntro;
