/* eslint-disable react/react-in-jsx-scope */
import { FC } from 'react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CourseIntroDetail.scss';
import { CourseIntroDetailProps } from '../../../../../Interfaces/PropsInterfaces';

function CourseIntroDetail({ title, time, content, imageSrc }: CourseIntroDetailProps) {
  return(
    <div className="course-information">
      <div className="course">
        
        <div className="course-line">
          <div className='icon'>
            <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
          </div>
          <div className="line"></div>
        </div>

        <div className='course-text-image'>
          <div className="course-text">
            <div className="course-title-time">
              <p className="title">{title}</p>
              <p className="time">{time}{" 시간"}</p>
            </div>
            <div className='course-content'>
              <p className="content">{content}</p>
            </div>
          </div>

          <div className='course-image'>
            <img className="course-img" src={imageSrc} alt={title} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default CourseIntroDetail;
