import { Rating, Typography } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { ReactComponent as Star } from "../../../../assets/Icons/Star_22.svg";
import { ReactComponent as Close } from "../../../../assets/Icons/Close/Close_24.svg";
import { ReactComponent as EmptyStar } from "../../../../assets/Icons/Star_Empty.svg";
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
	Bold16Black,
	Regular14Gray,
	Regular20Black,
} from "../../../../components/Text/Text";
import axios from "axios";
import SquareImage from "../../../../components/Images/SquareImage";
import { WebButton } from "../../../../components/Button/WebButton";

type Props = {};

interface ReviewObject {
	rating: number | null;
	reviewContent: string;
	images: Array<{
		fileName: string;
		base64Data: string;
	}>;
}

const WriteReview = (props: Props) => {
	const [rating, setRating] = useState<number | null>(5);
	const [reviewObj, setReviewObj] = useState<ReviewObject>();
	const [reviewContent, setReviewContent] = useState("");
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const imgInput = useRef<HTMLInputElement>(null);

	// 이미지 파일 선택 시 이벤트 핸들러
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newFiles = Array.from(files);
			setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

			// Optionally, create image previews here
			const newPreviews = newFiles.map((file) =>
				URL.createObjectURL(file)
			);
			setImagePreviews((prevPreviews) => [
				...prevPreviews,
				...newPreviews,
			]);
			for (let i = 0; i < files.length; i++) {
				const reader = new FileReader();
				reader.onload = (event) => {
					if (event.target && event.target.result) {
						newPreviews.push(event.target.result as string);
						if (newPreviews.length === files.length) {
							setImagePreviews([
								...imagePreviews,
								...newPreviews,
							]);
						}
					}
				};
				reader.readAsDataURL(files[i]);
			}
		}
	};
	const handleSubmit = async () => {
		if (selectedFiles) {
			const images: ReviewObject["images"] = [];
			for (let i = 0; i < selectedFiles.length; i++) {
				const file = selectedFiles[i];
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result) {
						const base64data = reader.result as string;
						images.push({
							fileName: file.name,
							base64Data: base64data,
						});
						if (images.length === selectedFiles.length) {
							const reviewObject: ReviewObject = {
								rating: rating,
								reviewContent: reviewContent,
								images: images,
							};
							setReviewObj(reviewObject);
						}
					}
				};
				reader.readAsDataURL(file);
			}
			console.log(reviewObj);
		}
	};

	const [hover, setHover] = React.useState(-1);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setReviewContent(event.target.value);
	};
	const [showInfoModal, setShowInfoModal] = useState(true);

	return (
		<div>
			{showInfoModal && (
				<Modal
					setShowModal={setShowInfoModal}
					title="리뷰 작성"
					width={365}
				>
					<Regular20Black>
						구매하신 상품은 만족하시나요?
					</Regular20Black>
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
											const updatedPreviews = [
												...imagePreviews,
											];
											updatedPreviews.splice(index, 1); // Remove the image at the index
											setImagePreviews(updatedPreviews); // Update the state with the modified array
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
			)}
		</div>
	);
};

export default WriteReview;
