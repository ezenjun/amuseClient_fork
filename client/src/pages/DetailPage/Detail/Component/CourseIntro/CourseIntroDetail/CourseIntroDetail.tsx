/* eslint-disable react/react-in-jsx-scope */
import { FC } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CourseIntroDetail.scss";
import { CourseIntroDetailProps } from "../../../../../../interfaces/PropsInterfaces";

function CourseIntroDetail({
  title,
  time,
  content,
  imageSrc,
  day,
}: CourseIntroDetailProps) {
  return (
    <div className="course-information">
      <div className="course" style={{ flexDirection: "column" }}>
        <div style={{ fontSize: 12, fontWeight: "bold" }}>{`${day}일차`}</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="course-line">
            <div className="icon">
              <FontAwesomeIcon className="icon-location" icon={faLocationDot} />
            </div>
            <div className="line"></div>
          </div>

          <div className="course-text-image">
            <div className="course-text">
              <div className="course-title-time">
                <p className="title" style={{ textAlign: "left" }}>
                  {title}
                </p>
                <p className="time">{time}</p>
              </div>
              <div className="course-content">
                <p className="content" style={{ whiteSpace: "pre-wrap" }}>
                  {content}
                </p>
              </div>
            </div>

            <div className="course-image">
              <img className="course-img" src={imageSrc} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseIntroDetail;
