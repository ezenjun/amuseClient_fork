import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./PointAccrual.module.scss";

export function PointAccrual() {
  const { orderData, setOrderData } = useOrderContext();

  const convertPointFormat = (price: number) => {
    const formatter = new Intl.NumberFormat();
    return formatter.format(price);
  };

  const calculatePoint = () => {
    if (orderData.pay_method === "계좌이체") {
      return Math.floor(orderData.productPrice * 0.01 + 3000);
    } else {
      return Math.floor(orderData.productPrice * 0.01);
    }
  };

  return (
    <CommonHeader title="포인트 적립" isRight={true}>
      <div className={styles.subContainer}>
        <div>
          <span>일반 등급 혜택</span>
          <span>{` ${convertPointFormat(calculatePoint())}원 적립 예정`}</span>
        </div>
        <div>포인트는 상품 사용 완료 후 적립됩니다.</div>
      </div>
    </CommonHeader>
  );
}
