import React, { ChangeEvent, useEffect, useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./Payment.module.scss";
import kakaoImage from "../../../../Images/kakao.png";
import tossImage from "../../../../Images/toss.png";
import NpayImage from "../../../../Images/npay.png";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import GrayBox from "../../../../../../../components/Box/GrayBox";
import {
	Bold16DarkGray,
	Regular16DarkGray,
} from "../../../../../../../components/Text/Text";
import { EachPaymentNotice, PayMethodList } from "./styles";
import RadioButton from "../../../../../../../components/Button/RadioButton/RadioButton";
import { useRecoilState } from "recoil";
import { PaymentDataState } from "../../../../../../../Recoil/OrderAtomState";
import { PayMethodDetail } from "../../../../../../../Interfaces/DataInterfaces";
import { useCookies } from "react-cookie";
import axios from "axios";

export function PaymentMethod() {
	const { orderData, setOrderData } = useOrderContext();
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);
	const [selectedOption, setSelectedOption] =
		useState<string>("신용/체크카드");

	const handleRadioChange = (option: string) => {
		setSelectedOption(option);
		const data = { ...orderData };
		data["pay_method"] = option;
		setOrderData(data);
		setPaymentData((prevData) => ({
			...prevData,
			paymentMethod: option,
			// Add other properties as needed
		}));
		console.log(option);
	};

	useEffect(() => {
		setPaymentData((prevData) => ({
			...prevData,
			paymentMethod: selectedOption,
			// Add other properties as needed
		}));
	}, [selectedOption]);

	const [paymethodDetail, setPaymethodDetail] = useState<PayMethodDetail>();
	const [cookies] = useCookies(["__jwtkid__"]);
	const getPaymethodDetail = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(
					`${process.env.REACT_APP_AMUSE_API}/test/api/payment-method-info-type?type=${paymentData.itemType}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					const data = response.data.data;
					setPaymethodDetail(data);
					console.log("paymethodDetail", data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		getPaymethodDetail();
	}, []);

	return (
		<DetailSectionContainer>
			<SubHeader>결제 방법</SubHeader>
			<GrayBox verticalPadding={20} horizontalPadding={30}>
				{paymethodDetail?.content
					?.split(/\n\n/)
					.map((paragraph, index) => (
						<React.Fragment key={index}>
							{index > 0 && <br />}{" "}
							{paragraph.split(/\n/).map((line, lineIndex) => (
								<React.Fragment key={lineIndex}>
									{lineIndex > 0 && <br />}
									{lineIndex === 0 ? (
										<Bold16DarkGray>{line}</Bold16DarkGray>
									) : (
										<Regular16DarkGray>
											{line}
										</Regular16DarkGray>
									)}
								</React.Fragment>
							))}
						</React.Fragment>
					))}
			</GrayBox>
			<PayMethodList>
				<RadioButton
					name="pay_method"
					checked={selectedOption === "신용/체크카드"}
					label="신용/체크카드"
					onClick={() => handleRadioChange("신용/체크카드")}
				/>
				<RadioButton
					name="pay_method"
					checked={selectedOption === "현금 결제"}
					label="현금 결제"
					onClick={() => handleRadioChange("현금 결제")}
				/>
				<RadioButton
					name="pay_method"
					checked={selectedOption === "카카오페이"}
					label="카카오페이"
					onClick={() => handleRadioChange("카카오페이")}
				/>
				<RadioButton
					name="pay_method"
					checked={selectedOption === "네이버페이"}
					label="네이버페이"
					onClick={() => handleRadioChange("네이버페이")}
				/>
			</PayMethodList>
		</DetailSectionContainer>
	);
}
