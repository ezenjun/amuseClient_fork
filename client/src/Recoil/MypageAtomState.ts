import { atom } from "recoil";
import { atomKeys } from "../configs/atomKeys";
import { IMypageInfo } from "../Interfaces/DataInterfaces";

export const MypageInfo = atom<IMypageInfo>({
	key: atomKeys.mypageInfo,
	default: { birthday: "", phoneNumber: "", email: "" },
});
