import {useState,useEffect} from "react";
import styles from "./PurchaseInfoItems.module.scss";
import { PointAccrual } from "./Sections/PointAccrual";
import { PaymentInfo } from "./Sections/PaymentInfo";
import { Terms } from "./Sections/Terms";
import { CancelPolicy } from "./Sections/CancelPolicy";
import { useOrderContext } from "../../../Contexts/OrderContext";

type Props = {
  isLoading: boolean;
};

export const PurchaseInfoItems = ({ isLoading }: Props) => {
  const { orderData } = useOrderContext();
  const [privacy,setPrivacy] = useState(false);
  const [takeVideo,setTakeVideo] = useState(false);
  const [useVideoInMarketing,setUseVideoInMarketing] = useState(false);


  return (
    <>
      <PaymentInfo />
      <PointAccrual />
      <Terms  privacy={privacy} privacyCheck={setPrivacy} 
              takeVideo={takeVideo} takeVideoCheck={setTakeVideo} 
              videoInMarketing={useVideoInMarketing} videoInMarketingCheck={setUseVideoInMarketing}
            />
      <CancelPolicy />
      <div className={styles.buttonSection}>
        <button type="submit" form="orderForm" disabled={isLoading}>
          {isLoading
            ? "결제중"
            : `${(orderData.productPrice - orderData.point).toLocaleString("en")}원 결제`}
        </button>
      </div>
    </>
  );
};
