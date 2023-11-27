import StarIcon from "../../../../../../assets/Icons/star.svg";
import Sub from "../../Picture/Sub";
import * as S from "./style";
import * as C from "../constants";

interface ReviewDetailProps {
  name: string;
  content: string;
  rate: number;
  date: string;
  img: { review_img: string }[];
}

function ReviewDetail({ name, content, rate, date, img }: ReviewDetailProps) {
  const reviewPicture = img ? img.map((obj) => obj.review_img) : [];
  const subReviewPicture = reviewPicture.slice(0, 4);
  const hideName =
    name.length <= 1 ? name : name[0] + "*".repeat(name.length - 1);

  return (
    <S.ReviewDetail>
      <S.Title>
        <S.User>
          <S.StarIcon src={StarIcon} alt="star" />
          <S.Rated>
            <S.Score>{rate}</S.Score>
            {C.REVIEW.RATED}
          </S.Rated>
          <S.Name>{hideName}</S.Name>
        </S.User>
        <S.Date>{date}</S.Date>
      </S.Title>
      <S.Content>{content}</S.Content>
      <S.Sub>
        {subReviewPicture.map((picture, key) => (
          <Sub
            src={picture}
            alt={picture}
            modal={reviewPicture}
            clickId={key + 1}
            type="review"
          />
        ))}
      </S.Sub>
      <S.Divider />
    </S.ReviewDetail>
  );
}

export default ReviewDetail;
