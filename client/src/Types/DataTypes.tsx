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
};

// commit용 주석
