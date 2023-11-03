import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { CourseIntroData } from "../../../../../Interfaces/DataInterfaces";
import CourseIntroDetail from "./CourseIntroDetail";
import axios from "axios";
import * as S from "./style";
import * as C from "./constants";

function CourseIntro({ itemId }: ItemIdProps) {
  // CourseIntro Data
  const [courseIntroData, setCourseIntroData] = useState<CourseIntroData[]>([]);

  // CourseIntro API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/course-intro`)
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
      {/* !!FIX 일차별로 묶기*/}
      {courseIntroData.map((courseIntro) => {
        return (
          <CourseIntroDetail
            key={courseIntro.title}
            title={courseIntro.title}
            time={courseIntro.timeCost}
            content={courseIntro.content}
            imageSrc={courseIntro.imageUrl}
            day={courseIntro.day}
          />
        );
      })}
    </S.CourseIntro>
  );
}

export default CourseIntro;
