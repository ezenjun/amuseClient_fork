import React, { SetStateAction } from "react";
import {
	CancelModalContainer,
	ConfirmButtonRow,
	ScrollContainer,
} from "../styles";
import { Bold16Gray } from "../../Text/Text";
import { WebButton } from "../../Button/WebButton";

interface PaymentCancelConfirmProps {
	paymentId: number;
	showModal: boolean;
	setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const PaymentCancelConfirmModal = ({
	paymentId,
	showModal,
	setShowModal,
}: PaymentCancelConfirmProps) => {
	return (
		<ScrollContainer>
			<Bold16Gray>취소 후에는 철회가 불가능합니다.</Bold16Gray>
			<ConfirmButtonRow>
				<WebButton
					fontSize={18}
					verticalPadding={18}
					color="red"
					width={140}
					onClick={() => setShowModal(!showModal)}
				>
					돌아가기
				</WebButton>
				<WebButton
					fontSize={18}
					verticalPadding={18}
					color="lightGray"
					width={140}
				>
					취소 요청
				</WebButton>
			</ConfirmButtonRow>
		</ScrollContainer>
	);
};

export default PaymentCancelConfirmModal;
