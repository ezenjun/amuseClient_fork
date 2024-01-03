import React from "react";
import {
	EachPaymentTabletContainer,
	InfoTextContainer,
	ItemInfoTabletContainer,
	ItemNameContainer,
	PaymentButtonContainer,
} from "../styles";
import { useLocation, useNavigate, useParams } from "react-router";
import SquareImage from "../../../../../../components/Images/SquareImage";
import {
	Bold16DarkGray,
	Bold20Black,
	Regular14Gray,
} from "../../../../../../components/Text/Text";
import { ReactComponent as ArrowRightMobile } from "../../../../../../assets/Icons/Arrow/arrow_right_mobile.svg";
import {
	calculateNightStay,
	formatDate,
} from "../../../../../../utils/DateFunctions";
import Chips from "../../../../../../components/Chips/Chips";
import { WebButton } from "../../../../../../components/Button/WebButton";
import { PaymentHistoryData } from "../../../../../../Types/DataTypes";
import { useRecoilState } from "recoil";
import { showCancelModalState } from "../../../../../../Recoil/MypageAtomState";

type Props = {
	data: PaymentHistoryData;
	showPrice?: boolean;
};

const EachPaymentMobile = ({ data, showPrice }: Props) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [showCancelModal, setShowCancelModal] =
		useRecoilState(showCancelModalState);
	const onCLick = () => {
		if (id) {
			navigate(`/detail/${data.itemId}`);
		} else {
			navigate(`./${data.mainPaymentId}`, {
				state: data.mainPaymentId,
			});
		}
	};
	const onCancel = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.stopPropagation();
		if (id) {
			setShowCancelModal(!showCancelModal);
		}
	};
	return (
		<EachPaymentTabletContainer onClick={() => onCLick()}>
			{data.payStatus === "SUCCESS" && (
				<Chips color="red">결제 완료</Chips>
			)}
			{data.payStatus === "CANCEL" && (
				<Chips color="gray">결제 취소</Chips>
			)}
			{data.payStatus === "PENDING" && (
				<Chips color="orange">취소 진행중</Chips>
			)}

			<ItemInfoTabletContainer>
				<SquareImage
					size={60}
					imgUrl={data.itemImage}
					borderRadius={8}
				></SquareImage>
				<InfoTextContainer>
					<ItemNameContainer>
						<Bold20Black>{data.itemName}</Bold20Black>
						<ArrowRightMobile></ArrowRightMobile>
					</ItemNameContainer>
					<Regular14Gray>
						{formatDate(new Date(data.travelStartDate))} ~{" "}
						{formatDate(new Date(data.travelEndDate))}{" "}
						{calculateNightStay(
							data.travelStartDate,
							data.travelEndDate
						)}
					</Regular14Gray>
					{showPrice !== false && (
						<Bold16DarkGray style={{ whiteSpace: "nowrap" }}>
							{data.itemPayPrice.toLocaleString()} 원
						</Bold16DarkGray>
					)}
				</InfoTextContainer>
			</ItemInfoTabletContainer>
			<PaymentButtonContainer>
				{data.payStatus === "SUCCESS" && (
					<WebButton
						color="gray2"
						verticalPadding={15}
						fontSize={16}
						onClick={onCancel}
					>
						결제 취소
					</WebButton>
				)}
				{data.payStatus === "PENDING" ||
					(data.payStatus === "CANCEL" && (
						<WebButton
							color="red"
							verticalPadding={15}
							fontSize={16}
							onClick={() => navigate(`/detail/104`)}
						>
							다시 예약
						</WebButton>
					))}
			</PaymentButtonContainer>
		</EachPaymentTabletContainer>
	);
};

export default EachPaymentMobile;
