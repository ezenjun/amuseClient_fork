import React, { ChangeEvent } from "react";
import { useOrderContext } from "../../../../../Contexts/OrderContext";
import { CommonHeader } from "../../../CommonHeader";
import styles from "./Point.module.scss";
import { DetailSectionContainer } from "../../styles";
import { SubHeader } from "../../../../styles";
import GrayBox from "../../../../../../components/Box/GrayBox";
import styled from "@emotion/styled";
import { Common, Pretendard } from "../../../../../../styles";
import WebButton from "../../../../../../components/Button/WebButton";
import {
	Regular16Black,
	Regular16Gray,
} from "../../../../../../components/Text/Text";
import { PointProps } from "../../../../../../Interfaces/PropsInterfaces";

export const Point = ({ myPoint }: PointProps) => {
	const { orderData, setOrderData } = useOrderContext();

	const pointHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const data = { ...orderData };
		if (Number(value) > myPoint) {
			data["point"] = myPoint;
			setOrderData(data);
			return;
		} else {
			data[name] = value;
			setOrderData(data);
		}
	};
	const onClickUseAll = () => {
		const data = { ...orderData };
		if (orderData.point >= myPoint) {
			return;
		} else {
			data["point"] = myPoint;
			setOrderData(data);
		}
	};

	return (
		<DetailSectionContainer>
			<SubHeader>포인트 사용</SubHeader>
			<PointContainer>
				<GrayBox verticalPadding={18} horizontalPadding={24}>
					<InputContainer>
						<PointInput
							type="number"
							min={0}
							max={myPoint}
							placeholder="0"
							name="point"
							value={
								orderData.point > myPoint
									? myPoint
									: orderData.point
							}
							onChange={pointHandler}
							onKeyDown={(e) =>
								["e", "E", "+", "-"].includes(e.key) &&
								e.preventDefault()
							}
						/>
						<WonText value={orderData.point}>원</WonText>
					</InputContainer>
				</GrayBox>
				<WebButton
					width={174}
					color="lightGray"
					verticalPadding={18}
					fontSize={20}
					isActive={orderData.point < myPoint && myPoint > 0}
					onClick={onClickUseAll}
				>
					모두 사용
				</WebButton>
			</PointContainer>
			<UserPointContainer>
				<Regular16Gray>보유 포인트</Regular16Gray>
				<Regular16Black> {myPoint}P</Regular16Black>
			</UserPointContainer>
		</DetailSectionContainer>
	);
};

export const PointContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 1.25rem;
`;

export const PointInput = styled.input<{ value: number }>`
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
	text-align: right;
	padding: 0 !important;
	margin: 0;
	${(props) =>
		Pretendard({
			size: 20,
			weight: Common.bold.bold,
			color:
				props.value > 0 ? Common.colors.appColor : Common.colors.gray,
		})};
	outline: none;
	background: none;
	border: none;
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const InputContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	padding: 0;
	margin: 0;
`;

export const WonText = styled.span<{ value: number }>`
	display: inline-block;
	${(props) =>
		Pretendard({
			size: 20,
			weight: Common.bold.bold,
			color:
				props.value > 0 ? Common.colors.appColor : Common.colors.gray,
		})}
`;
export const UserPointContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.75rem;
`;
