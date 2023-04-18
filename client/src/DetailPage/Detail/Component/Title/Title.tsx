import React, { useEffect, useState } from 'react';
import TitleDetail from './TitleDetail/TitleDetail';
import axios from "axios";

function Title() {
  interface DataProps {
    country : string
    city : string
    title : string
  }
  let [data, setData] = useState<DataProps>();

  useEffect(() => {
    axios
      .get("https://1cba6b89-f8d3-4a92-95a3-9444a854510f.mock.pstmn.io/data")
      .then((result) => {
        setData(result.data[0]);
        console.log(result.data[0])
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <TitleDetail
        country={data?.country ?? "country"}
        city={data?.city ?? "city"}
        title={data?.title ?? "title"}
      />
    </div>
  );
}

export default Title;
