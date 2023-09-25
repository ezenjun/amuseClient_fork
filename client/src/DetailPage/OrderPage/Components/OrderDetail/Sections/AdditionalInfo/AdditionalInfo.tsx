import React, { ChangeEvent } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./AdditionalInfo.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import {
	Regular16DarkGray,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import styled from "@emotion/styled";
import { Common, Pretendard } from "../../../../../../styles";

export function AdditionalInfo() {
	const { orderData, setOrderData } = useOrderContext();

	const additionalInfoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const data = { ...orderData };
		data[name] = value;
		console.log(data);
		setOrderData(data);
	};
	return (
		<DetailSectionContainer>
			<SubHeader>추가 요청사항</SubHeader>
			<Regular16DarkGray>
				1) 영문 성/이름 2)여권번호 3)생년월일 4)성별 5)여권만료일 6)출발
				항공권 정보 7)유아 인원 순서대로 기입해주세요
			</Regular16DarkGray>
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
