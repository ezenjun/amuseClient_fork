import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./OrderDetail.module.scss";

import { ProductInfo } from "./Sections/ProductInfo";
import { Point } from "./Sections/Point";
import { ReservationInfo } from "./Sections/ReservationInfo";
import { AdditionalInfo } from "./Sections/AdditionalInfo";
import { PaymentMethod } from "./Sections/PaymentMethod";
import { PurchaseInfoItems } from "../PurchaseInfoItems";

type Props = {
  isLoading: boolean;
};

export const OrderDetail = ({ isLoading }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container} ref={ref}>
      <ProductInfo />
      <Point />
      <ReservationInfo />
      <AdditionalInfo />
      <PaymentMethod />
      <div className={styles.purchaseInfo}>
        <PurchaseInfoItems isLoading={isLoading} />
      </div>
    </div>
  );
};
