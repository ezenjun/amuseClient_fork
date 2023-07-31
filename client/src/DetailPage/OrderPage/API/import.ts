export const requestPay = (data: any, callback: (rsp: any) => void) => {
  const { IMP } = window as any;

  const updatePGCode = (value: string) => {
    console.log(value, process.env.REACT_APP_IMPORT_KAKAO_PG);
    switch (value) {
      case "계좌이체":
        return "html5_inicis";
      case "신용/체크카드":
        return "html5_inicis";
      case "카카오페이":
        return "kakaopay";
      case "네이버페이":
        return "naverpay";
    }
  };

  const getPaymentCode = (value: string) => {
    switch (value) {
      case "계좌이체":
        return "trans";
      case "신용/체크카드":
        return "card";
      case "카카오페이":
        return "card";
      case "네이버페이":
        return "naverpay";
    }
  };

  IMP.init(process.env.REACT_APP_IMPORT_CODE);
  IMP.request_pay(
    {
      // param
      pg: updatePGCode(data.pay_method),
      pay_method: getPaymentCode(data.pay_method),
      merchant_uid: "ORD20180131-00001",
      name: "아파트",
      amount: data.productPrice - data.point,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
      bypass: {
        acceptmethod: "cardpoint",
      },
    },
    callback
  );
};
