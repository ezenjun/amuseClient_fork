import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { PageContainer } from "../../styles";
import {
	Bold20Gray,
	Bold32Black,
	Regular16Gray,
} from "../../../../components/Text/Text";
import {
	EachDayContainer,
	HistoryContainer,
	PaymentListContainer,
} from "./styles";
import EachPayment from "./components/EachPayment";
import { PaymentHistoryData } from "../../../../Types/DataTypes";
import axios from "axios";
import { formatDate } from "../../../../utils/DateFunctions";
import GrayBox from "../../../../components/Box/GrayBox";
import { useLocation } from "react-router";

type Props = {};

const PaymentHistory = (props: Props) => {
	const location = useLocation();
	const [paymentHistoryList, setPaymentHistoryList] =
		useState<Record<string, PaymentHistoryData[]>>();

	const [cookies] = useCookies(["__jwtkid__"]);
	const getPaymentHistoryList = async () => {
		const token = cookies.__jwtkid__;
		if (token) {
			axios
				.get(`${process.env.REACT_APP_AMUSE_API}/api/payment/list`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				})
				.then((response) => {
					const data = response.data.data;
					console.log(data);

					// 정렬 및 그룹화
					const sortedData = data.sort(
						(a: PaymentHistoryData, b: PaymentHistoryData) =>
							new Date(b.reservationDateTime).getTime() -
							new Date(a.reservationDateTime).getTime()
					);

					const groupedData: Record<string, PaymentHistoryData[]> =
						{};

					sortedData.forEach((item: PaymentHistoryData) => {
						const currentDateTime = new Date(
							item.reservationDateTime
						);
						const currentDate = currentDateTime
							.toISOString()
							.split("T")[0];

						if (!groupedData[currentDate]) {
							groupedData[currentDate] = [];
						}

						groupedData[currentDate].push(item);
					});

					setPaymentHistoryList(groupedData);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		getPaymentHistoryList();
	}, [location.pathname]);
	return (
		<PageContainer>
			<Bold32Black>결제내역</Bold32Black>
			{paymentHistoryList &&
			Object.keys(paymentHistoryList).length > 0 ? (
				<HistoryContainer>
					{Object.entries(paymentHistoryList || {}).map(
						([date, payments]) => (
							<EachDayContainer key={date}>
								<Regular16Gray>
									{formatDate(new Date(date))}
								</Regular16Gray>
								<PaymentListContainer>
									{payments.map((payment) => (
										<EachPayment
											key={payment.mainPaymentId}
											data={payment}
										/>
									))}
								</PaymentListContainer>
							</EachDayContainer>
						)
					)}
				</HistoryContainer>
			) : (
				<HistoryContainer>
					<GrayBox verticalPadding={24} horizontalPadding={31}>
						<Bold20Gray>결제 내역이 없습니다</Bold20Gray>
					</GrayBox>
				</HistoryContainer>
			)}
		</PageContainer>
	);
};

export default PaymentHistory;
