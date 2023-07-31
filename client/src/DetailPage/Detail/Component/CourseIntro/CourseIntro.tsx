import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseIntro.scss";
import CourseIntroDetail from "./CourseIntroDetail/CourseIntroDetail";

interface CourseIntroProps {
  itemId: number | null;
}

interface CourseIntroData {
  title: string;
  content: string;
  sequenceId: number;
  timeCost: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

function CourseIntro({ itemId }: CourseIntroProps) {
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
        //console.log(response.data.data.course)
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="CourseIntro">
      <p className="information-title">코스 소개</p>
      {courseIntroData.map((courseIntro) => (
        <CourseIntroDetail
          title={courseIntro.title}
          time={courseIntro.timeCost}
          content={courseIntro.content}
          imageSrc={courseIntro.imageUrl}
        />
      ))}
    </div>
  );
}

export default CourseIntro;
