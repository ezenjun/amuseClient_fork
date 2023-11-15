import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { PaymentHistoryData } from "../Types/DataTypes";

export interface CategoryData {
	categoryId: string;
	categoryName: string;
	categoryImg: string;
	mainDescription: string;
	subDescription: string;
}
export interface TicketData {
	title: string;
	content: string;
	priceList: { startDate: string; price: number }[];
	count: number;
}
export interface CourseIntroData {
	day: number;
	title: string;
	content: string;
	sequenceId: number;
	timeCost: string;
	imageUrl: string;
	latitude: number;
	longitude: number;
}
export interface GuideData {
	guide_db_id: number;
	guideCode: string;
	userName: string;
	email: string;
	profileImageUrl: string;
	introduce: string;
	guide_comment_by_item: string;
}
export interface IconInfoData {
	icon: IconProp;
	text: string;
}
export interface MapData {
	title: string;
	content: string;
	day: number;
	sequenceId: number;
	timeCost: string;
	latitude: number | null;
	longitude: number | null;
}

export interface TicketData {
	id: number;
	title: string;
	content: string;
	priceList: { startDate: string; price: number }[];
	count: number;
}

export interface TitleData {
	country: string;
	city: string;
	title: string;
	rated: number;
	review_count: number;
}

export interface SelectedItemData {
	title: string;
	img: string;
	startDate: Date;
	duration: number;
	itemType: string;
}

export interface PaymentUserData {
	userName: string;
	userPhoneNumber: string;
	userEmail: string;
	userPoint: number;
}

export interface SelectedTicket {
	ticketId: number;
	ticketCount: number;
}

export interface PaymentInfo {
	userId: number;
	itemId: number;
	itemName: string;
	itemType: string;
	startDate: Date;
	endDate: Date;
	orderDateTime: Date;
	ticketList: Array<PostTicketData>;
	reservationInfo: ReservationInfo;
	//호텔이면
	guestInfo: GuestInfo;
	additionalInfo: string;
	paymentMethod: string;
	totalAmount: number;
	pointUsed: number;
	payAmount: number;
	termsAgreement: {
		privacyCollection: boolean;
		privacyToThirdParty: boolean;
		ageOver14: boolean;
		stayRule: boolean;
	};
}

export interface PostTicketData {
	ticketId: number;
	ticketCount: number;
	ticketPrice: number;
	ticketName: string;
	ticketSubName: string;
}

export interface PaymentPostData {
	paymentCompleteRequestDto: {
		reservationItemType: string;
		reservationNumber: string;
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
		paymentTicketRequestDtoList: Array<PostTicketData>;
		paymentReservationInfoDto: {
			bookerName: string;
			bookerBirthDay: string;
			bookerFirstNameEN: string;
			bookerLastNameEN: string;
			bookerPhoneNumber: string;
			bookerPhoneCode: number;
			bookerEmail: string;
			passportNumber: string;
		};
		paymentGuestInfoDto: {
			guestName: string;
			guestBirthDay: string;
			guestFirstNameEN: string;
			guestLastNameEN: string;
			guestPhoneNumber: string;
			guestPhoneCode: number;
			guestEmail: string;
			guestPassportNumber: string;
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

export interface UserPoint {
	myPoint: number;
}

export interface ReservationInfo {
	reservationNameKR: string;
	reservationBirthday: string;
	reservationFirstNameEN: string;
	reservationLastNameEN: string;
	reservationPhoneCode: number;
	reservationPhoneNumber: string;
	reservationEmail: string;
	reservationPassportNumber: string;
}
export interface GuestInfo {
	guestNameKR: string;
	guestBirthday: string;
	guestFirstNameEN: string;
	guestLastNameEN: string;
	guestPhoneCode: number;
	guestPhoneNumber: string;
	guestEmail: string;
	guestPassportNumber: string;
}

export interface FormValues {
	reservationInfo: ReservationInfo;
	guestInfo: GuestInfo;
}

export interface Term {
	id: number;
	type: string;
	title: string;
	sequenceNum: number;
	mandatory: boolean;
	content: string;
}

export interface TermsInterface {
	type: string;
	content: Array<Term>;
}

export interface paymentDetailMatterResponseDto {
	reservationNumber: string;
	reservationDateTime: string;
	itemAdditionalInformation: string;
}

export interface paymentCancelContent {
	content: string;
}

export interface PaymentDetailInterface {
	paymentDetailTopItemInfoResponseDto: PaymentHistoryData;
	paymentDetailInfoResponseDto: {
		bookerName: string;
		bookerBirthDay: string;
		bookerFirstNameEN: string;
		bookerLastNameEN: string;
		bookerPhoneNumber: string;
		bookerEmail: string;
		guestName: string;
		guestBirthDay: string;
		guestFirstNameEN: string;
		guestLastNameEN: string;
		guestPhoneNumber: string;
		guestEmail: string;
		additionalRequest: string;
	};
	paymentDetailItemResponseDto: {
		itemName: string;
		reservationDateTime: string;
		itemPayPrice: number;
		informationResponseDtoList: [
			{
				ticketName: string;
				ticketSubName: string;
				ticketPrice: number;
				ticketCount: number;
			}
		];
		itemIntroduceInformation: string;
	};
	paymentDetailMatterResponseDto: paymentDetailMatterResponseDto;
	paymentCancelRuleResponseDto: paymentCancelContent;
}

// commit용 주석
