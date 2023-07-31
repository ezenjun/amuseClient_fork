import React, { ChangeEvent } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./AdditionalInfo.module.scss";

export function AdditionalInfo() {
  const { orderData, setOrderData } = useOrderContext();

  const additionalInfoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const data = { ...orderData };
    data[name] = value;
    console.log(data);
    setOrderData(data);
  };
  return (
    <CommonHeader title="추가 예약 정보">
      <div className={styles.additionalInfoContainer}>
        <h3>기타 요청 사항</h3>
        <textarea
          className={styles.text}
          placeholder="답변을 입력해주세요."
          name="additionalInfo"
          value={orderData.additionalInfo}
          onChange={additionalInfoHandler}
        ></textarea>
        <div>
          고객님의 요청사항이 전달되나, 간혹 현장 사정에 따라 반영되지 않을 수
          있습니다.
        </div>
      </div>
    </CommonHeader>
  );
}
