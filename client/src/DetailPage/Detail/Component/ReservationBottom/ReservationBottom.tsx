import React, { useState } from 'react';
import './ReservationBottom.scss';
import ReservationModal from './ReservationModal/ReservationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function ReservationBottom() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="reservation-bottom">
            <button className="wish-btn">
                <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            </button>

            <button className="purchase-btn" onClick={openModal}>구매하기</button>
            {isModalOpen && (
                <ReservationModal onClose={closeModal} itemId={0} />
            )}
        </div>
    );
}

export default ReservationBottom;