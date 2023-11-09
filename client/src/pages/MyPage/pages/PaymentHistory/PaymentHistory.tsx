import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { PageContainer } from "../../styles";
import { Bold32Black, Regular16Gray } from "../../../../components/Text/Text";
import {
	EachDayContainer,
	HistoryContainer,
	PaymentListContainer,
} from "./styles";
import EachPayment from "./components/EachPayment";
import { PaymentHistoryData } from "../../../../Types/DataTypes";
import axios from "axios";
import { formatDate } from "../../../../utils/DateFunctions";

type Props = {};

const PaymentHistory = (props: Props) => {
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
					console.log(groupedData);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		getPaymentHistoryList();
	}, []);
	return (
		<PageContainer>
			<Bold32Black>결제내역</Bold32Black>
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
		</PageContainer>
	);
};

export default PaymentHistory;
