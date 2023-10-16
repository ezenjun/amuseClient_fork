import { FormEvent, useState } from "react";
import { requestPay } from "../../API/import";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { OrderDetail } from "../OrderDetail";
import { useInfoContext } from "../../../Contexts/InfoContext";
import { OrderInfoContainer } from "./styles";
import { PurchaseInfoItems } from "../PurchaseInfoItems";
import { useRecoilState, useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../../Recoil/OrderAtomState";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "../../../../../Interfaces/DataInterfaces";
import { useNavigate } from "react-router";

export function OrderForm() {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);

	const onSubmit = (data: FormValues) => {
		setPaymentData((prevData) => ({
			...prevData,
			reservationInfo: data.reservationInfo,
			guestInfo: data.guestInfo,
		}));
		const allTermsAgreed = Object.values(paymentData.termsAgreement).every(
			(term) => term
		);
		if (allTermsAgreed) {
			requestPay(paymentData, (rsp: any) => {
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
					navigate("./complete");
				} else {
					alert(`${rsp.error_msg}`);
				}
				setLoading(false);
			});
		} else {
			alert("필수 약관을 동의해주세요");
		}
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
