import StarIcon from "../../../../../../assets/Icons/star.svg";
import * as S from "./style";
import * as C from "../constants";

interface ReviewDetailProps {
  name: string;
  content: string;
  rate: number;
  date: string;
  img: string;
}

function ReviewDetail({ name, content, rate, date, img }: ReviewDetailProps) {
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
      <S.Divider />
    </S.ReviewDetail>
  );
}

export default ReviewDetail;
