import {
	PaymentInfo,
	PaymentPostData,
	SelectedItemData,
} from "../../../../Interfaces/DataInterfaces";

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
		return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
	};

	const updatePGCode = (value: string) => {
		switch (value) {
			case "현금 결제":
				return `html5_inicis.${process.env.REACT_APP_IMPORT_KG_PG}`;
			case "신용/체크카드":
				return `html5_inicis.${process.env.REACT_APP_IMPORT_KG_PG}`;
			case "카카오페이":
				return `kakaopay.${process.env.REACT_APP_IMPORT_KAKAO_PG}`;
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
			name: data.itemName,
			amount: data.payAmount,
			buyer_email: data.reservationInfo.reservationEmail,
			buyer_name: data.reservationInfo.reservationNameKR,
			buyer_tel: data.reservationInfo.reservationPhoneNumber,
			bypass: {
				acceptmethod: "cardpoint",
			},
			m_redirect_url: `${process.env.REACT_APP_REDIRECT_URL}/order`,
		},
		callback
	);
};

export const updatePostInfo = (
	data: PaymentInfo,
	selectedItem: SelectedItemData,
	pgResp: any
): PaymentPostData => {
	const convertedData: PaymentPostData = {
		paymentItemInfoRequestDto: {
			itemId: data.itemId,
			travelStartDate: new Date(data.startDate).toISOString(),
			travelEndDate: new Date(data.endDate).toISOString(),
			additionalRequest: data.additionalInfo,
			itemCost: data.totalAmount,
			itemPayPrice: data.payAmount,
			itemName: selectedItem.title,
			itemImage: selectedItem.img,
		},
		paymentTicketRequestDtoList: data.ticketList,
		paymentReservationInfoDto: {
			bookerName: data.reservationInfo.reservationNameKR || "",
			bookerBirthDay: data.reservationInfo.reservationBirthday || "",
			bookerFirstNameEN:
				data.reservationInfo.reservationFirstNameEN || "",
			bookerLastNameEN: data.reservationInfo.reservationLastNameEN || "",
			bookerPhoneNumberCode:
				data.reservationInfo.reservationPhoneCode || 82,
			bookerPhoneNumber:
				data.reservationInfo.reservationPhoneNumber || "",
			bookerEmail: data.reservationInfo.reservationEmail || "",
			bookerPassportNumber:
				data.reservationInfo.reservationPassportNumber || "",
			reservationItemType: data.itemType,
			reservationNumber: pgResp.merchant_uid,
		},
		paymentGuestInfoDto: {
			guestName: data.guestInfo.guestNameKR || "",
			guestBirthDay: data.guestInfo.guestBirthday || "",
			guestFirstNameEN: data.guestInfo.guestFirstNameEN || "",
			guestLastNameEN: data.guestInfo.guestLastNameEN || "",
			guestPhoneNumberCode: data.guestInfo.guestPhoneCode || 82,
			guestPhoneNumber: data.guestInfo.guestPhoneNumber || "",
			guestPassportNumber: data.guestInfo.guestPassportNumber || "",
			guestEmail: data.guestInfo.guestEmail || "",
		},
		additionalRequest: data.additionalInfo,
		payType: pgResp.pay_method.toUpperCase(),
		pointAcquire: 0,
		pointUse: data.pointUsed,
		cardType: pgResp.card_name,
		discountRate: 0,
		payStatus: pgResp.success
			? pgResp.success
				? "SUCCESS"
				: "PENDING"
			: pgResp.status && pgResp.status === "paid"
			? "SUCCESS"
			: "PENDING",
		paymentAgreementRequestDto: {
			privacyCollection: data.termsAgreement.privacyCollection ? 1 : 0,
			privacyToThirdParty: data.termsAgreement.privacyToThirdParty
				? 1
				: 0,
			conciergeRule: 0,
			ageOver14: data.termsAgreement.ageOver14 ? 1 : 0,
			stayRule: data.termsAgreement.stayRule ? 1 : 0,
		},
		paymentCancelRuleRequestDto: {
			content: data.cancelPolicy,
		},
		cardNumber: pgResp.card_number,
	};

	return convertedData;
};
