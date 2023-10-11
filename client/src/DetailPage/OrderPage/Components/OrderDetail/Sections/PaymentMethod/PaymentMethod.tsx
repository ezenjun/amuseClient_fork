import { ChangeEvent, useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./Payment.module.scss";
import kakaoImage from "../../../../Images/kakao.png";
import tossImage from "../../../../Images/toss.png";
import NpayImage from "../../../../Images/npay.png";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import GrayBox from "../../../../../../components/Box/GrayBox";
import {
	Bold16DarkGray,
	Regular16DarkGray,
} from "../../../../../../components/Text/Text";
import { EachPaymentNotice, PayMethodList } from "./styles";
import RadioButton from "../../../../../../components/Button/RadioButton/RadioButton";
import { useRecoilState } from "recoil";
import { PaymentDataState } from "../../../../../../Recoil/OrderAtomState";

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

	return (
		<DetailSectionContainer>
			<SubHeader>결제 방법</SubHeader>
			<GrayBox verticalPadding={20} horizontalPadding={30}>
				<EachPaymentNotice>
					<Bold16DarkGray>현장결제</Bold16DarkGray>
					<Regular16DarkGray>
						추가인원 비용들의 현장결제 발생 상품을 확인하세요.
					</Regular16DarkGray>
					<br />
				</EachPaymentNotice>

				<EachPaymentNotice>
					<Bold16DarkGray>취소불가 및 수수료</Bold16DarkGray>
					<Regular16DarkGray>
						주소 및 환불규정에 따라 취소불가, 수수료가 발생 할 수
						있습니다.
					</Regular16DarkGray>
					<br />
				</EachPaymentNotice>
				<EachPaymentNotice>
					<Bold16DarkGray>미성년자 및 법정대리인 필수</Bold16DarkGray>
					<Regular16DarkGray>
						미성년자는 법정대리인 동행 없이 투숙이 불가능합니다.
					</Regular16DarkGray>
				</EachPaymentNotice>
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
