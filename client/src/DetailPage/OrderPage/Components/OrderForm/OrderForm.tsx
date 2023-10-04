import { useEffect } from "react";
import axios from "axios";
import { FormEvent, useState } from "react";
import { requestPay } from "../../API/import";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { OrderDetail } from "../OrderDetail";
import { useInfoContext } from "../../../Contexts/InfoContext";
import { useCookies } from "react-cookie";
import { OrderInfoContainer } from "./styles";
import { PurchaseInfoItems } from "../PurchaseInfoItems";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	PaymentDataState,
	currentUserPointState,
} from "../../../../Recoil/OrderAtomState";

export function OrderForm() {
	const { orderData, setOrderData, orderTicketData } = useOrderContext();
	const { name, setName, email, setEmail, phone, setPhone } =
		useInfoContext();

	const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
	const [isLoading, setLoading] = useState(false);

	const setPaymentData = useSetRecoilState(PaymentDataState);
	const [currentUserPoint, setCurrentUserPoint] = useRecoilState(
		currentUserPointState
	);
	// console.log(orderTicketData);

	const ticketNameAndCount = () => {
		let count = -1;
		let product = orderTicketData[0]?.title;
		for (let item of orderTicketData) {
			count = count + item.count;
		}
		if (count > 0) {
			return product + " 외 " + count.toString() + "개";
		} else {
			return product;
		}
		// return
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		console.log("orderForm");
		e.preventDefault();
		setLoading(true);
		let products = ticketNameAndCount();
		let data = { ...orderData, name, email, products };
		console.log("data", data);
		requestPay(data, (rsp: any) => {
			if (rsp.success) {
				// axios로 HTTP 요청
				// axios({
				//   url: `http://localhost:3000/detail/${orderData.productId}`,
				//   method: "post",
				//   headers: { "Content-Type": "application/json" },
				//   data: {
				//     imp_uid: rsp.imp_uid,
				//     merchant_uid: rsp.merchant_uid,
				//   },
				// }).then((data) => {
				//   // 서버 결제 API 성공시 로직
				//   axios.post("url", { orderData });
				// });
				console.log(rsp);
			} else {
				alert(`${rsp.error_msg}`);
			}
			setLoading(false);
		});
	};
	const getPaymentUserInfo = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(`${process.env.REACT_APP_AMUSE_API}/api/payment`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				})
				.then((response) => {
					const data = response.data.data;
					console.log("getPaymentUserInfo", data);
					setPaymentData((prevData) => ({
						...prevData,
						reservationInfo: {
							...prevData.reservationInfo,
							reservationNameKR: data.userName,
							reservationPhoneNumber: data.userPhoneNumber,
							reservationEmail: data.userEmail,
						},
					}));
					setCurrentUserPoint(data.userPoint ? data.userPoint : 0);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		getPaymentUserInfo();
	}, []);

	return (
		<OrderInfoContainer>
			<OrderDetail isLoading={isLoading} />
			<PurchaseInfoItems isLoading={isLoading} />
		</OrderInfoContainer>
	);
}
