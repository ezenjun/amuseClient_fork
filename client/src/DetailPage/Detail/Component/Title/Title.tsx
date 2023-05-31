import React, { useEffect, useState } from 'react';
import TitleDetail from './TitleDetail/TitleDetail';
import axios from "axios";
import './Title.scss';

interface TitleProps {
  itemId: number | null;
};

interface TitleData {
  country : string
  city : string
  title : string
  rated : number
  review_count : number
}

function Title({ itemId }: TitleProps) {
  /**
   * Title Data
   */
  const [titleData, setTitleData] = useState<TitleData>();
  const formattedRated = titleData?.rated.toFixed(1);

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
  }, [itemId]);

  return (
    <div className='Title'>
      <TitleDetail
        country={titleData?.country ?? "country"}
        city={titleData?.city ?? "city"}
        title={titleData?.title ?? "title"}
        rated={formattedRated ? Number(formattedRated) : 0.0}
        review_count={titleData?.review_count ?? 0.0}
      />
    </div>
  );
}

export default Title;
