import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import MainComponent from "../../MainComponent";
import PasswordInput from "./PasswordInput";
import Certification from "./Certification";
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import axios from "axios";
import * as S from "./FindStyle";
import * as M from "../SignUpPage/SignUpAmuseStyle";
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField';
import { OverridableStringUnion } from '@mui/types';

const FindPw: React.FC = () => {
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

    // 변경 완료 Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        movePage("/LogIn");
    };

    // 인증된 정보 가져오기
    const [impUidData, setImpUid] = useRecoilState(impUid);
    const [birth, setBirth] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    useEffect(() => {
        if (impUidData !== null) {
            axios
                .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/verification/portone?imp_uid=${impUidData}`)
                .then((response) => {
                    let userInfo = response.data.data;
                    const birthWithoutHyphens = userInfo.birth.replace(/-/g, '');
                    setName(userInfo.name);
                    setBirth(birthWithoutHyphens);
                    setPhone(userInfo.phone);
                })
                .catch((error) => {
                    console.log("정보 없음");
                });
        }
    }, [impUidData]);

    // 가입 여부 확인 api
    // useEffect(() => {
    //     if (impUidData) {
    //         axios
    //             .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/check/duplicate?name=${name}&birthday=${birth}&phonenumber=${phone}`)
    //             .then((response) => {
    //                 if (!response.data.data) {
    //                     movePage('/');
    //                     alert("계정이 없습니다 회원가입을 진행해 주세요.");
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error.message);
    //             })
    //     }
    // }, [name, birth, phone])

    // 비번 변경 POST
    const handleClick = () => {
        const requestBody = {
            "userName": name,
            "birthday": birth,
            "phoneNumber": phone,
            "password_for_change": password,
        };
        const apiEndpoint = `${process.env.REACT_APP_AMUSE_API}/api/v1/auth/user/password/change`;

        axios.post(apiEndpoint, requestBody)
            .then((response) => {
                openModal();
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // 반응형 TextInput, Modal
    interface TextInputStyles {
        size: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
        margin: string;
    }
    
    const [textInputStyles, setTextInputStyles] = useState<TextInputStyles>({
        size: "medium", margin: "16px" 
    });

    const [modalStyles, setModalStyles] = useState({
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
    });

    const updateStyles = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            setTextInputStyles({size: "small", margin: "20px"});
            setModalStyles(prevStyles => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    width: "90%",
                    height: "212px",
                    padding: "24px 22px",
                },
            }));
        } else if (screenWidth <= 1023) {
            setTextInputStyles({size: "medium", margin: "30px"});
            setModalStyles(prevStyles => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    width: "522px",
                    height: "250px",
                    padding: "25px 30px",
                },
            }));
        } else {
            setTextInputStyles({size: "medium", margin: "30px"});
            setModalStyles(prevStyles => ({
                ...prevStyles,
                content: {
                    ...prevStyles.content,
                    width: "754px",
                    height: "389px",
                    padding: "40px 43px",
                },
            }));
        }
    };

    useEffect(() => {
        updateStyles();
        window.addEventListener('resize', updateStyles);
        return () => {
            window.removeEventListener('resize', updateStyles);
        };
    }, []);


    return (
        <MainComponent>
            <S.FindBody>
                {isShow && <Certification onCalledBy="Find"></Certification>}
                {!isShow && (
                    <div>
                        <S.FindTitle>비밀번호 재설정</S.FindTitle>
                        <div>
                            <S.InputTitle>새 비밀번호</S.InputTitle>
                            <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="" placeText="새 비밀번호" design="outlined" width="100%" margin='0' margin_b={textInputStyles.margin} inputSize={textInputStyles.size} isValid={isValidPassword} errorText={errorText} />
                            <S.InputTitle>새 비밀번호 확인</S.InputTitle>
                            <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="" placeText="새 비밀번호 확인" design="outlined" width="100%" margin='0' margin_b={textInputStyles.margin} inputSize={textInputStyles.size} isValid={isValidCheckPassword} errorText="비밀번호가 일치하지 않습니다" />
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

                {/* 비번 변경 Modal */}
                <div className="modal">
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                    >
                        <div className="agree_modal">
                            <M.ModalHeader>
                                <M.ModalTitle>새로운 비밀번호로 변경이 완료되었습니다.</M.ModalTitle>
                            </M.ModalHeader>
                            <div className="agree_btn_box">
                                <M.AgreeBtn onClick={closeModal}>확인</M.AgreeBtn>
                            </div>
                        </div>
                    </Modal>
                </div>
            </S.FindBody>
        </MainComponent>
    );
}

export default FindPw;