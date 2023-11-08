import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import SubPicture from "../Picture/Sub";
import axios from "axios";
import * as S from "./style";
import * as C from "./constants";

function ReviewPicture({ itemId }: ItemIdProps) {
  // Review Picture Data
  const [reviewPictureData, setReviewPictureData] = useState<
    { review_img: string }[]
  >([]);
  const reviewPicture = reviewPictureData
    ? reviewPictureData.map((obj) => obj.review_img)
    : [];
  const subReviewPicture = reviewPicture.slice(0, 3);

  // Review Picture API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/review`)
      .then((response) => {
        setReviewPictureData(response.data.data.review_all_imgs);
      })
      .catch((error) => {
        console.log("Review 연결 실패");
      });
  }, [itemId]);

  return (
    <S.Picture>
      <S.Title>
        <S.Content>{C.REVIEW.TITLE}</S.Content>
        <S.Count>
          {0}
          {C.REVIEW.COUNT}
        </S.Count>
      </S.Title>
      <S.SubPicture>
        {subReviewPicture.map((picture, idx) => (
          <SubPicture
            src={picture}
            alt={picture}
            modal={reviewPicture}
            clickId={0}
          />
        ))}
      </S.SubPicture>
    </S.Picture>
  );
}

export default ReviewPicture;
