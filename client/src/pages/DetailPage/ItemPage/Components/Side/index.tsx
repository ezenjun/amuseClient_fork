import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as solidFaEnelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as regularFaEnelope } from "@fortawesome/free-regular-svg-icons";
import { GuideData } from "../../../../../Interfaces/DataInterfaces";
import Payment from "../../../../../components/Payment";
import Share from "./Icons/share.svg";
import Heart from "./Icons/wish.svg";
import * as S from "./style";
import * as C from "./constants";
import axios from "axios";

interface SideProps {
  itemId: number;
  productCode: number;
  likeNum: number;
}

function Side({ itemId, productCode, likeNum }: SideProps) {
  // startPrice API
  const [startPrice, setStartPrice] = useState(0);
  const [hashTags, setHashTags] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
      .then((response) => {
        setStartPrice(response.data.data.startPrice);
        setHashTags(response.data.data.hashTagInfoList);
      })
      .catch((error) => {
        console.log("Side, startPrice 연결 실패");
      });
  }, [itemId]);

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
        console.log("Side, Manager 연결 실패");
      });
  }, [itemId]);

  // Email Connect
  const handleInquiryClick = () => {
    if (guideData && guideData.email) {
      const subject = encodeURIComponent(C.EMAIL.TITLE);
      const body = encodeURIComponent(C.EMAIL.BODY);
      window.location.href = `mailto:${guideData.email}?subject=${subject}&body=${body}`;
    }
  };

  // Share button
  const handleTooltipToggle = async () => {
    await navigator.clipboard.writeText(window.location.href).then(() => {
      alert("링크가 복사되었습니다. :)");
    });
  };

  // WishList
  const [isLiked, setIsLiked] = useState<boolean[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);

  const handleLikeClick = (itemId: number) => {
    const updatedIsLiked = [...isLiked];
    updatedIsLiked[itemId] = !updatedIsLiked[itemId];
    setIsLiked(updatedIsLiked);
    const token = cookies["__jwtkid__"];
    const data = {
      categoryName: hashTags,
    };
    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/like-plus`,
          data,
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
          console.error("Side 위시리스트 에러", error);
        });
    }
    if (token === undefined) {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <S.Side>
      <S.Main>
        {startPrice ? (
          <>
            <S.StartPrice>{C.Side.START_PRICE}</S.StartPrice>
            <S.Info>
              <S.Price>
                <S.PriceNum>
                  {startPrice.toLocaleString("en")}
                  {C.Side.WON}
                </S.PriceNum>
                <S.PriceMin>~</S.PriceMin>
              </S.Price>
              <S.Share src={Share} onClick={handleTooltipToggle} />
            </S.Info>
          </>
        ) : (
          <S.Info>
            <S.StartPrice>{C.Side.PREPARE}</S.StartPrice>
            <S.Share src={Share} onClick={handleTooltipToggle} />
          </S.Info>
        )}
        <Payment version="ver1" />
        <S.Wish onClick={() => handleLikeClick(itemId)}>
          <S.Heart src={Heart} />
          {C.Side.WISH}
        </S.Wish>
        <S.HeartCount>
          {likeNum === undefined ? 0 : likeNum}
          {C.Side.WISH_NUMBER}
        </S.HeartCount>
      </S.Main>

      <S.Manager>
        <S.Profile>
          <S.ProfileImg src={guideData?.profileImageUrl ?? "img"} />
          <S.ProfileName>{guideData?.userName ?? "name"}</S.ProfileName>
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
          <S.InquiryText>{C.Side.INQUIRY}</S.InquiryText>
        </S.Inquiry>
      </S.Manager>

      <S.ProductCode>
        <S.ProductCodeText>
          {C.Side.CODE}
          {productCode}
        </S.ProductCodeText>
      </S.ProductCode>
    </S.Side>
  );
}

export default Side;
