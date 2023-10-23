import { atom } from "recoil";
import { atomKeys } from "../configs/atomKeys";
import { PaymentInfo, SelectedItemData } from "../Interfaces/DataInterfaces";

export const selectedItemState = atom<SelectedItemData>({
	key: atomKeys.selectedItemState,
	default: {
		title: "",
		img: "",
		startDate: new Date(),
		duration: 0,
		itemType: "",
	},
});

export const currentUserPointState = atom<number>({
	key: atomKeys.userPointState,
	default: 0,
});

export const PaymentDataState = atom<PaymentInfo>({
	key: atomKeys.PaymentDataState,
	default: {
		userId: 0,
		itemId: 0,
		itemType: "",
		startDate: new Date(),
		endDate: new Date(),
		orderDateTime: new Date(),
		ticketList: [],
		reservationInfo: {
			reservationNameKR: "",
			reservationBirthday: "",
			reservationFirstNameEN: "",
			reservationLastNameEN: "",
			reservationPhoneCode: 0,
			reservationPhoneNumber: "",
			reservationEmail: "",
			reservationPassportNumber: "",
		},
		//호텔이면
		guestInfo: {
			guestNameKR: "",
			guestBirthday: "",
			guestFirstNameEN: "",
			guestLastNameEN: "",
			guestPhoneCode: 0,
			guestPhoneNumber: "",
			guestEmail: "",
			guestPassportNumber: "",
		},
		additionalInfo: "",
		paymentMethod: "신용/체크카드",
		totalAmount: 0,
		pointUsed: 0,
		termsAgreement: {
			privacyCollection: false,
			privacyToThirdParty: false,
			ageOver14: false,
			stayRule: false,
		},
	},
});
