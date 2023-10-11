import { FormEvent, useState } from "react";
import { requestPay } from "../../API/import";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { OrderDetail } from "../OrderDetail";
import { useInfoContext } from "../../../Contexts/InfoContext";
import { OrderInfoContainer } from "./styles";
import { PurchaseInfoItems } from "../PurchaseInfoItems";
import { useRecoilValue } from "recoil";
import {
	PaymentDataState,
} from "../../../../Recoil/OrderAtomState";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "../../../../Interfaces/DataInterfaces";

export function OrderForm() {
	const { orderData, setOrderData, orderTicketData } = useOrderContext();
	const { name, setName, email, setEmail, phone, setPhone } =
		useInfoContext();
	const [isLoading, setLoading] = useState(false);

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

	// const { handleSubmit } = useForm<FormValues>();
	const paymentData = useRecoilValue(PaymentDataState);

	const onSubmit = (data: FormValues) => {
		alert("clicked");
		console.log(data);
	};

	const methods = useForm<FormValues>({
		defaultValues: {
			reservationInfo: {
				reservationNameKR:
					paymentData.reservationInfo?.reservationNameKR || "",
				reservationBirthday:
					paymentData.reservationInfo?.reservationBirthday || "",
				reservationFirstNameEN:
					paymentData.reservationInfo?.reservationFirstNameEN || "",
				reservationLastNameEN:
					paymentData.reservationInfo?.reservationLastNameEN || "",
				reservationPhoneCode:
					paymentData.reservationInfo?.reservationPhoneCode || 82,
				reservationPhoneNumber:
					paymentData.reservationInfo?.reservationPhoneNumber || "",
				reservationEmail:
					paymentData.reservationInfo?.reservationEmail || "",
				reservationPassportNumber:
					paymentData.reservationInfo?.reservationPassportNumber ||
					"",
			},
			guestInfo: {},
		},
	});

	return (
		<FormProvider {...methods}>
			<OrderInfoContainer onSubmit={methods.handleSubmit(onSubmit)}>
				<OrderDetail isLoading={isLoading} />
				<PurchaseInfoItems isLoading={isLoading} />
			</OrderInfoContainer>
		</FormProvider>
	);
}
