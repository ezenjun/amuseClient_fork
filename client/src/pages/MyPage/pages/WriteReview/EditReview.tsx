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
	editReviewId,
	editReviewVisibleState,
	editReviewobject,
	reviewItemID,
} from "../../../../Recoil/ReviewAtomState";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useCookies } from "react-cookie";

const EditReview = () => {
	const [cookies] = useCookies(["__jwtkid__"]);
	const token = cookies["__jwtkid__"];
	const EditReviewId = useRecoilValue(editReviewId);
	const [EditReviewObject, setEditReviewObject] =
		useRecoilState(editReviewobject);
	const setEditReviewModalVisible = useSetRecoilState(editReviewVisibleState);
	const [rating, setRating] = useState<number | null>(EditReviewObject.rate);
	const [reviewContent, setReviewContent] = useState(
		EditReviewObject.reviewContent
	);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>(
		EditReviewObject.oldImgs
	);
	const imgInput = useRef<HTMLInputElement>(null);

	const [hover, setHover] = React.useState(-1);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setReviewContent(event.target.value);
	};

	useEffect(() => {
		setEditReviewObject((prevEditReviewObject) => ({
			...prevEditReviewObject,
			rate: rating,
			reviewContent: reviewContent,
			oldImgs: EditReviewObject.oldImgs, // Use EditReviewObject.oldImgs for old images URLs
		}));
	}, [rating, reviewContent, EditReviewObject.oldImgs, setEditReviewObject]);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray: File[] = Array.from(event.target.files);
			const newImages: { fileName: string; base64Data: string }[] = [];

			filesArray.forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result) {
						const base64data = reader.result as string;
						newImages.push({
							fileName: file.name,
							base64Data: base64data,
						});

						if (newImages.length === filesArray.length) {
							// Set image previews
							const previews = newImages.map(
								(image) => image.base64Data
							);
							setImagePreviews((prevPreviews) => [
								...prevPreviews,
								...previews,
							]);

							// Update newImgs in editReviewObject
							setEditReviewObject((prevEditReviewObject) => ({
								...prevEditReviewObject,
								newImgs: [
									...prevEditReviewObject.newImgs,
									...newImages,
								],
							}));
						}
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const handleImageDelete = (index: number) => {
		const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
		setImagePreviews(updatedPreviews);

		if (index < EditReviewObject.oldImgs.length) {
			// Remove the image only from imagePreviews and update oldImgs
			const updatedOldImgs = [...EditReviewObject.oldImgs];
			updatedOldImgs.splice(index, 1);

			setEditReviewObject((prevEditReviewObject) => ({
				...prevEditReviewObject,
				oldImgs: updatedOldImgs,
			}));
			return;
		}

		const newImagesIndex = index - EditReviewObject.oldImgs.length;
		setEditReviewObject((prevEditReviewObject) => ({
			...prevEditReviewObject,
			newImgs: [
				...prevEditReviewObject.newImgs.slice(0, newImagesIndex),
				...prevEditReviewObject.newImgs.slice(newImagesIndex + 1),
			],
		}));
	};
	const handleSubmit = async () => {
		axios
			.put(
				`${process.env.REACT_APP_AMUSE_API}/my-page/item/review/${EditReviewId}`,
				EditReviewObject,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
				setEditReviewModalVisible(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Modal
			setShowModal={setEditReviewModalVisible}
			title="리뷰 수정"
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
				리뷰 수정하기
			</WebButton>
		</Modal>
	);
};

export default EditReview;
