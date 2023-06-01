import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    onClose: () => void;
}

const onAfterOpen = () => {
    document.body.style.overflow = 'hidden';
};

function ReservationModal({ onClose }: ModalProps) {
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
                    backgroundColor: 'rgba( 73, 80, 86, 95% )',
                    width: '100%',
                    height: '100%',
                },
            }}
        >
            <div className="picture-modal">
                <div>dfadfdfadsfasdf</div>

                <button className="btn-close" onClick={onCloseModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </Modal>
    );
};

export default ReservationModal;
