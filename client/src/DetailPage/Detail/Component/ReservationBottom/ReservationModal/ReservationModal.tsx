import React, { useState } from 'react';
import Modal from 'react-modal';
import "./ReservationModal.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../TicketSelect/Calendar/Calendar';

interface ModalProps {
    onClose: () => void;
    itemId: number;
}

const onAfterOpen = () => {
    document.body.style.overflow = 'hidden';
};

function ReservationModal({ onClose, itemId }: ModalProps) {
    const onCloseModal = () => {
        document.body.style.overflow = 'auto';
        onClose();
    };

    return (
        <Modal
            isOpen
            onAfterOpen={onAfterOpen}
            onRequestClose={onCloseModal}
            style={{
                content: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    background: 'transparent',
                },
                overlay: {
                    backgroundColor: '#F5F6F7',
                    width: '100%',
                    height: '100%',
                },
            }}
        >
            <div className="reservation-modal">
                <header className='modal-header'>
                    상품 타이틀
                    <button className="btn-close" onClick={onCloseModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </header>
                <section className='modal-section'>
                    <Calendar itemId={itemId}/>
                </section>
            </div>
        </Modal>
    );
};

export default ReservationModal;
