import React, { ChangeEvent, useEffect, useState } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./AdditionalInfo.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import {
	Regular16DarkGray,
	Regular16Gray,
} from "../../../../../../../components/Text/Text";
import styled from "@emotion/styled";
import { Common, Pretendard } from "../../../../../../../styles";
import { useRecoilState } from "recoil";
import { PaymentDataState } from "../../../../../../../Recoil/OrderAtomState";
import { useCookies } from "react-cookie";
import { AdditionalInfoDetail } from "../../../../../../../Interfaces/DataInterfaces";
import axios from "axios";

export function AdditionalInfo() {
	const { orderData, setOrderData } = useOrderContext();
	const [paymentData, setPaymentData] = useRecoilState(PaymentDataState);

	const additionalInfoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const data = { ...orderData };
		data[name] = value;
		setPaymentData((prevPaymentData) => ({
			...prevPaymentData,
			additionalInfo: value,
		}));

		setOrderData(data);
	};

	const [additionalInfoDetail, setAdditionalInfoDetail] =
		useState<AdditionalInfoDetail>();
	const [cookies] = useCookies(["__jwtkid__"]);
	const getPaymethodDetail = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(
					`${process.env.REACT_APP_AMUSE_API}/test/api/item/reservation-info?item_id=${paymentData.itemId}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					const data = response.data.data;
					setAdditionalInfoDetail(data);
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
			<SubHeader>추가 요청사항</SubHeader>
			<Regular16Gray>{additionalInfoDetail?.content}</Regular16Gray>
			<div className={styles.additionalInfoContainer}>
				<TextArea
					className={styles.text}
					placeholder="답변을 입력해주세요."
					name="additionalInfo"
					value={orderData.additionalInfo}
					onChange={additionalInfoHandler}
				></TextArea>
				<Regular16Gray>
					고객님의 요청사항이 전달되나, 간혹 현장 사정에 따라 반영되지
					않을 수 있습니다.
				</Regular16Gray>
			</div>
		</DetailSectionContainer>
	);
}

export const TextArea = styled.textarea`
	border: 1px solid ${Common.colors.gray2};
	padding: 1.5rem 1.875rem;
	border-radius: 0.5rem;
	min-height: 12.5rem;
	outline: none;
	${Pretendard({
		size: 16,
		weight: Common.bold.regular,
		color: Common.colors.black,
	})}
	::placeholder {
		${Pretendard({
			size: 16,
			weight: Common.bold.regular,
			color: Common.colors.gray,
		})}
	}
`;
