import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as solidFaEnelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as regularFaEnelope } from "@fortawesome/free-regular-svg-icons";
import { GuideData } from "../../../../../Interfaces/DataInterfaces";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import axios from "axios";
import * as S from "./style";

function Manager({ itemId }: ItemIdProps) {
  // Manager Data
  const [guideData, setGuideData] = useState<GuideData>();
  const [isHovered, setIsHovered] = useState(false);

  // Manager API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/guide-info`)
      .then((response) => {
        setGuideData(response.data.data);
      })
      .catch((error) => {
        console.log("가이드 연결 실패");
      });
  }, [itemId]);

  // Email Connect
  const handleInquiryClick = () => {
    if (guideData && guideData.email) {
      const subject = encodeURIComponent(`[어뮤즈트래블 상품 문의하기]`);
      const body = encodeURIComponent(
        "안녕하세요, AmuseTravel 입니다 :-)\n\n아래에 문의 내용을 입력해주세요.\n\n감사합니다.\n\n---------------------\n\n"
      );
      window.location.href = `mailto:${guideData.email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <S.Manager>
      <S.Header>
        <S.Profile>
          <S.Image src={guideData?.profileImageUrl ?? "img"} alt="manager" />
          <S.Name>{guideData?.userName ?? "name"}</S.Name>
        </S.Profile>

        <S.Inquiry
          onClick={handleInquiryClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isHovered ? regularFaEnelope : solidFaEnelope}
          />
          <S.Text>문의하기</S.Text>
        </S.Inquiry>
      </S.Header>

      <S.Info>{guideData?.guide_comment_by_item ?? ""}</S.Info>
    </S.Manager>
  );
}

export default Manager;
