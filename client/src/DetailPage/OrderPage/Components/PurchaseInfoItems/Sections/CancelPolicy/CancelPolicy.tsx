import React from "react";
import GrayBox from "../../../../../../components/Box/GrayBox";
import { SubHeader } from "../../../../styles";
import { CancelPolicyContainer } from "./styles";

type Props = {};

const CancelPolicy = (props: Props) => {
	return (
		<GrayBox verticalPadding={18} horizontalPadding={18}>
			<SubHeader>결제 취소 규정</SubHeader>
			<CancelPolicyContainer>
				<span className="title">※ 국내여행 취소료 규정</span>
				<br />- 여행 취소시 국내여행표준약관 제 13조
				소비자분쟁해결규정에 따라 아래의 비율로 취소료가 부과됩니다.{" "}
				<br />- (단, 당사의 귀책사유로 여행출발 취소 경우에도 동일한
				규정이 적용됩니다.)
				<br /> <br />- 여행개시 30일(~30)까지 통보시 : 계약금환급
				<br />- 여행개시 30일전(29~7)까지 통보시 : 여행요금의 30% 배상
				<br />- 여행개시 7일까지 통보시: 여행요금의 50% 배상
				<br />- 여행개시 7일전(7~2)까지 통보시 : 여행요금의 70% 배상
				<br />- 여행개시 1일전까지 통보시 : 여행요금의 90% 배상
				<br />- 여행개시 당일 통보시: 여행요금의 100% 배상
				<br />
				<br />- 취소규정은 성수기 및 예약시점에 따라 변동될 수 있습니다.
				자세한 취소규정은 상담을 통하여 확인 가능합니다.{" "}
			</CancelPolicyContainer>
		</GrayBox>
	);
};

export default CancelPolicy;
