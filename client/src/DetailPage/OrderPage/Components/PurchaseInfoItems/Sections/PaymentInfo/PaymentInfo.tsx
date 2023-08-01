import { useState,useEffect } from "react"
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./PaymentInfo.module.scss";

export function PaymentInfo() {
  const { orderData } = useOrderContext();
  const [ totalPrice, setTotalPrice ] = useState("")

  const convertCurrencyFormat = (price: number) => {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return formatter.format(price);
  };

  useEffect(()=>{
    setTotalPrice(convertCurrencyFormat(orderData.productPrice))
  },[orderData])
  return (
    <CommonHeader title="결제 정보" isRight={true}>
      <ul className={styles.container}>
        <li className={styles.orderPrice}>
          <span>주문 금액</span>
          <span>{totalPrice}</span>
        </li>
        {orderData.point > 0 && (
          <li className={styles.orderPrice}>
            <span>포인트 차감</span>
            <span>{orderData.point}</span>
          </li>
        )}
        <li className={styles.totalPrice}>
          <span>총 결제 금액</span>
          <span>
            {convertCurrencyFormat(orderData.productPrice - orderData.point)}
          </span>
        </li>
      </ul>
    </CommonHeader>
  );
}
