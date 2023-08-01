import { useEffect, useState } from "react"
import Style from "../../App.module.css";
import Footer from "../../Footers/Footer";

import styles from "./OrderPage.module.scss";

import { OrderForm } from "./Components/OrderForm";
import { InfoContextProvider } from "../Contexts/InfoContext";
import { useOrderContext } from "../Contexts/OrderContext";
import { useNavigate } from "react-router-dom";


export const OrderPage = () => {
  // const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // console.log({ loggedIn });
  const [isShow,setIsShow] = useState(<></>)

  const { orderData , orderTicketData,orderRange} = useOrderContext()
  const navigate = useNavigate();


  const checkOrderData =()=>{
    let count = 0
    for (let i =0 ; i< orderTicketData.length; i++){
      if(orderTicketData[i].count){
        count += 1
      }
    }
    if(count<1){
      navigate(-1)
    }else{
      setIsShow(
        <div className={styles.container}>
          <div className="App">
            <div className={Style["liner"]}></div>
          </div>
          <div className={styles.mainContainer}>
            <h1 className={styles.header}>예약하기</h1>
            <OrderForm />
          </div>
        </div>
      )
    }
  }
  useEffect(()=>{
    checkOrderData()
  },[orderTicketData])


  return (
      <InfoContextProvider>
        { isShow }
      </InfoContextProvider>
  );
};
