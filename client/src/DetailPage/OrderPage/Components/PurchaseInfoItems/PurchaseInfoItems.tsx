import {useState,useEffect} from "react";
import styles from "./PurchaseInfoItems.module.scss";
import { PointAccrual } from "./Sections/PointAccrual";
import { PaymentInfo } from "./Sections/PaymentInfo";
import { Terms } from "./Sections/Terms";
import { CancelPolicy } from "./Sections/CancelPolicy";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { styled } from "styled-components";

type Props = {
  isLoading: boolean;
};

export const PurchaseInfoItems = ({ isLoading }: Props) => {
  const { orderData } = useOrderContext();
  const [privacy,setPrivacy] = useState(false);
  const [takeVideo,setTakeVideo] = useState(false);
  const [useVideoInMarketing,setUseVideoInMarketing] = useState(false);
  const [buyBtn,setBuyBtn] = useState(<></>);


  const buyBtnClickAlert=()=>{
    if(!privacy){
      alert("개인정보 수집 및 활용에 동의해주세요")
    }else if(!takeVideo){
      alert("영상촬영에 동의해주세요")
    }
  }

  useEffect(()=>{
    if(privacy && takeVideo){
      setBuyBtn(
        <button type="submit" form="orderForm" disabled={isLoading} style={{fontFamily:"Pretendard-Regular"}}>
          {isLoading
            ? "결제중"
            : `${(orderData.productPrice - orderData.point).toLocaleString("en")}원 결제`}
        </button>
      )
    }else{
      setBuyBtn(
        <AlertBtn onClick={()=>{buyBtnClickAlert()}} style={{}}>
            {`결제 확인`}
        </AlertBtn>
      )
    }

  },[privacy,takeVideo])
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
        {buyBtn}
      </div>
    </>
  );
};
const AlertBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:  90%;
  height: 46px;
  font-family: Pretendard-Regular;
  font-size: 13.3333px;
  background-color: #2c96ed;
  color: #fff;
  border-radius: 4px;

`;