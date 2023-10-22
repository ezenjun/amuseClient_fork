import { PaymentInfo } from "../../../../Interfaces/DataInterfaces";
export const requestPay = (data: PaymentInfo, callback: (rsp: any) => void) => {
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
			case "현금 결제":
				return "html5_inicis.INIpayTest";
			case "신용/체크카드":
				return "html5_inicis.INIpayTest";
			case "카카오페이":
				return "kakaopay";
			case "네이버페이":
				return "naverpay";
		}
	};

	const getPaymentCode = (value: string) => {
		switch (value) {
			case "현금 결제":
				return "trans";
			case "신용/체크카드":
				return "card";
			case "카카오페이":
				return "kakaopay";
			case "네이버페이":
				return "naverpay";
		}
	};

	IMP.init(process.env.REACT_APP_IMPORT_CODE);
	IMP.request_pay(
		{
			// param
			pg: updatePGCode(data.paymentMethod),
			pay_method: getPaymentCode(data.paymentMethod),
			merchant_uid: generatePaymentUid(), //가맹점 주문번호(동일한 주문번호로 중복결제 불가)
			name: data.reservationInfo.reservationNameKR,
			amount: data.totalAmount,
			buyer_email: data.reservationInfo.reservationEmail,
			buyer_name: data.reservationInfo.reservationNameKR,
			buyer_tel: data.reservationInfo.reservationPhoneNumber,
			bypass: {
				acceptmethod: "cardpoint",
			},
		},
		callback
	);
};
