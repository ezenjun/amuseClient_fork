import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainComponent from "../../MainComponent";
import Modal from "react-modal";
import CloseIcon from "../LogInPage/Icons/close_icon.png";
import InfoForm from "./InfoForm";
import * as S from "./SignUpAmuseStyle";
import Certification from "../LogInPage/Certification";


const SignUpAmuse: React.FC = () => {
    const movePage = useNavigate();

    // 약관 동의
    const [allAgreed, setAllAgreed] = useState<boolean>(false);
    const [personalInfoAgreed, setPersonalInfoAgreed] = useState<boolean>(false);
    const [marketingInfoAgreed, setMarketingInfoAgreed] = useState<boolean>(false);

    const handleAllAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setAllAgreed(isChecked);
        setPersonalInfoAgreed(isChecked);
        setMarketingInfoAgreed(isChecked);
    };

    const handlePersonalInfoAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setPersonalInfoAgreed(isChecked);
        setAllAgreed(isChecked && marketingInfoAgreed);
    };

    const handleMarketingInfoAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setMarketingInfoAgreed(isChecked);
        setAllAgreed(personalInfoAgreed && isChecked);
    };

    // 약관 동의 Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>("");
    const openModal = (content: string) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 다음 버튼 클릭 시
    const [currentStep, setCurrentStep] = useState<number>(1);
    const handleNextClick = () => {
        setCurrentStep(currentStep + 1);
    };

    const [name, setName] = useState<string>('');
    const handleNextClickInfo = (name: string) => {
        setName(name);
        setCurrentStep(currentStep + 1);
    };

    const handleContinueClick = () => {
        movePage("/LogIn");
    };


    return (
        <MainComponent>
            <S.SignUpBody>
                {/* 약관동의 */}
                {currentStep === 1 &&
                    <div>
                        <S.SignUpTitle>약관동의</S.SignUpTitle>
                        <S.AllAgreeBox>
                            <S.AgreeCheck id="all_agree" onChange={handleAllAgreeChange} checked={allAgreed}></S.AgreeCheck>
                            <S.AllAgreeText htmlFor="all_agree">전체동의</S.AllAgreeText>
                        </S.AllAgreeBox>
                        <S.AgreeBox>
                            <S.AgreeCheck id="agree_personal_info" onChange={handlePersonalInfoAgreeChange} checked={personalInfoAgreed}></S.AgreeCheck>
                            <S.AgreeText htmlFor="agree_personal_info">
                                (필수)<S.ContentBtn onClick={() => openModal("personalInfo")}>개인정보 활용</S.ContentBtn>동의
                            </S.AgreeText>
                        </S.AgreeBox>
                        <S.AgreeBox>
                            <S.AgreeCheck id="agree_marketing_info" onChange={handleMarketingInfoAgreeChange} checked={marketingInfoAgreed}></S.AgreeCheck>
                            <S.AgreeText htmlFor="agree_marketing_info">
                                (선택)<S.ContentBtn onClick={() => openModal("marketingInfo")}>마케팅정보 활용</S.ContentBtn>동의
                            </S.AgreeText>
                        </S.AgreeBox>
                        <S.NextButton onClick={handleNextClick} disabled={!personalInfoAgreed}>다음</S.NextButton>
                    </div>
                }

                {/* 본인인증 & 정보입력 */}
                {currentStep === 2 && (
                    <div>
                        <Certification onCalledBy="SignUp" />
                        <S.SignUpTitle>정보입력</S.SignUpTitle>
                        <InfoForm onNextStep={handleNextClickInfo} />
                    </div>
                )}

                {/* 완료 */}
                {currentStep === 3 && (
                    <div>
                        <S.SignUpTitle>회원가입완료</S.SignUpTitle>
                        <S.textBox>
                            <S.DoneText>{name}님 반가워요!<br /> 회원가입이 완료되었어요</S.DoneText>
                            <S.WelcomeText>누구나 갈 수 있는, 모두가 즐거운 여행</S.WelcomeText>
                        </S.textBox>
                        <S.NextButton onClick={handleContinueClick}>계속하기</S.NextButton>
                    </div>
                )}

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
                                height: "486px",
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
                            <S.ModalHeader>
                                <S.ModalTitle>{modalContent === "personalInfo" ? "개인정보 활용 동의 (필수)" : "마케팅정보 활용 동의 (선택)"}</S.ModalTitle>
                                <button className="modal_btn_close" onClick={closeModal}>
                                    <img src={CloseIcon} className="close_icon" />
                                </button>
                            </S.ModalHeader>
                            <S.ModalContent>내용 추가 예정</S.ModalContent>
                            <div className="agree_btn_box">
                                <S.AgreeBtn onClick={closeModal}>확인</S.AgreeBtn>
                            </div>
                        </div>
                    </Modal>
                </div>
            </S.SignUpBody>
        </MainComponent >
    );
}

export default SignUpAmuse;