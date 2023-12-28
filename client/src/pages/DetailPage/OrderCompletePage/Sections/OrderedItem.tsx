import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedItemState } from "../../../../Recoil/OrderAtomState";
import { TicketData } from "../../../../Interfaces/DataInterfaces";
import { useOrderContext } from "../../Contexts/OrderContext";
import GrayBox from "../../../../components/Box/GrayBox";
import { OrderedItemContainer } from "../styles";
import {
	Bold16Black,
	Bold20DarkGray,
	Bold24Black,
	Regular16Gray,
	Regular20DarkGray,
} from "../../../../components/Text/Text";
import {
	ProductInfoContainer,
	ProductInfoTextContainer,
} from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/styles";
import SquareImage from "../../../../components/Images/SquareImage";
import getSelectedPriceIndex from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/getSelectedPriceIndex";
import { formatDate } from "../../../../utils/DateFunctions";
import {
	TicketContainer,
	TicketInfo,
	TicketLeft,
	TicketRight,
} from "../../OrderPage/Components/OrderDetail/Sections/ProductInfo/components/TicketList";
import { getDataFromLocalStorage } from "../../OrderPage/api";

type Props = {};

const OrderedItem = (props: Props) => {
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
	const [ticketData, setTicketData] = useState<TicketData[]>([]);
	const { orderTicketData, orderRange, setOrderRange } = useOrderContext();
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		window.removeEventListener("resize", handleResize);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
	}, [screenWidth]);

	useEffect(() => {
		setTicketData(orderTicketData);
	}, [orderTicketData]);

	// 모바일 결제 완료 후 selectedItem, ticketData
	useEffect(() => {
		console.log(orderTicketData, selectedItem);
		if (!selectedItem.title) {
			const data = getDataFromLocalStorage("selectedItem");
			console.log("selected Item", data);
			setSelectedItem(data);
		}
		if (!orderTicketData[0]) {
			const data = getDataFromLocalStorage("orderTicketData");
			console.log("orderTicketData", data);
			setTicketData(data);
		}
		if (!orderRange) {
			const data = getDataFromLocalStorage("orderRange");
			if (data && data.from && data.to) {
				data.from = new Date(data.from);
				data.to = new Date(data.to);
				setOrderRange(data);
			}
		}
	}, [
		selectedItem,
		setSelectedItem,
		orderRange,
		setOrderRange,
		orderTicketData,
	]);
	return (
		<GrayBox
			verticalPadding={screenWidth <= 768 ? 14 : 31}
			horizontalPadding={screenWidth <= 768 ? 14 : 31}
		>
			<OrderedItemContainer>
				{screenWidth > 768 && (
					<Bold20DarkGray>결제 상품 내역</Bold20DarkGray>
				)}

				<ProductInfoContainer>
					<SquareImage
						imgUrl={selectedItem.img}
						size={screenWidth <= 768 ? 77 : 110}
						borderRadius={8}
					></SquareImage>
					<ProductInfoTextContainer>
						{screenWidth <= 768 ? (
							<Bold16Black>{selectedItem.title}</Bold16Black>
						) : (
							<Bold24Black>{selectedItem.title}</Bold24Black>
						)}

						<Regular16Gray>
							{formatDate(new Date(selectedItem.startDate))}{" "}
							{selectedItem.duration}일
						</Regular16Gray>
					</ProductInfoTextContainer>
				</ProductInfoContainer>
				{ticketData
					.filter((ticket) => ticket.count > 0)
					.map((ticket, index) => {
						const selectedPriceIndex = getSelectedPriceIndex(
							ticket,
							orderRange
						);
						const price =
							selectedPriceIndex !== -1
								? ticket.priceList[selectedPriceIndex].price
								: 0;
						return (
							<TicketContainer>
								<TicketLeft>
									<TicketInfo>
										<Regular20DarkGray>
											{ticket.title}
										</Regular20DarkGray>
										<Regular16Gray>
											{ticket.content}
										</Regular16Gray>
									</TicketInfo>
									<Regular16Gray className="hide-on-mobile">
										{ticket.count} X{" "}
										{price.toLocaleString()}원
									</Regular16Gray>
								</TicketLeft>
								<TicketRight>
									<Bold20DarkGray>
										{(
											ticket.count * price
										).toLocaleString()}
										원
									</Bold20DarkGray>
								</TicketRight>
							</TicketContainer>
						);
					})}
			</OrderedItemContainer>
		</GrayBox>
	);
};

export default OrderedItem;
