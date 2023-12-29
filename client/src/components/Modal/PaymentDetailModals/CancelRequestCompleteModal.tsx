import React, { SetStateAction } from "react";
import { CancelModalContainer, ScrollContainer } from "../styles";
import { Regular16Gray } from "../../Text/Text";

import { WebButton } from "../../Button/WebButton";

interface CancelRequestCompleteProps {
	showModal: boolean;
	setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const CancelRequestCompleteModal = ({
	showModal,
	setShowModal,
}: CancelRequestCompleteProps) => {
	return (
		<ScrollContainer>
			<CancelModalContainer>
				<Regular16Gray>
					- 결제 취소 요청이 접수되었습니다.
					<br />- 환불이 완료되면 신용/체크카드와 현금결제의 경우
					영업일 기준 10일 이내에 실제 환불 내역 확인 가능합니다.
				</Regular16Gray>
				<WebButton
					fontSize={18}
					verticalPadding={18}
					color="red"
					width={308}
					onClick={() => setShowModal(!showModal)}
				>
					확인
				</WebButton>
			</CancelModalContainer>
		</ScrollContainer>
	);
};

export default CancelRequestCompleteModal;
