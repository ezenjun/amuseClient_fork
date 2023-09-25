import React from "react";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../../../../../../Recoil/OrderAtomState";
import GrayBox from "../../../../../../../components/Box/GrayBox";
import { ProductInfoContainer, ProductInfoTextContainer } from "../styles";
import SquareImage from "../../../../../../../components/Images/SquareImage";
import {
	Bold24Black,
	Regular16Gray,
} from "../../../../../../../components/Text/Text";
import { formatDate } from "../../../../../../../utils/DateFunctions";

const ProductMain = () => {
	const selectedItem = useRecoilValue(selectedItemState);

	return (
		<GrayBox verticalPadding={20} horizontalPadding={25}>
			<ProductInfoContainer>
				<SquareImage
					imgUrl={selectedItem.img}
					size={110}
					borderRadius={8}
				></SquareImage>
				<ProductInfoTextContainer>
					<Bold24Black>{selectedItem.title}</Bold24Black>
					<Regular16Gray>
						{formatDate(selectedItem.startDate)}{" "}
						{selectedItem.duration}일
					</Regular16Gray>
				</ProductInfoTextContainer>
			</ProductInfoContainer>
		</GrayBox>
	);
};

export default ProductMain;
