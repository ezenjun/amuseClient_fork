import React, { useState, useEffect } from "react";
import "./ReservationBottom.scss";
import ReservationModal from "./ReservationModal/ReservationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faL } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface ReservationBottomProps {
	itemId: number | null;
}

function ReservationBottom({ itemId }: ReservationBottomProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isWishBtnVisible, setIsWishBtnVisible] = useState(true);
	const [isPurchaseBtnVisible, setIsPurchaseBtnVisible] = useState(true);
	const [isModalPurchaseBtnVisible, setIsModalPurchaseBtnVisible] =
		useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsWishBtnVisible(true);
		setIsPurchaseBtnVisible(true);
		setIsModalPurchaseBtnVisible(false);
	};

	const handleClick = () => {
		openModal();
		setIsWishBtnVisible(false);
		setIsPurchaseBtnVisible(false);
		setIsModalPurchaseBtnVisible(true);
	};

	useEffect(() => {
		// 창 너비가 변경될 때마다 업데이트
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleButtonClick = () => {
		Swal.fire({
			icon: "success",
			title: "티켓 구입 문의",
			confirmButtonText: "확인",
			confirmButtonColor: "#F184A1",
			html: "📞 02-719-6811<br>✉️ info@amusetravel.com<br>",
		});
	};

	return (
		<div className="reservation-bottom">
			{isWishBtnVisible && (
				<button className="wish-btn">
					<FontAwesomeIcon icon={faHeart} className="heart-icon" />
				</button>
			)}

			{isPurchaseBtnVisible && (
				<button className="purchase-btn" onClick={handleClick}>
					구매하기
				</button>
			)}

			{isModalOpen && windowWidth <= 1023 && (
				<ReservationModal onClose={closeModal} itemId={itemId} />
			)}

			{isModalPurchaseBtnVisible && (
				<button className="purchase-btn" onClick={handleButtonClick}>
					티켓 선택
				</button>
			)}
		</div>
	);
}

export default ReservationBottom;
