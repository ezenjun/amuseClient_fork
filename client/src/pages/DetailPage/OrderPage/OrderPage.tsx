import { useEffect, useState } from "react";
import { OrderForm } from "./Components/OrderForm";
import { useOrderContext } from "../Contexts/OrderContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainComponent from "../../../MainComponent";
import { OrderPageContainer, PageName } from "./styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	PaymentDataState,
	currentUserPointState,
} from "../../../Recoil/OrderAtomState";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
	deleteDataFromLocalStorage,
	getDataFromLocalStorage,
	getPortoneAccessToken,
	getPortonePaymentDetail,
} from "./api";
import { updatePostInfo } from "./API/import";

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
	const location = useLocation();
	useEffect(() => {
		const postMobilePayData = async () => {
			const searchParams = new URLSearchParams(location.search);
			const imp_uid = searchParams.get("imp_uid");
			if (imp_uid) {
				console.log("모바일 결제 성공");
				const paymentLocalStorageData =
					getDataFromLocalStorage("__paymentData__");
				const selectedItem = getDataFromLocalStorage("selectedItem");
				// portone uid로 get
				const portoneTK = await getPortoneAccessToken(token);
				console.log("portoneTK 완료");
				console.log("포트원 access", portoneTK);
				const pgData = await getPortonePaymentDetail(
					imp_uid,
					portoneTK
				);
				console.log("단건조회 결과", pgData);
				const convertedData = updatePostInfo(
					paymentLocalStorageData,
					selectedItem,
					pgData
				);
				console.log("convertedData", convertedData);

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
						if (response.status === 200) {
							console.log(response.data.data);
							navigate("/order/complete", {
								state: response.data.data,
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
				// deleteDataFromLocalStorage("__paymentData__");
				// deleteDataFromLocalStorage("selectedItem");
			}
		};
		postMobilePayData();
	}, [cookies, location.search, navigate, token]);

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

	// useEffect(() => {
	// 	checkOrderData();
	// 	setIsUseEffectOnFirst(true);
	// }, [orderTicketData]);

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
