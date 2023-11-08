import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleSignOn from "./SingleSignOn";
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import Modal from "react-modal";
import * as S from "./CertificationStyle";

const Certification: React.FC = () => {
    const [checkAuthCode, setCheckAuthCode] = useState<boolean>(false);
    const [impUidData, setImpUid] = useRecoilState(impUid);

    const handleButtonClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const impUid = await SingleSignOn();
            openModal();
            setImpUid(impUid);
        } catch (error) {
            console.error(error);
        }
        setCheckAuthCode(true);
    };

    // 인증 완료 모달 창
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isShow, setIsShow] = useRecoilState(isVisible);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsShow(false);
    };


    return (
        <S.CertificationBody>
            <S.CertificationTitle>본인인증</S.CertificationTitle>
            <S.SingleSignBtn onClick={handleButtonClick}>간편인증</S.SingleSignBtn>

            <div className="modal">
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={{
                        content: {
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#FFF",
                            width: "300px",
                            height: "170px",
                            borderRadius: "8px",
                            padding: "0",
                        },
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            width: "100%",
                            height: "100%",
                            transition: "opacity 0.3s ease-out",
                        },
                    }}
                >
                    <div className="complete_modal">
                        <S.ModalContent>본인인증이<br />완료되었습니다.</S.ModalContent>
                        <S.ModalBtn onClick={closeModal}>확인</S.ModalBtn>
                    </div>
                </Modal>
            </div>
        </S.CertificationBody>
    );
}

export default Certification;