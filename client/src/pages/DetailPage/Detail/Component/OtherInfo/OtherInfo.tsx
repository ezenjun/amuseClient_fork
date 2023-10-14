import React, { useEffect, useState } from "react";
import "./OtherInfo.scss";
import OtherInfoDetail from "./OtherInfoDetail/OtherInfoDetail";
import axios from "axios";
import { ItemIdProps } from "../../../../../interfaces/PropsInterfaces";

interface OtherInfoData {
  content: string;
}

function OtherInfo({ itemId }: ItemIdProps) {
  /**
   * OtherInfo Data
   */
  const [otherInfoData, setOtherInfoData] = useState<OtherInfoData>();

  /**
   * OtherInfo API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/other-info`)
      .then((response) => {
        setOtherInfoData(response.data.data);
        console.log("other info", response.data.data);

        // console.log("product", response.data.data.content)
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="other-info">
      <div
        dangerouslySetInnerHTML={{
          __html: otherInfoData?.content ?? "",
        }}
      ></div>
    </div>
  );
}

export default OtherInfo;
