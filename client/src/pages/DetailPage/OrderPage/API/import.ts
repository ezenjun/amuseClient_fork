import { useCookies } from "react-cookie";
import {
	PaymentInfo,
	PaymentPostData,
	SelectedItemData,
} from "../../../../Interfaces/DataInterfaces";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../../../Recoil/OrderAtomState";

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

	console.log("final data", data);
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
		paymentCompleteRequestDto: {
			reservationItemType: data.itemType,
			reservationNumber: pgResp.merchant_uid,
			paymentItemInfoRequestDto: {
				itemId: data.itemId,
				travelStartDate: data.startDate.toISOString(),
				travelEndDate: data.endDate.toISOString(),
				additionalRequest: data.additionalInfo,
				itemCost: data.totalAmount,
				itemPayPrice: data.payAmount,
				itemName: selectedItem.title,
				itemImage: selectedItem.img,
			},
			paymentTicketRequestDtoList: data.ticketList,
			paymentReservationInfoDto: {
				bookerName: data.reservationInfo.reservationNameKR,
				bookerBirthDay: data.reservationInfo.reservationBirthday,
				bookerFirstNameEN: data.reservationInfo.reservationFirstNameEN,
				bookerLastNameEN: data.reservationInfo.reservationLastNameEN,
				bookerPhoneCode: data.reservationInfo.reservationPhoneCode,
				bookerPhoneNumber: data.reservationInfo.reservationPhoneNumber,
				bookerEmail: data.reservationInfo.reservationEmail,
				passportNumber: data.reservationInfo.reservationPassportNumber,
			},
			paymentGuestInfoDto: {
				guestName: data.guestInfo.guestNameKR,
				guestBirthDay: data.guestInfo.guestBirthday,
				guestFirstNameEN: data.guestInfo.guestFirstNameEN,
				guestLastNameEN: data.guestInfo.guestLastNameEN,
				guestPhoneCode: data.guestInfo.guestPhoneCode,
				guestPhoneNumber: data.guestInfo.guestPhoneNumber,
				guestPassportNumber: data.guestInfo.guestPassportNumber,
				guestEmail: data.guestInfo.guestEmail,
			},
			additionalRequest: data.additionalInfo,
			payType: data.paymentMethod,
			pointAcquire: 0, // You might want to add logic to calculate point acquire
			pointUse: data.pointUsed,
			cardType: pgResp.pay_method, // Add logic to get card type if available
			discountRate: 0, // You might want to add logic to calculate discount rate
			payStatus: pgResp.success, // Add logic to set pay status
			paymentAgreementRequestDto: {
				privacyCollection: data.termsAgreement.privacyCollection
					? 1
					: 0,
				privacyToThirdParty: data.termsAgreement.privacyToThirdParty
					? 1
					: 0,
				conciergeRule: 0, // You might want to add logic to set concierge rule
				ageOver14: data.termsAgreement.ageOver14 ? 1 : 0,
				stayRule: data.termsAgreement.stayRule ? 1 : 0,
			},
			paymentCancelRuleRequestDto: {
				content: "", // Add logic to set cancel rule content
			},
			cardNumber: pgResp.card_number, // Add logic to get card number if available
		},
	};

	return convertedData;
};

export interface postData {
	paymentCompleteRequestDto: {
		paymentItemInfoRequestDto: {
			itemId: number;
			travelStartDate: string;
			travelEndDate: string;
			additionalRequest: string;
			itemCost: number;
			itemPayPrice: number;
			itemName: string;
			itemImage: string;
		};
		paymentTicketRequestDtoList: [
			{
				ticketId: number;
				ticketCount: number;
				ticketPrice: number;
				ticketName: string;
				ticketSubName: string;
			}
		];
		paymentReservationInfoDto: {
			bookerName: string;
			bookerBirthDay: string;
			bookerFirstNameEN: string;
			bookerLastNameEN: string;
			bookerPhoneNumber: string;
			bookerEmail: string;
			passportNumber: string;
			reservationItemType: string;
			reservationNumber: string;
		};
		paymentGuestInfoDto: {
			guestName: string;
			guestBirthDay: string;
			guestFirstNameEN: string;
			guestLastNameEN: string;
			guestPhoneNumber: string;
			guestEmail: string;
		};
		additionalRequest: string;
		payType: string;
		pointAcquire: number;
		pointUse: number;
		cardType: string;
		discountRate: number;
		payStatus: string;
		paymentAgreementRequestDto: {
			privacyCollection: number;
			privacyToThirdParty: number;
			conciergeRule: number;
			ageOver14: number;
			stayRule: number;
		};
		paymentCancelRuleRequestDto: {
			content: string;
		};
		cardNumber: string;
	};
}


