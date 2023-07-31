import axios from "axios";
import { FormEvent, useState } from "react";
import { requestPay } from "../../API/import";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { OrderDetail } from "../OrderDetail";
import { PurchaseInfo } from "../PurchaseInfo";
import styles from "./OrderForm.module.scss";

export function OrderForm() {
  const { orderData, setOrderData } = useOrderContext();
  const [isLoading, setLoading] = useState(false);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    console.log("orderForm");
    e.preventDefault();
    setLoading(true);
    requestPay(orderData, (rsp: any) => {
      if (rsp.success) {
        // axios로 HTTP 요청
        axios({
          url: `http://localhost:3000/detail/${orderData.productId}`,
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          },
        }).then((data) => {
          // 서버 결제 API 성공시 로직
          axios.post("url", { orderData });
        });
      } else {
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
      setLoading(false);
    });
  };
  return (
    <form
      className={styles.subContainer}
      onSubmit={submitHandler}
      id="orderForm"
    >
      <OrderDetail isLoading={isLoading} />
      <PurchaseInfo isLoading={isLoading} />
    </form>
  );
}
