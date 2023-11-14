import React from "react";
import { ReservationInfoContainer } from "../../styles";
import {
	Bold32Black,
	Regular20Black,
	Regular20Gray,
} from "../../../../../../../../components/Text/Text";
import { GrayBoxList, GrayboxRow, RowDetail, RowName } from "../styles";
import GrayBox from "../../../../../../../../components/Box/GrayBox";
import { ItemInformationProps } from "../../../../../../../../Interfaces/PropsInterfaces";
import { formatDate } from "../../../../../../../../utils/DateFunctions";

interface ItemInfoProps {
	data: ItemInformationProps | undefined;
}

const ItemInformation = ({ data }: ItemInfoProps) => {
	const additionalInfoHTML = {
		__html: data?.itemIntroduceInformation || "",
	};
	return (
		<ReservationInfoContainer>
			<Bold32Black>상품 정보</Bold32Black>
			<GrayBoxList>
				{data?.itemName && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>상품명</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>{data.itemName}</Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
				{data?.reservationDateTime && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>예약 날짜</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{formatDate(
										new Date(data.reservationDateTime)
									)}
								</Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
				{data?.itemPayPrice && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>결제 가격</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{data.itemPayPrice.toLocaleString()}원
								</Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
				{data?.informationResponseDtoList && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>상품 옵션</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black>
									{data.itemPayPrice.toLocaleString()}원
								</Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
				{data?.itemIntroduceInformation && (
					<GrayBox verticalPadding={35} horizontalPadding={31}>
						<GrayboxRow>
							<RowName>
								<Regular20Gray>상품 소개</Regular20Gray>
							</RowName>
							<RowDetail>
								<Regular20Black
									dangerouslySetInnerHTML={additionalInfoHTML}
								></Regular20Black>
							</RowDetail>
						</GrayboxRow>
					</GrayBox>
				)}
			</GrayBoxList>
		</ReservationInfoContainer>
	);
};

export default ItemInformation;
