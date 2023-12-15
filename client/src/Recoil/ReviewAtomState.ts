import { atom } from "recoil";
import { atomKeys } from "../configs/atomKeys";
import { EditReviewObject } from "../Interfaces/DataInterfaces";

export const createReviewVisibleState = atom<boolean>({
	key: atomKeys.createReviewVisibleState,
	default: false,
});
export const editReviewVisibleState = atom<boolean>({
	key: atomKeys.eidtReviewVisibleState,
	default: false,
});

export const createReviewPaymentId = atom<number>({
	key: atomKeys.createReviewPaymentId,
	default: 0,
});

export const editReviewId = atom<number>({
	key: atomKeys.editReviewId,
	default: 0,
});

export const editReviewobject = atom<EditReviewObject>({
	key: atomKeys.editReviewobject,
	default: {
		rate: 0,
		reviewContent: "",
		oldImgs: [],
		newImgs: [],
	},
});

export const reviewItemID = atom<number>({
	key: atomKeys.reviewItemID,
	default: 0,
});
