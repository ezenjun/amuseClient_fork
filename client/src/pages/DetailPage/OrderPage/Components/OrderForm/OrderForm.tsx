import { useEffect, useState } from "react";
import { requestPay, updatePostInfo } from "../../API/import";
import { useOrderContext } from "../../../Contexts/OrderContext";
import { OrderDetail } from "../OrderDetail";
import { OrderInfoContainer } from "./styles";
import { PurchaseInfoItems } from "../PurchaseInfoItems";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	PaymentDataState,
	currentUserPointState,
	selectedItemState,
} from "../../../../../Recoil/OrderAtomState";
import { FormProvider, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { FormValues } from "../../../../../Interfaces/DataInterfaces";
import { useNavigate } from "react-router";
import axios from "axios";

export function OrderForm() {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);
	const selectedItem = useRecoilValue(selectedItemState);
	const [cookies] = useCookies(["__jwtkid__"]);
	const token = cookies["__jwtkid__"];
	// 최종 결제 api
	const onSubmit = async (data: FormValues) => {
		const updatedPaymentData = {
			...paymentData,
			reservationInfo: data.reservationInfo,
			guestInfo: data.guestInfo,
			payAmount: paymentData.totalAmount - paymentData.pointUsed,
		};
		setPaymentData(updatedPaymentData);

		const allTermsAgreed = Object.values(paymentData.termsAgreement).every(
			(term) => term
		);
		if (allTermsAgreed && paymentData.totalAmount > 0) {
			requestPay(updatedPaymentData, (rsp: any) => {
				if (rsp.success) {
					const convertedData = updatePostInfo(
						updatedPaymentData,
						selectedItem,
						rsp
					);
					axios
						.post(
							`${process.env.REACT_APP_AMUSE_API}/api/payment`,
							convertedData,
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `${token}`,
								},
							}
						)
						.then((response) => {
							console.log(response);
							alert("변경되었습니다.");
							window.location.reload();
						})
						.catch((err) => {});
					navigate("./complete");
				} else if (rsp.status === "fail") {
					alert("결제가 취소되었습니다.");
					navigate("/order");
				} else {
					alert(`${rsp.error_msg}`);
					navigate("/order");
				}
			});
		} else {
			if (allTermsAgreed) {
				alert("올바르지 않은 가격입니다");
			} else {
				alert("필수 약관을 모두 동의해주세요");
			}
		}
	};

	const setCurrentUserPoint = useSetRecoilState(currentUserPointState);
	// 유저 정보 (이름, 생일, 전화번호 등)
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
							reservationBirthday: data.userBirthDay.replace(
								/-/g,
								""
							),
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

	// 결제 예약자 정보 초기화
	const methods = useForm<FormValues>();

	useEffect(() => {
		methods.reset({
			reservationInfo: {
				reservationNameKR:
					paymentData.reservationInfo.reservationNameKR || "",
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
					paymentData.reservationInfo.reservationEmail || "",
				reservationPassportNumber:
					paymentData.reservationInfo?.reservationPassportNumber ||
					"",
			},
			guestInfo: {},
		});
	}, [methods, paymentData.reservationInfo.reservationNameKR]);

	return (
		<FormProvider {...methods}>
			<OrderInfoContainer onSubmit={methods.handleSubmit(onSubmit)}>
				<OrderDetail isLoading={isLoading} />
				<PurchaseInfoItems isLoading={isLoading} />
			</OrderInfoContainer>
		</FormProvider>
	);
}
