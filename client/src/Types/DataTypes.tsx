export type OrderData = {
	orderData: any;
	setOrderData: any;
	orderTicketData: any;
	setOrderTicketData: any;
	orderRange: any;
	setOrderRange: any;
};

export type InfoData = {
	name?: string;
	setName?: any;
	phone?: string;
	setPhone?: any;
	email?: string;
	setEmail?: any;
	birthday?: string;
	setBirthDay?: any;
};

export type CategoryInfoData = {
	categoriesInfo?: Array<any>;
	setCategoriesInfo?: any;
};

export type PaymentHistoryData = {
	mainPaymentId: number;
	itemName: string;
	itemImage: string;
	travelStartDate: string;
	travelEndDate: string;
	payStatus: string;
	reservationDateTime: string;
	itemPayPrice: number;
	reservationNumber?: number;
	itemId: number;
};

export type ReviewData = {
	paymentId: number;
	itemDbId: number;
	title: string;
	imageUrl: string;
	startDate: string;
	endDate: string;
	reservationDateTime: string;
	reviewStatus?: boolean;
};

export type WrittenReview = {
	itemId: number;
	reviewId: number;
	title: string;
	itemImages: [{ imgUrl: string }];
	startDate: string;
	endDate: string;
	paymentDate: string;
	userName: string;
	rating: number;
	reviewContent: string;
	reviewImages: [
		{
			imgUrl: string;
		}
	];
};
// commit용 주석
