import React from "react";
import MainComponent from "../../../MainComponent";
import { PageName } from "../OrderPage/styles";
import {
	BottomButtonContainer,
	OrderCompletePageContainer,
	OrderInfoContainer,
} from "./styles";
import OrderedItem from "./Sections/OrderedItem";
import UsedPoint from "./Sections/UsedPoint";
import TotalAmount from "./Sections/TotalAmount";
import { WebButton } from "../../../components/Button/WebButton";
import { useLocation, useNavigate } from "react-router";
import { Regular20Gray } from "../../../components/Text/Text";

const OrderCompletePage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { state } = location;
	const id = 1;
	return (
		<MainComponent>
			<OrderCompletePageContainer>
				<PageName>결제 접수 완료</PageName>
				<Regular20Gray style={{ marginTop: "1.625rem" }}>
					결제 완료되었으며 결제 여부 확인 중입니다. 영업일 기준
					24시간 이내로 확정 여부를 알려드립니다.
				</Regular20Gray>

				<OrderInfoContainer>
					<OrderedItem />
					<UsedPoint />
					<TotalAmount />
				</OrderInfoContainer>
				<BottomButtonContainer>
					<WebButton
						fontSize={18}
						verticalPadding={18}
						color="white"
						onClick={() => navigate("/")}
					>
						홈으로 가기
					</WebButton>
					<WebButton
						fontSize={18}
						verticalPadding={18}
						color="red"
						onClick={() =>
							navigate(
								`/MyPage/payment-history/${state.mainPaymentId}`
							)
						}
					>
						결제 상세 정보 보기
					</WebButton>
				</BottomButtonContainer>
			</OrderCompletePageContainer>
		</MainComponent>
	);
};

export default OrderCompletePage;
