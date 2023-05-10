import React, { useEffect, useState } from 'react';
import axios from "axios";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CourseIntro.scss';
import CourseIntroDetail from './CourseIntroDetail/CourseIntroDetail';

type CourseIntroProps = {
  itemId: number | null;
};

type CourseIntroData = {
  title: string;
  content: string;
  sequenceId: number;
  timeCost: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
};

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
      .get(`https://ammuse.store/detail/${itemId}/course-intro`)
      .then((response) => {

        setCourseIntroData(response.data.data.course);
        //console.log(response.data.data.course)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, []);

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
