export const requestPay = (data: any, callback: (rsp: any) => void) => {
	const { IMP } = window as any;

	const generatePaymentUid = () => {
		const now = new Date();
		const koreanTime = new Date(
			now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
		);

		const year = koreanTime.getFullYear();
		const month = String(koreanTime.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줍니다.
		const day = String(koreanTime.getDate()).padStart(2, "0");
		const hours = String(koreanTime.getHours()).padStart(2, "0");
		const minutes = String(koreanTime.getMinutes()).padStart(2, "0");
		const seconds = String(koreanTime.getSeconds()).padStart(2, "0");
		const milliseconds = String(koreanTime.getMilliseconds()).padStart(
			3,
			"0"
		);
		console.log(
			`${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`
		);
		return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
	};

	const updatePGCode = (value: string) => {
		console.log(value, process.env.REACT_APP_IMPORT_KAKAO_PG);
		switch (value) {
			case "계좌이체":
				return "html5_inicis";
			case "신용/체크카드":
				return "html5_inicis";
			case "토스페이":
				return "tosspayments.iamporttest_3";
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
			case "토스페이":
				return "tosspay";
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
			pay_method: "card",
			merchant_uid: generatePaymentUid(), //가맹점 주문번호(동일한 주문번호로 중복결제 불가)
			name: data.products,
			amount: 500, //data.productPrice - data.point,
			buyer_email: data.email,
			buyer_name: data.name,
			// buyer_tel: "010-4242-4242",
			// buyer_addr: "서울특별시 강남구 신사동",
			// buyer_postcode: "01181",
			bypass: {
				acceptmethod: "cardpoint",
			},
		},
		callback
	);
};
