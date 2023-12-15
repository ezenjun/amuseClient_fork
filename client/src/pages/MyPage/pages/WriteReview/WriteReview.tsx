import { Rating } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Star } from "../../../../assets/Icons/Star_22.svg";
import { ReactComponent as Close } from "../../../../assets/Icons/Close/Close_24.svg";
import { Common } from "../../../../styles";
import { Modal } from "../../../../components/Modal/Modal";
import GrayBox from "../../../../components/Box/GrayBox";
import {
	AddButton,
	Divider,
	ImgPreviewList,
	ReviewContentContainer,
	TextArea,
	TextAreaContainer,
} from "./style";
import {
	Bold16AppColor,
	Regular14Gray,
	Regular20Black,
} from "../../../../components/Text/Text";
import axios from "axios";
import SquareImage from "../../../../components/Images/SquareImage";
import { WebButton } from "../../../../components/Button/WebButton";
import {
	createReviewPaymentId,
	createReviewVisibleState,
	reviewItemID,
} from "../../../../Recoil/ReviewAtomState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";

interface ReviewObject {
	paymentId?: number | undefined;
	rate?: number | null | undefined;
	reviewContent?: string | undefined;
	reviewImgs?:
		| Array<{
				fileName: string;
				base64Data: string;
		  }>
		| undefined;
}

const WriteReview = () => {
	const paymentId = useRecoilValue(createReviewPaymentId);
	const itemId = useRecoilValue(reviewItemID);

	const [cookies] = useCookies(["__jwtkid__"]);
	const token = cookies["__jwtkid__"];
	const setCreateReviewModalVisible = useSetRecoilState(
		createReviewVisibleState
	);
	const [rating, setRating] = useState<number | null>(5);
	const [reviewObj, setReviewObj] = useState<ReviewObject | undefined>();
	const [reviewContent, setReviewContent] = useState("");
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const imgInput = useRef<HTMLInputElement>(null);
	// 이미지 파일 선택 시 이벤트 핸들러
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newFiles = Array.from(files);
			const updatedReviewObj = { ...reviewObj };
			setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
			const newPreviews = newFiles.map((file) =>
				URL.createObjectURL(file)
			);
			setImagePreviews((prevPreviews) => [
				...prevPreviews,
				...newPreviews,
			]);
			const updatedReviewImgs = newFiles.map((file) => ({
				fileName: file.name,
				base64Data: URL.createObjectURL(file),
			}));
			if (updatedReviewObj.reviewImgs) {
				updatedReviewObj.reviewImgs = [
					...(updatedReviewObj.reviewImgs || []),
					...updatedReviewImgs,
				];
			} else {
				updatedReviewObj.reviewImgs = updatedReviewImgs;
			}
			setReviewObj(updatedReviewObj);
		}
	};

	const handleImageDelete = (indexToDelete: number) => {
		const updatedPreviews = [...imagePreviews];
		const updatedReviewObj = { ...(reviewObj || {}) };
		updatedPreviews.splice(indexToDelete, 1);
		setImagePreviews(updatedPreviews);
		if (updatedReviewObj.reviewImgs) {
			updatedReviewObj.reviewImgs.splice(indexToDelete, 1);
		}
		setReviewObj(updatedReviewObj);
	};

	const handleSubmit = async () => {
		if (selectedFiles) {
			const reviewImgs: ReviewObject["reviewImgs"] = [];
			for (let i = 0; i < selectedFiles.length; i++) {
				const file = selectedFiles[i];
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result) {
						const base64data = reader.result as string;
						reviewImgs.push({
							fileName: file.name,
							base64Data: base64data,
						});
						if (reviewImgs.length === selectedFiles.length) {
							const reviewObject: ReviewObject = {
								paymentId: paymentId,
								rate: rating,
								reviewContent: reviewContent,
								reviewImgs: reviewObj?.reviewImgs,
							};
							setReviewObj(reviewObject);
						}
					}
				};
				reader.readAsDataURL(file);
			}
		}
		axios
			.post(
				`${process.env.REACT_APP_AMUSE_API}/my-page/item/${itemId}/review`,
				reviewObj,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
				setCreateReviewModalVisible(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [hover, setHover] = React.useState(-1);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setReviewContent(event.target.value);
	};

	useEffect(() => {
		const updatedReviewObject: ReviewObject = {
			paymentId: paymentId,
			rate: rating,
			reviewContent: reviewContent,
			reviewImgs: reviewObj?.reviewImgs || [],
		};
		setReviewObj(updatedReviewObject);
	}, [rating, reviewContent, paymentId, reviewObj?.reviewImgs]);

	return (
		<Modal
			setShowModal={setCreateReviewModalVisible}
			title="리뷰 작성"
			width={365}
		>
			<Regular20Black>구매하신 상품은 만족하시나요?</Regular20Black>
			<GrayBox verticalPadding={16} horizontalPadding={47}>
				<Rating
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
					value={rating}
					precision={1}
					name="hover-feedback"
					onChange={(event, newValue) => {
						setRating(newValue);
					}}
					onChangeActive={(event, newHover) => {
						setHover(newHover);
					}}
					icon={
						<Star
							width={43}
							height={43}
							fill={Common.colors.appColor}
						></Star>
					}
					emptyIcon={
						<Star
							width={43}
							height={43}
							fill={Common.colors.buttonLG}
						></Star>
					}
				/>
			</GrayBox>
			<Divider></Divider>
			<Regular20Black>자세한 리뷰를 작성해주세요</Regular20Black>
			<ReviewContentContainer>
				<TextAreaContainer>
					<TextArea
						value={reviewContent}
						onChange={handleInputChange}
						placeholder="자세한 리뷰를 작성해주세요"
						maxLength={1000}
					></TextArea>
					<Regular14Gray>
						{reviewContent.length} / 1,000
					</Regular14Gray>
				</TextAreaContainer>
				<AddButton onClick={() => imgInput.current?.click()}>
					<input
						id="photo-upload"
						type="file"
						multiple
						onChange={handleImageChange}
						style={{ display: "none" }}
						ref={imgInput}
					/>
					<Bold16AppColor>사진 첨부하기</Bold16AppColor>
				</AddButton>

				<ImgPreviewList>
					{imagePreviews.map((preview, index) => (
						<SquareImage
							key={index}
							imgUrl={preview}
							size={106}
							borderRadius={8}
						>
							<Close
								style={{
									position: "absolute",
									right: "0.5rem",
									top: "0.5rem",
									cursor: "pointer",
								}}
								onClick={(e) => {
									e.stopPropagation(); // Prevent event propagation
									handleImageDelete(index); // Call the new function to delete the image
								}}
							></Close>
						</SquareImage>
					))}
				</ImgPreviewList>
			</ReviewContentContainer>
			<WebButton
				verticalPadding={15}
				color="red"
				fontSize={16}
				onClick={handleSubmit}
			>
				리뷰 등록하기
			</WebButton>
		</Modal>
	);
};

export default WriteReview;
