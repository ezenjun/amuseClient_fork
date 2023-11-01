import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { useSetRecoilState } from "recoil";
import { selectedItemState } from "../../../../../Recoil/OrderAtomState";
import _ from "lodash";
import axios from "axios";
import Main from "./Main";
import Sub from "./Sub";
import * as S from "./style";

function Picture({ itemId }: ItemIdProps) {
  // Picture Data
  const [pictureData, setPictureData] = useState<string[]>([]);
  const main = pictureData ? pictureData.shift() : null;
  const sub = pictureData.slice(0, 3);
  const setSelectedItemImg = useSetRecoilState(selectedItemState);

  // Picture API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/picture`)
      .then((response) => {
        let pictures = response.data.data.pictures;
        pictures = _.sortBy(pictures, "sequence");
        let result: any[] = [];
        pictures.map((item: any) => {
          result.push(item.imgUrl);
        });
        setPictureData(result);

        // 현재 아이템 대표사진 설정(결제용)
        setSelectedItemImg((prevSelectedItem) => ({
          ...prevSelectedItem,
          img: result.shift() || "",
        }));
      })
      .catch((error) => {
        console.log("Picture 연결 실패");
      });
  }, [itemId]);

  return (
    <S.Picture>
      <S.Main>
        {main && (
          <Main src={main} alt={main} itemId={itemId} modal={pictureData} />
        )}
      </S.Main>
      <S.Sub>
        {sub.map((picture, key) => (
          <Sub
            key={itemId + key.toString()}
            src={picture}
            alt={picture}
            itemId={itemId}
            modal={pictureData}
          />
        ))}
      </S.Sub>
    </S.Picture>
  );
}

export default Picture;
