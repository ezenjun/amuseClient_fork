import React, { SetStateAction } from "react";
import {
	CancelModalContainer,
	ConfirmButtonRow,
	ScrollContainer,
} from "../styles";
import { Bold16Gray } from "../../Text/Text";
import { WebButton } from "../../Button/WebButton";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import {
	showCancelModalState,
	showCancelRequestCompleteState,
} from "../../../Recoil/MypageAtomState";

interface PaymentCancelConfirmProps {
	paymentId: number;
	itemType: string;
	refundPayPrice?: number;
	showModal: boolean;
	setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const PaymentCancelConfirmModal = ({
	paymentId,
	itemType,
	refundPayPrice,
	showModal,
	setShowModal,
}: PaymentCancelConfirmProps) => {
	const [cookies] = useCookies();
	const token = cookies["__jwtkid__"];
	const [showCancel, setShowCancel] = useRecoilState(showCancelModalState);
	const [showCancelRequestComplete, setShowCancelRequestComplete] =
		useRecoilState(showCancelRequestCompleteState);
	const cancelPayment = async () => {
		if (itemType.includes("Hotel")) {
			await axios
				.patch(
					`${process.env.REACT_APP_AMUSE_API}/api/payment/pending/${paymentId}`,
					refundPayPrice,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					alert("취소 요청이 전달되었습니다.");
					setShowCancelRequestComplete(!showCancelRequestComplete);
				})
				.catch((error) => {
					alert("취소 실패");
					console.log(error.response.data.code);
				});
		} else {
			//컨시어지
			await axios
				.patch(
					`${process.env.REACT_APP_AMUSE_API}/api/payment/cancel/${paymentId}`,
					refundPayPrice,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					alert("컨시어지 예약이 취소되었습니다.");
					setShowCancelRequestComplete(!showCancelRequestComplete);
				})
				.catch((error) => {
					alert("컨시어지 취소 실패");
					console.log(error.response.data.code);
				});
		}

		setShowModal(!showModal);
		setShowCancel(!showCancel);
	};
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
					onClick={() => cancelPayment()}
				>
					취소 요청
				</WebButton>
			</ConfirmButtonRow>
		</ScrollContainer>
	);
};

export default PaymentCancelConfirmModal;
