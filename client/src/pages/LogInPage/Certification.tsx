import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleSignOn from "./SingleSignOn";
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import Modal from "react-modal";
import * as S from "./CertificationStyle";
import * as M from "../SignUpPage/SignUpAmuseStyle";

const Certification: React.FC = () => {
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
                                width: "754px",
                                height: "389px",
                                padding: "40px 43px"
                            },
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                width: "100%",
                                height: "100%",
                                transition: "opacity 0.3s ease-out",
                            },
                        }}
                    >
                        <div className="agree_modal">
                            <M.ModalHeader>
                                <M.ModalTitle>본인 인증이 완료되었습니다.</M.ModalTitle>
                            </M.ModalHeader>
                            <div className="agree_btn_box">
                                <M.AgreeBtn onClick={closeModal}>확인</M.AgreeBtn>
                            </div>
                        </div>
                    </Modal>
                </div>
        </S.CertificationBody>
    );
}

export default Certification;