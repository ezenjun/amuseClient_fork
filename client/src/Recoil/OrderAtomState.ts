import { atom } from "recoil";
import { atomKeys } from "../config/atomKeys";
import { SelectedItemData } from "../Interfaces/DataInterfaces";

export const selectedItemState = atom<SelectedItemData>({
	key: atomKeys.selectedItemState,
	default: { title: "", img: "", startDate: new Date(), duration: 0 },
});
