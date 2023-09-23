import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import MainPicture from "./MainPicture/MainPicture";
import SubPicture from "./SubPicture/SubPicture";
import "./Picture.scss";
import { ItemIdProps } from "../../../../Interfaces/PropsInterfaces";
import { useSetRecoilState } from "recoil";
import { selectedItemState } from "../../../../Recoil/OrderAtomState";

function Picture({ itemId }: ItemIdProps) {
	/**
	 * Picture Data
	 */
	const [pictureData, setPictureData] = useState<string[]>([]);
	const mainPicture = pictureData ? pictureData.shift() : null;
	const subPicture = pictureData.slice(0, 3);
	const setSelectedItemImg = useSetRecoilState(selectedItemState);

	/**
	 * Picture API
	 */
	useEffect(() => {
		console.log(
			`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/picture`
		);
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/picture`)
			.then((response) => {
				let pictures = response.data.data.pictures;
				pictures = _.sortBy(pictures, "sequence");
				let result: any[] = [];
				pictures.map((item: any) => {
					result.push(item.imgUrl);
				});
				setPictureData(result);

				// 현재 아이템 대표사진 설정(결제용)
				setSelectedItemImg((prevSelectedItem) => ({
					...prevSelectedItem,
					img: result.shift() || "",
				}));
			})
			.catch((error) => {
				console.log("연결 실패");
			});
	}, [itemId]);

	return (
		<div className="Picture">
			<div className="mainpicture">
				{mainPicture && (
					<MainPicture
						src={mainPicture}
						alt={mainPicture}
						itemId={itemId}
						modal={pictureData}
					/>
				)}
			</div>
			<div className="subpicture">
				{subPicture.map((picture, key) => (
					<SubPicture
						key={itemId + key.toString()}
						src={picture}
						alt={picture}
						itemId={itemId}
						modal={pictureData}
					/>
				))}
			</div>
		</div>
	);
}

export default Picture;
