import { atom } from "recoil";
import { atomKeys } from "../configs/atomKeys";
import { IMypageInfo } from "../Interfaces/DataInterfaces";

export const MypageInfo = atom<IMypageInfo>({
	key: atomKeys.mypageInfo,
	default: { birthday: "", phoneNumber: "", email: "" },
});

export const showCancelModalState = atom<boolean>({
	key: atomKeys.showCancelModal,
	default: false,
});

export const showCancelConfirmState = atom<boolean>({
	key: atomKeys.showCancelConfirm,
	default: false,
});

export const showCancelRequestCompleteState = atom<boolean>({
	key: atomKeys.showCancelRequestComplete,
	default: false,
});

export const showRefundModalState = atom<boolean>({
	key: atomKeys.showRefundModal,
	default: false,
});
