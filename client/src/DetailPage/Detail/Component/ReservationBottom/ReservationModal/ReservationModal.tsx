import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./ReservationModal.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../TicketSelect/Calendar/Calendar';
import customModule from '../../TicketSelect/custom.module.scss';
import axios from "axios";

interface ModalProps {
    onClose: () => void;
    itemId: number | null;
}

interface TitleData {
    title: string
}

const onAfterOpen = () => {
    document.body.style.overflow = 'hidden';
};

function ReservationModal({ onClose, itemId }: ModalProps) {
    // title data
    const [titleData, setTitleData] = useState<TitleData>();

    // title API
    useEffect(() => {
        axios
            .get(`https://ammuse.store/detail/${itemId}/title`)
            .then((response) => {
                setTitleData(response.data.data)
            })
            .catch(error => {
                console.log("연결 실패");
            });
    }, [itemId]);

    // modal close
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
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                    // border: 'none',
                    background: 'transparent',
                    padding: 0,
                },
                overlay: {
                    backgroundColor: '#F8F9FA',
                    width: '100%',
                    height: '100%',
                    maxWidth: '1060px',
                    transition: 'opacity 0.3s ease-out'
                },
            }}
        >
            <div className="reservation-modal">
                <header className='modal-header'>
                    <div className='modal-header-title'>
                        {titleData?.title}
                    </div>
                    <button className="modal-btn-close" onClick={onCloseModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </header>
                <div className='modal-section'>
                    <Calendar
                        itemId={itemId}
                        numberOfmonth={1}
                        classNone={customModule['invisible']}
                        classContainer={customModule['container']}
                        classTicketContainer={customModule['ticket-container']}
                        classTicketPrice={customModule['ticket-container-price']}
                        classTicketCnt={customModule['ticket-container-cnt']}
                    />
                </div>
            </div>
        </Modal >
    );
};

export default ReservationModal;
