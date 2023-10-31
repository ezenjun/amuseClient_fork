import React, { useEffect, useState } from "react";
import { ItemIdProps } from "../../../../../Interfaces/PropsInterfaces";
import { TitleData } from "../../../../../Interfaces/DataInterfaces";
import { useSetRecoilState } from "recoil";
import {
  PaymentDataState,
  selectedItemState,
} from "../../../../../Recoil/OrderAtomState";
import TitleDetail from "./TitleDetail";
import axios from "axios";

function Title({ itemId }: ItemIdProps) {
  /**
   * Title Data
   */
  const [titleData, setTitleData] = useState<TitleData>();
  const formattedRated = titleData?.rated;
  const formattedRatedData = formattedRated?.toFixed(1) ?? "0.0";
  const setSelectedItemTitle = useSetRecoilState(selectedItemState);
  const setPaymentData = useSetRecoilState(PaymentDataState);

  /**
   * Title API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
      .then((response) => {
        setTitleData(response.data.data);
        setSelectedItemTitle((prevSelectedItem) => ({
          ...prevSelectedItem,
          title: response.data.data.title,
          itemType: response.data.data.itemType,
        }));
        const data = response.data.data;
        setPaymentData((prevData) => ({
          ...prevData,
          itemType: data.itemType,
          reservationInfo: {
            ...prevData.reservationInfo,
          },
        }));
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <TitleDetail
      country={titleData?.country ?? "country"}
      city={titleData?.city ?? "city"}
      title={titleData?.title ?? "title"}
      rated={formattedRatedData ? Number(formattedRatedData) : 0.0}
      review_count={titleData?.review_count ?? 0.0}
    />
  );
}

export default Title;
