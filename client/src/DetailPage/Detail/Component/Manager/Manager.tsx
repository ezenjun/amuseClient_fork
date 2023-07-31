import React, { useEffect, useState } from "react";
import "./Manager.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as solidFaEnelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as regularFaEnelope } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

interface ManagerProps {
  itemId: number | null;
}

interface ManagerData {
  email: string;
  img: string;
  name: string;
  manager_content: string;
  title: string;
}

function Manager({ itemId }: ManagerProps) {
  /**
   * Manager Data
   */
  const [managerData, setManagerData] = useState<ManagerData>();
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Manager API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/manager-info`)
      .then((response) => {
        setManagerData(response.data.data);

        //console.log(response.data.data)
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  /**
   * Email Connect
   */
  const handleInquiryClick = () => {
    if (managerData && managerData.email) {
      const subject = encodeURIComponent(`${managerData?.title} 문의하기`);
      const body = encodeURIComponent("안녕하세요, AmuseTravel 입니다 :-)\n\n문의 내용을 입력해주세요.\n\n감사합니다.");
      window.location.href = `mailto:${managerData.email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="Manager">
      <div className="manager-header">
        <div className="manager-profile">
          <img className="manager-image" src={managerData?.img ?? "img"} alt="manager" />
          <p className="manager-name">{managerData?.name ?? "name"}</p>
        </div>

        <div
          className="manager-inquiry"
          onClick={handleInquiryClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon className="icon" icon={isHovered ? regularFaEnelope : solidFaEnelope} />
          <p className="inquiry">문의하기</p>
        </div>
      </div>

      <div className="manager-info">
        <p>{managerData?.manager_content ?? "manager_content"}</p>
      </div>
    </div>
  );
}

export default Manager;
