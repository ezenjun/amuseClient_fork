import React, { useState } from 'react';
import './ReservationBottom.scss';
import ReservationModal from './ReservationModal/ReservationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faL } from '@fortawesome/free-solid-svg-icons';

interface ReservationBottomProps {
    itemId: number | null;
}

function ReservationBottom({ itemId }: ReservationBottomProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWishBtnVisible, setIsWishBtnVisible] = useState(true);
    const [isPurchaseBtnVisible, setIsPurchaseBtnVisible] = useState(true);
    const [isModalPurchaseBtnVisible, setIsModalPurchaseBtnVisible] = useState(false);

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
    }

    return (
        <div className="reservation-bottom">
            {isWishBtnVisible && (
                <button className="wish-btn">
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                </button>
            )}

            {isPurchaseBtnVisible && (
                <button className="purchase-btn" onClick={handleClick}>구매하기</button>
            )}

            {isModalOpen && (
                <ReservationModal onClose={closeModal} itemId={itemId} />
            )}

            {isModalPurchaseBtnVisible && (
                <button className="purchase-btn">티켓 선택</button>
            )}
        </div>
    );
}

export default ReservationBottom;