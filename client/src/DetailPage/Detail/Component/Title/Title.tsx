import React, { useEffect, useState } from "react";
import TitleDetail from "./TitleDetail/TitleDetail";
import axios from "axios";
import "./Title.scss";
import { ItemIdProps } from "../../../../Interfaces/PropsInterfaces";
import { TitleData } from "../../../../Interfaces/DataInterfaces";
import { useSetRecoilState } from "recoil";
import {
	PaymentDataState,
	selectedItemState,
} from "../../../../Recoil/OrderAtomState";

function Title({ itemId }: ItemIdProps) {
	/**
	 * Title Data
	 */
	const [titleData, setTitleData] = useState<TitleData>();
	const formattedRated = titleData?.rated;
	const formattedRatedData = formattedRated?.toFixed(1) ?? "0.0";
	const setSelectedItemTitle = useSetRecoilState(selectedItemState);
	const setPaymentData = useSetRecoilState(PaymentDataState);

	/**
	 * Title API
	 */
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
			.then((response) => {
				setTitleData(response.data.data);
				setSelectedItemTitle((prevSelectedItem) => ({
					...prevSelectedItem,
					title: response.data.data.title,
				}));
				const data = response.data.data;
				setPaymentData((prevData) => ({
					...prevData,
					reservationInfo: {
						...prevData.reservationInfo,
						itemType: data.itemType,
					},
				}));
			})
			.catch((error) => {
				console.log("연결 실패");
			});
	}, [itemId]);

	return (
		<div className="Title">
			<TitleDetail
				country={titleData?.country ?? "country"}
				city={titleData?.city ?? "city"}
				title={titleData?.title ?? "title"}
				rated={formattedRatedData ? Number(formattedRatedData) : 0.0}
				review_count={titleData?.review_count ?? 0.0}
			/>
		</div>
	);
}

export default Title;
