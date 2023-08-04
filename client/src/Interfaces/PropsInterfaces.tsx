import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
    privacy : boolean;
    privacyCheck: (check: boolean) => void;
    takeVideo : boolean;
    takeVideoCheck : (check: boolean) => void;
    videoInMarketing : boolean;
    videoInMarketingCheck : (check: boolean) => void;
}
  

export interface IProps {
    children: React.ReactNode;
}
export interface OrderContextProps {
    children: React.ReactElement;
    location?: any;
}