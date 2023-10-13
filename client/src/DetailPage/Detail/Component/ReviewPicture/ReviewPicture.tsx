import React, { useEffect, useState } from "react";
import "./ReviewPicture.scss";
import SubPicture from "../Picture/SubPicture/SubPicture";
import axios from "axios";
import { ItemIdProps } from "../../../../interfaces/PropsInterfaces";

function ReviewPicture({ itemId }: ItemIdProps) {
  /**
   * Review Picture Data
   */
  const [reviewPictureData, setReviewPictureData] = useState<
    { review_img: string }[]
  >([]);
  const reviewPicture = reviewPictureData
    ? reviewPictureData.map((obj) => obj.review_img)
    : [];
  const subReviewPicture = reviewPicture.slice(0, 3);

  /**
   * Review Picture API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/review`)
      .then((response) => {
        setReviewPictureData(response.data.data.review_all_imgs);

        //console.log(response.data.data.review_all_imgs)
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="ReviewPicture">
      <p className="review-title">여행자 후기 사진</p>
      <div className="subpicture">
        {subReviewPicture.map((picture, idx) => (
          <SubPicture
            src={picture}
            alt={picture}
            itemId={idx}
            modal={reviewPicture}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewPicture;
