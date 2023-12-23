import { useEffect, useState } from "react";
import { OrderForm } from "./Components/OrderForm";
import { useOrderContext } from "../Contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import MainComponent from "../../../MainComponent";
import { OrderPageContainer, PageName } from "./styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	PaymentDataState,
	currentUserPointState,
} from "../../../Recoil/OrderAtomState";
import { useCookies } from "react-cookie";
import axios from "axios";
export const OrderPage = () => {
	// const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
	// console.log({ loggedIn });
	const [cookies] = useCookies(["__jwtkid__"]);
	const token = cookies["__jwtkid__"];
	const [isShow, setIsShow] = useState(false);
	const [isUseEffectOnFirst, setIsUseEffectOnFirst] = useState(false);
	const { orderTicketData } = useOrderContext();
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);

	const navigate = useNavigate();

	const checkOrderData = () => {
		let count = 0;
		for (let i = 0; i < orderTicketData.length; i++) {
			if (orderTicketData[i].count) {
				count += 1;
			}
		}
		if (count < 1) {
			navigate(-1);
		} else {
			setIsShow(true);
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
					setPaymentData((prevData) => ({
						...prevData,
						reservationInfo: {
							...prevData.reservationInfo,
							reservationNameKR: data.userName,
							reservationBirthday: data.userBirthDay,
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

	useEffect(() => {
		checkOrderData();
		setIsUseEffectOnFirst(true);
	}, [orderTicketData]);

	useEffect(() => {
		if (isUseEffectOnFirst) {
			if (!isShow) {
				navigate("/");
			}
		}
	}, [isUseEffectOnFirst]);

	return (
		<MainComponent>
			<OrderPageContainer>
				<PageName>결제하기</PageName>
				<OrderForm />
			</OrderPageContainer>
		</MainComponent>
	);
};
