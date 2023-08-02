import { useEffect } from "react"
import axios from "axios";
import { FormEvent, useState } from "react";
import { requestPay } from "../../API/import";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { OrderDetail } from "../OrderDetail";
import { useInfoContext } from "../../../Contexts/InfoContext";
import { PurchaseInfo } from "../PurchaseInfo";
import styles from "./OrderForm.module.scss";
import { useCookies } from "react-cookie";

export function OrderForm() {
  const { orderData, setOrderData } = useOrderContext();
  const { name,setName, email,setEmail, phone,setPhone } = useInfoContext();

  const [cookies, setCookie, removeCookie] = useCookies(["__jwtk__"]);
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

  const getUserInfoAsToken = async()=>{
    const token = cookies["__jwtk__"]
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/info`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      })
      .then((response) => {
        const data =response.data.data
        // console.log(data);
        setName(data?.name)
        setEmail(data?.email)
      }).catch((err)=>{
        console.log(err)
      });
  }
  useEffect(()=>{
    getUserInfoAsToken()
  },[])
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
