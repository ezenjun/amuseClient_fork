import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../LogInPage/TextInput";
import PasswordInput from "../LogInPage/PasswordInput";
import axios from "axios";
import { useRecoilState } from "recoil";
import { impUid } from "../../atoms";
import Modal from "react-modal";
import * as S from "./InfoFormStyle";
import * as M from "./SignUpAmuseStyle";


interface InfoFormProps {
    onNextStep: (name: string) => void;
}

const InfoForm: React.FC<InfoFormProps> = (props) => {
    const movePage = useNavigate();

    // 유효성 검사
    const nameValidation = (value: string): string => {
        return value.slice(0, 50);
    };

    const numValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 6);
    };

    const pnumValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 11);
    };

    // 비밀번호 확인
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const [isValidCheckPassword, setIsValidCheckPassword] = useState<boolean>(false);

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
                    const birthWithoutHyphens = userInfo.birth.replace(/-/g, '')
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
    useEffect(() => {
        if (impUidData) {
            axios
                .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/check/duplicate?name=${name}&birthday=${birth}&phonenumber=${phone}`)
                .then((response) => {
                    if (response.data.data === "이미 가입된 사용자입니다.") {
                        openModal();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [name, birth, phone])

    // 약관 동의 Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        movePage("/Login");
    };

    // 아이디 중복 확인
    const [id, setId] = useState<string>("");
    const [isValidId, setIsValidId] = useState<boolean>(false);
    const [checkId, setCheckId] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("아이디를 입력해주세요");
    const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkInput = nameValidation(e.target.value);
        setId(checkInput);
        if (checkInput === "") {
            setIsValidId(false);
            setErrorText("아이디를 입력해주세요");
        }
    };

    const handleDuplicateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (id !== "") {
            axios.get(`${process.env.REACT_APP_AMUSE_API}/api/v1/auth/user/id/duplicate/check?id=${id}`)
                .then((response) => {
                    const result = response.data.data;
                    if (result === "duplicate") {
                        setErrorText("중복된 아이디입니다.");
                        setIsValidId(false);
                        setCheckId(false);
                        setId("");
                    } else {
                        console.log("사용 가능한 ID입니다.");
                        setIsValidId(true);
                        setCheckId(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setIsValidId(false);
            setErrorText("아이디를 입력해주세요");
        }
    };

    // 이메일 확인
    const [email, setEmail] = useState<string>("");
    const [checkEmail, setCheckEmail] = useState<boolean>(false);
    const emailValidation = (value: string): boolean => {
        const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/;
        return emailRegex.test(value);
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const validatedEmail = emailValidation(inputValue);
        setEmail(inputValue);
        if (validatedEmail) {
            setCheckEmail(true);
        } else {
            setCheckEmail(false);
        }
    };

    // 성별 확인
    const [gender, setGender] = useState("");
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    // 다음 버튼 활성화
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    useEffect(() => {
        const isFieldsValid = impUid && checkId && password && checkPassword !== "" && isValidCheckPassword && name && birth && phone && checkEmail && gender !== "";
        setIsNextButtonDisabled(!isFieldsValid);
    }, [impUid, checkId, password, checkPassword, isValidCheckPassword, name, birth, phone, checkEmail, gender]);

    // 회원 가입 정보 POST
    const handleClickBtn = () => {
        const requestBody = {
            "id": id,
            "email": email,
            "password": password,
            "name": name,
            "gender": gender,
            "birthday": birth,
            "phoneNumber": phone,
        };
        const apiEndpoint = `${process.env.REACT_APP_AMUSE_API}/api/v1/auth/user/signup`;

        axios.post(apiEndpoint, requestBody)
            .then((response) => {
                console.log('가입 성공');
                props.onNextStep(name);
            })
            .catch((error) => {
                console.error('API 요청 실패:', error);
            })
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    };


    return (
        <div className="info_body" style={{width: '754px'}}>
            <form action="" method="post" className="info_form">
                <div>
                    <S.InputTitle>아이디</S.InputTitle>
                    <S.FlexBox>
                        <TextInput disable={false} value={id} onInputChange={handleChangeId} labelText="" placeText="아이디" inputType="text" isValid={isValidId} errorText={errorText} width="560px" margin="16px" />
                        <S.InnBtn onClick={handleDuplicateClick}>중복 확인</S.InnBtn>
                    </S.FlexBox>
                    <S.InputTitle>비밀번호</S.InputTitle>
                    <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="" placeText="비밀번호" design="outlined" width="754px" margin='' margin_b='16px' isValid={isValidPassword} errorText="비밀번호는 8~16자의 영문, 숫자, 특수문자 중 두 종류 이상의 조합으로 입력해주세요" inputSize='small' />
                    <S.InputTitle>비밀번호 재확인</S.InputTitle>
                    <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="" placeText="비밀번호 재확인" design="outlined" width="754px" margin='' margin_b='16px' isValid={isValidCheckPassword} errorText="비밀번호가 일치하지 않습니다" inputSize='small' />
                    <S.FlexBox>
                        <div>
                            <S.InputTitle>이름</S.InputTitle>
                            <TextInput disable={true} onInputChange={handleInputChange} labelText="" placeText="이름" value={name} inputType="text" width="561px" margin="16px" />
                        </div>
                        <div>
                            <S.InputTitle>성별</S.InputTitle>
                            <S.RadioButtonContainer>
                                <div className="input_gender">
                                    <input type="radio" name="gender" id="MAN" value="MAN" checked={gender === "MAN"} onChange={handleGenderChange} />
                                    <label htmlFor="MAN" className="first_label">남</label>
                                    <input type="radio" name="gender" id="WOMAN" value="WOMAN" checked={gender === "WOMAN"} onChange={handleGenderChange} />
                                    <label htmlFor="WOMAN" className="last_label">여</label>
                                </div>
                            </S.RadioButtonContainer>
                        </div>
                    </S.FlexBox>

                    <S.InputTitle>생년월일</S.InputTitle>
                    <TextInput disable={true} onInputChange={handleInputChange} labelText="" placeText="생년월일" value={birth} inputType="text" width="754px" margin="16px" />
                    <S.InputTitle>본인 확인 이메일</S.InputTitle>
                    <TextInput disable={false} value={email} onInputChange={handleChangeEmail} labelText="" placeText="ex) example@example.com" inputType="email" isValid={checkEmail} errorText="이메일을 입력해주세요" width="754px" margin="16px" />
                    <S.InputTitle>전화번호</S.InputTitle>
                    <div className="">
                        <TextInput disable={true} onInputChange={handleInputChange} labelText="" placeText="ex) 01012345678" value={phone} inputType="text" width="754px" margin="16px" />
                    </div>
                </div>
            </form >
            <S.NextButton onClick={handleClickBtn} disabled={isNextButtonDisabled}>
                가입하기
            </S.NextButton>


            {/* 가입된 경우 모달 창 */}
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
                                <M.ModalTitle>이미 가입된 로그인 정보가 존재합니다.</M.ModalTitle>
                            </M.ModalHeader>
                            <div className="agree_btn_box">
                                <M.AgreeBtn onClick={closeModal}>확인</M.AgreeBtn>
                            </div>
                        </div>
                    </Modal>
                </div>
        </div >
    );
}

export default InfoForm;