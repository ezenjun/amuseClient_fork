import React, { useEffect, useState } from "react";
import GrayBox from "../../../../../../../components/Box/GrayBox";
import { SubHeader } from "../../../../styles";
import { CancelPolicyContainer, TitleRow } from "./styles";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { PaymentDataState } from "../../../../../../../Recoil/OrderAtomState";
import { ReactComponent as ArrowDown } from "../../../../../../../assets/Icons/Arrow/arrow_down_24.svg";
import { ReactComponent as ArrowUp } from "../../../../../../../assets/Icons/Arrow/arrow_up_24.svg";
import { Bold24DarkGray } from "../../../../../../../components/Text/Text";

export const CancelPolicy = () => {
	const [showPolicy, setShowPolicy] = useState(true);
	const [cancelPolicy, setCancelPolicy] = useState<string>("");
	const [cookies] = useCookies(["__jwtkid__"]);
	const paymentData = useRecoilValue(PaymentDataState);
	const getCancelPolicy = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(
					`${process.env.REACT_APP_AMUSE_API}/test/api/cancel-policy-info-type?type=${paymentData.itemType}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${token}`,
						},
					}
				)
				.then((response) => {
					const data = response.data.data;
					setCancelPolicy(data.content);
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		getCancelPolicy();
	}, []);
	return (
		<GrayBox verticalPadding={18} horizontalPadding={18}>
			<TitleRow>
				<Bold24DarkGray>결제 취소 규정</Bold24DarkGray>
				{showPolicy ? (
					<ArrowDown
						onClick={() => setShowPolicy(!showPolicy)}
					></ArrowDown>
				) : (
					<ArrowUp
						onClick={() => setShowPolicy(!showPolicy)}
					></ArrowUp>
				)}
			</TitleRow>
			{showPolicy && (
				<CancelPolicyContainer>
					{cancelPolicy.split("\n").map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</CancelPolicyContainer>
			)}
		</GrayBox>
	);
};
