import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import axios from "axios";
import * as S from "./style";

interface ItemInfoData {
  content: string;
}

function ItemInfo({ itemId }: ItemIdProps) {
  // ItemInfo Data
  const [ItemInfoData, setItemInfoData] = useState<ItemInfoData>();

  // ItemInfo API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/product-intro`)
      .then((response) => {
        setItemInfoData(response.data.data);
      })
      .catch((error) => {
        console.log("ItemInfo 연결 실패");
      });
  }, [itemId]);

  return (
    <S.ItemInfo>
      <div
        dangerouslySetInnerHTML={{
          __html: ItemInfoData?.content ?? "",
        }}
      />
    </S.ItemInfo>
  );
}

export default ItemInfo;
