import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CourseIntroDetailProps } from "../../../../../../Interfaces/PropsInterfaces";
import * as S from "./style";

function CourseIntroDetail({
  title,
  time,
  content,
  imageSrc,
}: CourseIntroDetailProps) {
  return (
    <S.CourseIntro>
      <S.Image src={imageSrc} alt={title} />
      <S.Divide>
        <S.Icon>
          <FontAwesomeIcon icon={faLocationDot} />
        </S.Icon>
        <S.Line></S.Line>
      </S.Divide>

      <S.Content>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Time>{time}</S.Time>
        </S.Header>
        <S.Body>{content}</S.Body>
      </S.Content>
    </S.CourseIntro>
  );
}

export default CourseIntroDetail;
