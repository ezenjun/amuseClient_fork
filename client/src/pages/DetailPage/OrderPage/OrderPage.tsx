import { useEffect, useState } from "react";
import { OrderForm } from "./Components/OrderForm";
import { useOrderContext } from "../Contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import MainComponent from "../../../MainComponent";
import { OrderInfoContainer, OrderPageContainer, PageName } from "./styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  PaymentDataState,
  currentUserPointState,
} from "../../../Recoil/OrderAtomState";
import { useCookies } from "react-cookie";
import axios from "axios";
export const OrderPage = () => {
  // const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // console.log({ loggedIn });
  const [isShow, setIsShow] = useState(false);
  const [isUseEffectOnFirst, setIsUseEffectOnFirst] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
  const { orderData, orderTicketData, orderRange } = useOrderContext();
  const navigate = useNavigate();

  const checkOrderData = () => {
    let count = 0;
    for (let i = 0; i < orderTicketData.length; i++) {
      if (orderTicketData[i].count) {
        count += 1;
      }
    }
    if (count < 1) {
      navigate(-1);
    } else {
      setIsShow(true);
    }
  };
  const setPaymentData = useSetRecoilState(PaymentDataState);
  const setCurrentUserPoint = useSetRecoilState(currentUserPointState);

  const getPaymentUserInfo = async () => {
    const token = cookies.__jwtkid__;
    if (token) {
      axios
        .get(`${process.env.REACT_APP_AMUSE_API}/api/payment`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log("getPaymentUserInfo", data);
          setPaymentData((prevData) => ({
            ...prevData,
            reservationInfo: {
              ...prevData.reservationInfo,
              reservationNameKR: data.userName,
              reservationPhoneNumber: data.userPhoneNumber,
              reservationEmail: data.userEmail,
            },
          }));
          setCurrentUserPoint(data.userPoint ? data.userPoint : 0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getPaymentUserInfo();
  }, []);

  useEffect(() => {
    checkOrderData();
    setIsUseEffectOnFirst(true);
  }, [orderTicketData]);

  useEffect(() => {
    if (isUseEffectOnFirst) {
      if (!isShow) {
        navigate("/");
      }
    }
  }, [isUseEffectOnFirst]);

  return (
    <MainComponent>
      {/* {isShow && ( */}
      <OrderPageContainer>
        <PageName>결제하기</PageName>
        <OrderInfoContainer>
          <OrderForm />
        </OrderInfoContainer>
      </OrderPageContainer>
      {/* )} */}
    </MainComponent>
  );
};
