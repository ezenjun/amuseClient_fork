import React, { useEffect, useState } from 'react';
import TitleDetail from './TitleDetail/TitleDetail';
import axios from "axios";

type TitleProps = {
  itemId: number | null;
};

function Title({ itemId }: TitleProps) {
  /**
   * Title Data
   */
  interface TitleData {
    country : string
    city : string
    title : string
    rated : number
  }

  const [titleData, setTitleData] = useState<TitleData>();

  /**
   * Title API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/title`)
      .then((response) => {
        setTitleData(response.data.data)

        //console.log(response.data.data)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, []);

  return (
    <div>
      <TitleDetail
        country={titleData?.country ?? "country"}
        city={titleData?.city ?? "city"}
        title={titleData?.title ?? "title"}
        rated={titleData?.rated ?? 0.0}
      />
    </div>
  );
}

export default Title;
