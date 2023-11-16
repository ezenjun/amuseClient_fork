import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import Sub from "../Picture/Sub";
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
  const subReviewPicture = reviewPicture.slice(0, 4);

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
      <S.Sub>
        {subReviewPicture.map((picture, key) => (
          <Sub
            src={picture}
            alt={picture}
            modal={reviewPicture}
            clickId={key + 1}
          />
        ))}
      </S.Sub>
    </S.Picture>
  );
}

export default ReviewPicture;
