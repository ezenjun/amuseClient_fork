import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseIntro.scss";
import CourseIntroDetail from "./CourseIntroDetail/CourseIntroDetail";
import { ItemIdProps } from "../../../../interfaces/PropsInterfaces";
import { CourseIntroData } from "../../../../interfaces/DataInterfaces";

function CourseIntro({ itemId }: ItemIdProps) {
  /**
   * CourseIntro Data
   */
  const [courseIntroData, setCourseIntroData] = useState<CourseIntroData[]>([]);

  /**
   * CourseIntro API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/course-intro`)
      .then((response) => {
        setCourseIntroData(response.data.data.course);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div
      className="CourseIntro"
      style={{ display: courseIntroData.length === 0 ? "none" : "block" }}
    >
      <p className="information-title">코스 소개</p>
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
    </div>
  );
}

export default CourseIntro;
