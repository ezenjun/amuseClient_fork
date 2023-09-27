import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
	itemType: string;
	// orderid: number;
	startDate: Date;
	endDate: Date;
	orderDateTime: Date;
	ticketList: Array<SelectedTicket>;
	reservationInfo: {
		reservationNameKR: string;
		reservationBirthday: string;
		reservationFirstNameEN: string;
		reservationLastNameEN: string;
		reservationPhoneCode: number;
		reservationPhoneNumber: string;
		reservationEmail: string;
		reservationPassportNumber?: string;
	};
	//호텔이면
	guestInfo: {
		guestNameKR: string;
		guestBirthday: string;
		guestFirstNameEN: string;
		guestLastNameEN: string;
		guestPhoneCode: number;
		guestPhoneNumber: string;
		guestEmail: string;
		guestPassportNumber?: string;
	};
	additionalInfo: string;
	paymentMethod: string;
	totalAmount: number;
	pointUsed: number;
}

export interface UserPoint {
	myPoint: number;
}
