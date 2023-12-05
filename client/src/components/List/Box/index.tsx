import { useState } from "react";
import { useCookies } from "react-cookie";
import HeartIcon from "../Icons/heart.svg";
import HeartFullIcon from "../Icons/heart_full.svg";
import axios from "axios";
import * as S from "./style";

export interface BoxProps {
  itemId: number;
  handleClick: () => void;
  title: string;
  startPrice: string;
  imageUrl: string;
  hashTags?: string[];
}

function Box({
  itemId,
  handleClick,
  title,
  startPrice,
  imageUrl,
  hashTags,
}: BoxProps) {
  const [isLiked, setIsLiked] = useState<boolean[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);

  const handleLikeClick = (itemId: number) => {
    const updatedIsLiked = [...isLiked];
    updatedIsLiked[itemId] = !updatedIsLiked[itemId];
    setIsLiked(updatedIsLiked);
    const token = cookies["__jwtkid__"];
    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/like-plus`,
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          alert(
            "관심상품에 등록되었습니다.\n관심상품 관리는 마이페이지에서 가능합니다."
          );
        })
        .catch((error) => {
          console.error("Box 위시리스트 에러", error);
        });
    }
    if (token === undefined) {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <S.Box>
      <S.Photo>
        <S.BoxImage src={imageUrl} onClick={handleClick} />
        <S.BoxLike>
          <S.HeartIcon
            src={isLiked[itemId] ? HeartFullIcon : HeartIcon}
            alt="heartIcon"
            onClick={() => handleLikeClick(itemId)}
          />
        </S.BoxLike>
      </S.Photo>

      <S.Content>
        <S.BoxTitle onClick={handleClick}>{title}</S.BoxTitle>
        <S.BoxPrice onClick={handleClick}>
          {startPrice !== "N/A" ? <p>가격 : {startPrice}원 ~</p> : <></>}
        </S.BoxPrice>
      </S.Content>
    </S.Box>
  );
}

export default Box;
