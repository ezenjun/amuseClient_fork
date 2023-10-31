import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import * as S from "./style";
import axios from "axios";

interface ProductIntroData {
  content: string;
}

function ProductIntro({ itemId }: ItemIdProps) {
  // ProductIntro Data
  const [productIntroData, setProductIntroData] = useState<ProductIntroData>();

  // ProductIntro API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/product-intro`)
      .then((response) => {
        setProductIntroData(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <S.ProductIntro>
      <div
        dangerouslySetInnerHTML={{
          __html: productIntroData?.content ?? "",
        }}
      />
    </S.ProductIntro>
  );
}

export default ProductIntro;
