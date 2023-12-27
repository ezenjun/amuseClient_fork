import axios from "axios";
import {
	PaymentInfo,
	SelectedItemData,
} from "../../../Interfaces/DataInterfaces";

// 객체를 로컬 스토리지에 저장하는 함수
export const savePaymentDataToLocalStorage = (data: PaymentInfo) => {
	const stringifiedData = JSON.stringify(data);
	localStorage.setItem("__paymentData__", stringifiedData);
};

// selectedItem을 로컬 스토리지에 저장하는 함수
export const saveSelectedItemToLocalStorage = (data: SelectedItemData) => {
	const stringifiedData = JSON.stringify(data);
	localStorage.setItem("selectedItem", stringifiedData);
};

// 로컬 스토리지에서 삭제
export const deleteDataFromLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

// 로컬 스토리지에서 값을 가져와 객체로 변환하는 함수
export const getDataFromLocalStorage = (key: string) => {
	const localStorageData = localStorage.getItem(key);
	if (localStorageData) {
		return JSON.parse(localStorageData);
	}
	return null;
};

export const getPortoneAccessToken = async (token: string) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_AMUSE_API}/api/v1/user/accessToken/portone`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			}
		);
		if (response.status === 200) {
			console.log(response.data.data);
			return response.data.data;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getPortonePaymentDetail = async (
	imp_uid: string,
	accessToken: any
) => {
	try {
		const response = await axios.get(`/payments/${imp_uid}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (response.status === 200) {
			// console.log(response.data.response);
			return response.data.response;
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};
