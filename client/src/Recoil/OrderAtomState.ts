import { atom } from "recoil";
import { atomKeys } from "../config/atomKeys";
import { PaymentInfo, SelectedItemData } from "../Interfaces/DataInterfaces";

export const selectedItemState = atom<SelectedItemData>({
	key: atomKeys.selectedItemState,
	default: { title: "", img: "", startDate: new Date(), duration: 0 },
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
		// orderid: 0,
		startDate: new Date(),
		endDate: new Date(),
		orderDateTime: new Date(),
		ticketList: [],
		reservationInfo: {
			nameKR: "",
			birthday: "",
			firstNameEN: "",
			lastNameEN: "",
			phoneNumber: "",
			email: "",
			//국외면
			passportNumber: "",
		},
		//호텔이면
		guestInfo: {
			nameKR: "",
			birthday: "",
			firstNameEN: "",
			lastNameEN: "",
			phoneNumber: "",
			email: "",
		},
		additionalInfo: "",
		paymentMethod: "",
		totalAmount: 0,
		pointUsed: 0,
	},
});
