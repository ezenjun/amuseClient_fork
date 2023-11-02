import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InfoForm.scss";
import TextInput from "../LogInPage/TextInput";
import PasswordInput from "../LogInPage/PasswordInput";
import axios from "axios";

interface InfoFormProps {
    onNextStep: () => void;
    imp_uid: string | null;
}


interface UserInfoData {
    name: string;
    phone: string;
    gender: string;
    birth: string;
}

const InfoForm: React.FC<InfoFormProps> = (props) => {
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



    const [UserInfo, setUserInfoData] = useState<UserInfoData>();
    useEffect(() => {
        if (props.imp_uid !== null) {
            axios
                .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/verification/portone?imp_uid=${props.imp_uid}`)
                .then((response) => {
                    console.log(response.data);
                    setUserInfoData(response.data);
                })
                .catch((error) => {
                    console.log("연결 실패");
                });
        }
    }, [props.imp_uid]);

    return (
        <div className="info_body">
            <form action="" method="post" className="info_form">
                <div className="info_note">
                    <span className="color_red">어뮤즈</span>는 고객님의 정보를 안전하게 관리합니다.
                </div>
                <div>
                    <TextInput disable={false} customValidation={emailValidation} onInputChange={handleInputChange} labelText="아이디(이메일계정)" placeText="ex) example123@example.com" inputType="email" width="702px" margin="16px" />
                    <div className="flex_box_sub">
                        <TextInput disable={false} customValidation={nameValidation} onInputChange={handleInputChange} labelText="이름" placeText="이름" inputType="text" width="597px" margin="16px" />
                        <div className="input_gender">
                            <input type="radio" name="gender" id="male" />
                            <label htmlFor="male" className="first_label">남</label>
                            <input type="radio" name="gender" id="female" />
                            <label htmlFor="female" className="last_label">여</label>
                        </div>
                    </div>
                    <TextInput disable={false} customValidation={numValidation} onInputChange={handleInputChange} labelText="생년월일" placeText="ex) 010203" inputType="text" width="702px" margin="16px" />
                    <div className="flex_box_sub">
                        <TextInput disable={false} customValidation={pnumValidation} onInputChange={handleInputChange} labelText="휴대폰번호" placeText="ex) 01012345678" inputType="text" width="702px" margin="16px" />
                        <div className="foreign_box">
                            <input type="checkbox" id="foreign" className="foreign_check" />
                            <label htmlFor="foreign" className="foreign_text">외국인</label>
                        </div>
                    </div>
                </div>
                <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="비밀번호" design="outlined" width="702px" margin='' margin_b='16px' isValid={isValidPassword} errorText="8자 이상, 영문 대/소문자, 숫자, 특수문자 중 두 종류 이상의 조합으로 설정해 주세요" inputSize='small' />
                <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="비밀번호 확인" design="outlined" width="702px" margin='' margin_b='16px' isValid={isValidCheckPassword} errorText="일치하지 않습니다" inputSize='small' />
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

// function useEffect(arg0: () => void, arg1: any[]) {
//     throw new Error("Function not implemented.");
// }
