import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import axios from "axios";
import * as S from "./style";

interface OtherInfoData {
  content: string;
}

function OtherInfo({ itemId }: ItemIdProps) {
  // OtherInfo Data
  const [otherInfoData, setOtherInfoData] = useState<OtherInfoData>();

  // OtherInfo API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/other-info`)
      .then((response) => {
        setOtherInfoData(response.data.data);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <S.OtherInfo>
      <div
        dangerouslySetInnerHTML={{
          __html: otherInfoData?.content ?? "",
        }}
      />
    </S.OtherInfo>
  );
}

export default OtherInfo;
