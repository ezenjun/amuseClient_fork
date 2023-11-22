import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import MainComponent from "../../MainComponent";
import CloseIcon from "../LogInPage/Icons/close_icon.png";
import InfoForm from "./InfoForm";
import * as S from "./SignUpAmuseStyle";
import Certification from "../LogInPage/Certification";
import { useCookies } from "react-cookie";

interface TermData {
    id: number;
    title: string;
    content: string;
    mandatory: boolean;
}

const SignUpAmuse: React.FC = () => {
    const movePage = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([
        "terms",
    ]);

    // 약관 동의 api
    const [terms, setTerms] = useState<TermData[]>([]);
    const [termAgreeStatus, setTermAgreeStatus] = useState<number[]>([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_AMUSE_API}/test/api/terms-of-service-info-type?type=SignUp`)
            .then((response) => {
                const initialAgreeStatus = response.data.data.content.map(() => 0);
                setTermAgreeStatus(initialAgreeStatus);
                setTerms(response.data.data.content);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    // 약관 동의 버튼
    const [allAgreed, setAllAgreed] = useState<boolean>(false);
    const handleAllAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        const newAgreeStatus = termAgreeStatus.map(() => (isChecked ? 1 : 0));
        setTermAgreeStatus(newAgreeStatus);
        setAllAgreed(isChecked);
    };

    const handleTermAgreeChange = (index: number) => {
        const newAgreeStatus = [...termAgreeStatus];
        newAgreeStatus[index] = newAgreeStatus[index] === 1 ? 0 : 1;
        setTermAgreeStatus(newAgreeStatus);
        setAllAgreed(newAgreeStatus.every((status) => status === 1));
    };

    // 약관 동의 Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<number | null>(null);
    const openModal = (index: number) => {
        setModalContent(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 다음 버튼 클릭 시
    const [currentStep, setCurrentStep] = useState<number>(1);
    const handleNextClick = () => {
        setCookie("terms", termAgreeStatus);
        console.log(termAgreeStatus);
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


    // 반응형 modal
    const [modalStyles, setModalStyles] = useState({
        content: {
            width: "754px",
            height: "486px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFF",
            padding: "40px 43px",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            transition: "opacity 0.3s ease-out",
        },
    });

    const updateModalStyles = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            setModalStyles(prevStyles => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    width: "100%",
                    height: "100%",
                    padding: "7px 16px",
                },
            }));
        } else if (screenWidth <= 1023) {
            setModalStyles(prevStyles => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    width: "522px",
                    height: "422px",
                    padding: "25px 30px",
                },
            }));
        } else {
            setModalStyles(prevStyles => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    width: "754px",
                    height: "486px",
                    padding: "40px 43px",
                },
            }));
        }
    };

    useEffect(() => {
        updateModalStyles();
        window.addEventListener('resize', updateModalStyles);
        return () => {
            window.removeEventListener('resize', updateModalStyles);
        };
    }, []);


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

                        {terms.map((term, index) => (
                            <S.AgreeBox key={`${term.id}`}>
                                <S.AgreeCheck id={`agree_${term.id}`} onChange={() => handleTermAgreeChange(index)} checked={termAgreeStatus[index] === 1}></S.AgreeCheck>
                                <S.AgreeText htmlFor={`agree_${term.id}`}>
                                    {`(${term.mandatory ? '필수' : '선택'})`}
                                    <S.ContentBtn onClick={() => openModal(index)}>{`${term.title}`}</S.ContentBtn>
                                </S.AgreeText>
                            </S.AgreeBox>
                        ))}

                        <S.NextButton
                            onClick={handleNextClick}
                            disabled={
                                terms
                                    .filter((term, index) => term.mandatory && termAgreeStatus[index] !== 1)
                                    .length > 0
                            }>
                            다음
                        </S.NextButton>
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

                {/* 약관 동의 modal */}
                <div className="modal">
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                    >
                        {modalContent !== null && (
                            <S.ModalBody>
                                <S.ModalHeader>
                                    <S.ModalTitle>{`${terms[modalContent].title}(${terms[modalContent].mandatory ? '필수' : '선택'})`}</S.ModalTitle>
                                    <button className="modal_btn_close" onClick={closeModal}>
                                        <img src={CloseIcon} className="close_icon" />
                                    </button>
                                </S.ModalHeader>
                                <S.ModalContent>
                                    {terms[modalContent].content.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </S.ModalContent>
                                <S.AgreeBtn onClick={closeModal}>확인</S.AgreeBtn>
                            </S.ModalBody>
                        )}
                    </Modal>
                </div>
            </S.SignUpBody>
        </MainComponent >
    );
}

export default SignUpAmuse;