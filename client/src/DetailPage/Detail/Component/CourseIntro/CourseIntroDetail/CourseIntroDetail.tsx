/* eslint-disable react/react-in-jsx-scope */
import { FC } from 'react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CourseIntroDetail.scss';

interface CourseIntroDetailProps {
    title: string;
    time: string;
    content: string;
    imageSrc: string;
  }

function CourseIntroDetail({ title, time, content, imageSrc }: CourseIntroDetailProps) {
  return(
    <div className="course-information">
      <div className="course">
        
        <div className="course-text">
          <div className="course-icon-title">
            <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
            <p className="course-title">{title}</p>
            <p className="course-time">{time}</p>
          </div>

          <div className="course-line-content">
            <div className="course-line" />
            <p className="course-content">{content}</p>
          </div>
        </div>

        <div className='course-image'>
          <img className="course-img" src={imageSrc} alt={title} />
        </div>

      </div>
    </div>
  )
}

export default CourseIntroDetail;
