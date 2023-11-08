import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import MainComponent from "../../MainComponent";
import PasswordInput from "./PasswordInput";
import Certification from "./Certification";
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import * as S from "./FindStyle";
import * as M from "./CertificationStyle";

interface FindPwProps { }

const FindPw: React.FC<FindPwProps> = (props) => {
    const movePage = useNavigate();
    const [isShow, setIsShow] = useRecoilState(isVisible);

    // 비밀번호 유효성 검사
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const [isValidCheckPassword, setIsValidCheckPassword] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("비밀번호를 입력해주세요");

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        const isValid1 = /^(?=(?:[^A-Za-z]*[A-Za-z]){1,})(?=(?:\D*\d){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);
        const isValid2 = /^(?=(?:[^A-Za-z]*[A-Za-z]){1,})(?=(?:[^\W_]*[\W_]){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);
        const isValid3 = /^(?=(?:\D*\d){1,})(?=(?:[^\W_]*[\W_]){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);
        const isValid4 = /^(?=(?:[^A-Za-z]*[A-Za-z]){1,})(?=(?:\D*\d){1,})(?=(?:[^\W_]*[\W_]){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);

        if (isValid1 || isValid2 || isValid3 || isValid4) {
            setPassword(newPassword);
            setIsValidPassword(true);
        } else {
            setPassword(newPassword);
            setIsValidPassword(false);
            setErrorText("8자 이상, 영문 대/소문자, 숫자, 특수문자 중 두 종류 이상의 조합으로 설정해 주세요");
        }
    };

    const handleChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (password === e.target.value) {
            setCheckPassword(e.target.value);
            setIsValidCheckPassword(true)
        } else {
            setCheckPassword(e.target.value)
            setIsValidCheckPassword(false)
        }
    };

    // 변경 버튼 활성화
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    useEffect(() => {
        const isFieldsValid = isValidPassword && isValidCheckPassword;
        setIsNextButtonDisabled(!isFieldsValid);
    }, [isValidPassword, isValidCheckPassword]);

    // 변경 완료 모달 창
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        movePage("/LogIn");
    };

    // 변경 버튼 클릭 시 실행
    const handleClick = () => {
        // 비번변경 post 하기
        openModal();
    }

    return (
        <MainComponent>
            <S.FindBody>
                {isShow && <Certification></Certification>}
                {!isShow && (
                    <div>
                        <S.FindTitle>비밀번호 재설정</S.FindTitle>
                        <div>
                            <S.InputTitle>새 비밀번호</S.InputTitle>
                            <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="" placeText="새 비밀번호" design="outlined" width="754px" margin='0' margin_b='30px' isValid={isValidPassword} errorText={errorText} inputSize='medium' />
                            <S.InputTitle>새 비밀번호 확인</S.InputTitle>
                            <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="" placeText="새 비밀번호 확인" design="outlined" width="754px" margin='0' margin_b='30px' isValid={isValidCheckPassword} errorText="비밀번호가 일치하지 않습니다" inputSize='medium' />
                        </div>
                        <S.NoteBox>
                            <S.NoteTitle>ℹ️ 유의사항</S.NoteTitle>
                            <S.NoteContent>
                                • 비밀번호 설정 시 총 8자~20자로 설정해주세요.<br />
                                • 영문 대/소문자, 숫자, 특수문자 등 두 종류 이상의 문자를 조합해 구성되어야 합니다.
                            </S.NoteContent>
                        </S.NoteBox>
                        <S.ContinueButton onClick={handleClick} disabled={isNextButtonDisabled}>변경하기</S.ContinueButton>
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
                            <M.ModalContent>새로운 비밀번호로 변경이<br />완료되었습니다.</M.ModalContent>
                            <M.ModalBtn onClick={closeModal}>확인</M.ModalBtn>
                        </div>
                    </Modal>
                </div>
            </S.FindBody>
        </MainComponent>
    );
}

export default FindPw;