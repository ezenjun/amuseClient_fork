import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../LogInPage/TextInput";
import PasswordInput from "../LogInPage/PasswordInput";
import axios from "axios";
import { useRecoilState } from "recoil";
import { impUid } from "../../atoms";
import * as S from "./InfoFormStyle";

interface InfoFormProps {
    onNextStep: () => void;
    imp_uid: string | null;
}

const InfoForm: React.FC<InfoFormProps> = (props) => {
    // 유효성 검사
    const emailValidation = (value: string): string => {
        return value.replace(/[^A-Za-z0-9_\.\-]+@[^A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/g, '');
    };

    const nameValidation = (value: string): string => {
        return value.slice(0, 50);
    };

    const numValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 6);
    };

    const pnumValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 11);
    };

    // 비밀번호 입력
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
    const [isValidCheckPassword, setIsValidCheckPassword] = useState<boolean>(true);

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsValidPassword(false);
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
        setIsValidCheckPassword(false)
        if (password === e.target.value) {
            setCheckPassword(e.target.value);
            setIsValidCheckPassword(true)
        } else {
            setCheckPassword(e.target.value)
            setIsValidCheckPassword(false)
        }
    };

    const handleInputChange = (value: string) => {
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
                    setName(userInfo.name);
                    setBirth(userInfo.birth);
                    setPhone(userInfo.phone);
                })
                .catch((error) => {
                    console.log("정보 없음");
                });
        }
    }, [impUidData]);

    return (
        <div className="info_body">
            <form action="" method="post" className="info_form">
                <div>
                    <S.InputTitle>아이디</S.InputTitle>
                    <TextInput disable={false} customValidation={nameValidation} onInputChange={handleInputChange} labelText="아이디" placeText="아이디" inputType="text" width="702px" margin="16px" />
                    <S.InputTitle>비밀번호</S.InputTitle>
                    <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="비밀번호" design="outlined" width="702px" margin='' margin_b='16px' isValid={isValidPassword} errorText="8자 이상, 영문 대/소문자, 숫자, 특수문자 중 두 종류 이상의 조합으로 설정해 주세요" inputSize='small' />
                    <S.InputTitle>비밀번호 재확인</S.InputTitle>
                    <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="비밀번호 재확인" design="outlined" width="702px" margin='' margin_b='16px' isValid={isValidCheckPassword} errorText="일치하지 않습니다" inputSize='small' />
                    <S.FlexBox>
                        <div>
                            <S.InputTitle>이름</S.InputTitle>
                            <TextInput disable={name !== ""} customValidation={nameValidation} onInputChange={handleInputChange} labelText="이름" placeText="이름" value={name} inputType="text" width="597px" margin="16px" />
                        </div>
                        <div>
                            <S.InputTitle>성별</S.InputTitle>
                            <S.RadioButtonContainer>
                                <div className="input_gender">
                                    <input type="radio" name="gender" id="male" />
                                    <label htmlFor="male" className="first_label">남</label>
                                    <input type="radio" name="gender" id="female" />
                                    <label htmlFor="female" className="last_label">여</label>
                                </div>
                            </S.RadioButtonContainer>
                        </div>
                    </S.FlexBox>

                    <S.InputTitle>생년월일</S.InputTitle>
                    <TextInput disable={birth !== ""} customValidation={numValidation} onInputChange={handleInputChange} labelText="생년월일" placeText="ex) 010203" value={birth} inputType="text" width="702px" margin="16px" />
                    <S.InputTitle>본인 확인 이메일</S.InputTitle>
                    <TextInput disable={false} customValidation={emailValidation} onInputChange={handleInputChange} labelText="본인확인 이메일" placeText="ex) example@example.com" inputType="email" width="702px" margin="16px" />
                    <S.InputTitle>전화번호</S.InputTitle>
                    <div className="">
                        <TextInput disable={phone !== ""} customValidation={pnumValidation} onInputChange={handleInputChange} labelText="휴대폰번호" placeText="ex) 01012345678" value={phone} inputType="text" width="702px" margin="16px" />
                    </div>
                </div>
            </form >
            <button className="login_btn" onClick={() => {
                props.onNextStep();
            }} disabled={false}>
                <i className="fa-solid fa-door-open"></i>다음
            </button>
        </div >
    );
}

export default InfoForm;