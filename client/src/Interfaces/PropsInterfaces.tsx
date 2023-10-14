import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ChangeEvent } from "react";

export interface BannerProps {
	page_component_id: number;
	type: string;
	title: string;
	content: string;
	itemInfos: [];
	mobileBannerLink: string;
	pcBannerUrl: string;
	pcBannerLink: string;
	mobileBannerUrl: string;
}

export interface ListProps {
	page_component_id: string;
	type: string;
	title: string;
	content: null;
	itemInfos: [];
	pcBannerUrl: null;
	pcBannerLink: null;
	mobileBannerUrl: null;
	mobileBannerLink: null;
}

export interface TileProps {
	page_component_id: string;
	type: string;
	title: string;
	content: null;
	itemInfos: [];
	pcBannerUrl: null;
	pcBannerLink: null;
	mobileBannerUrl: null;
	mobileBannerLink: null;
}

export interface BoxProps {
	marginRight: string;
	itemId: number;
	handleClick: () => void;
	title: string;
	startPrice: string;
	imageUrl: string;
}
export interface SubListsProps {
	title: string;
	itemInfos: [];
}
export interface DetailProps {
	itemId: number;
	productCode: number;
	startPrice: number;
	likeNum: number;
}
export interface ItemIdProps {
	itemId: number | null;
}
export interface CourseIntroDetailProps {
	title: string;
	time: string;
	content: string;
	imageSrc: string;
	day: number;
}
export interface IconDetailProps {
	icon: IconProp;
	text: string;
}
export interface MapDataProps {
	data: {
		day: number;
		latitude: number | null;
		longitude: number | null;
		title: string;
	}[];
}
export interface MarkerProps {
	lat: number;
	lng: number;
	title: string;
}
export interface DropdownProps {
	onChange: (sortOption: string) => void;
}
export interface CategoryMenuProps {
	hashtagName: string;
	handleClick: () => void;
}
export interface CategoryNameMenuProps {
	categoryName: string;
	handleClick: () => void;
}
export interface SubBannersProps {
	title: string;
	content: string;
	bannerUrl: string;
	bannerLink: string;
}
export interface TermsProps {
	privacy: boolean;
	privacyCheck: (check: boolean) => void;
	takeVideo: boolean;
	takeVideoCheck: (check: boolean) => void;
	videoInMarketing: boolean;
	videoInMarketingCheck: (check: boolean) => void;
}

export interface IProps {
	children: React.ReactNode;
}
export interface OrderContextProps {
	children: React.ReactElement;
	location?: any;
}

export interface SquareImageProps {
	size: number;
	imgUrl: string;
	borderRadius: number;
}

export interface GrayBoxProps extends IProps {
	verticalPadding: number;
	horizontalPadding: number;
	borderRadius?: number;
}

export interface ButtonProps extends IProps {
	color: string;
	width?: number;
	fontSize: number;
	verticalPadding: number;
	isActive?: boolean;
	onClick: () => void;
}

export interface TextInputFieldProps {
	type: string;
	isCorrect: boolean;
	placeholder: string;
	value: string | number | undefined;
	setValue: React.Dispatch<React.SetStateAction<any>>;
	errorMsg?: string;
}

export interface RadioButtonProps {
	name: string;
	checked: boolean;
	label: string;
	onClick: () => void;
}

export interface HorizontalLineProps {
	marginTop: number;
	marginBottom: number;
}

export interface CheckButtonProps {
	isActive: boolean;
	onClick: () => void;
}

export interface onClickProps {
	onClick: () => void;
}

export interface PointProps {
	myPoint: number;
}

// commit용 주석
