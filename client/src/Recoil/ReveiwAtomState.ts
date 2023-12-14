import { atom } from "recoil";
import { atomKeys } from "../configs/atomKeys";

export const createReviewVisibleState = atom<boolean>({
	key: atomKeys.createReviewVisibleState,
	default: false,
});

export const createReviewID = atom<number>({
	key: atomKeys.createReviewID,
	default: 0,
});

export const reviewItemID = atom<number>({
	key: atomKeys.reviewItemID,
	default: 0,
});
