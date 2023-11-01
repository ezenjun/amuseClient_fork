import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CertificationForm.scss";
import TextInput from "./TextInput";
import InputCheckIcon from "./Icons/input_check_icon.png";
import SingleSignOn from "./SingleSignOn";

interface VerificationFormProps {
    option: string;
    selectedOption: string;
    showPwForm: boolean;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    checkAuthCode: boolean; // checkAuthCode를 props로 추가
    setCheckAuthCode: React.Dispatch<React.SetStateAction<boolean>>;

}

function VerificationForm(props: VerificationFormProps) {
    const { option, selectedOption, showPwForm, setSelectedOption } = props;

    const nameValidation = (value: string): string => {
        return value.slice(0, 50);
    };

    const birthValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 8);
    };

    const emailValidation = (value: string): string => {
        return value.replace(/[^A-Za-z0-9_\.\-]+@[^A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/g, '');
    };

    const pnumValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 11);
    };

    const codeValidation = (value: string): string => {
        return value.replace(/[^0-9]/g, '').slice(0, 6);
    };



    const [isNameInputValid, setIsNameInputValid] = useState(false);
    const [isNameDisabled, setIsNameDisabled] = useState(false);
    const [isBirthInputValid, setIsBirthInputValid] = useState(false);
    const [isAuthInputValid, setIsAuthInputValid] = useState(true);
    const [isAuthButtonValid, setIsAuthButtonValid] = useState(true);
    const [isRetryButtonClicked, setIsRetryButtonClicked] = useState(false);
    const [isNumberInputDisabled, setIsNumberInputDisabled] = useState(false);
    const [authButtonText, setAuthButtonText] = useState('인증번호 요청');
    const [enteredAuthCode, setEnteredAuthCode] = useState('');
    // const [checkAuthCode, setCheckAuthCode] = useState(false);

    // 본인인증 API
    const [verificationData, setVerificationData] = useState('');
    const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState('');

    const handleAuthRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (selectedOption && selectedOption === option) {
            const field = option === 'sms' ? 'phoneNumber' : 'email';
            const requestBody = {
                [field]: phoneNumberOrEmail
            };

            const apiEndpoint = option === 'sms' ? `${process.env.REACT_APP_AMUSE_API}/api/v1/user/verification/sms` : `${process.env.REACT_APP_AMUSE_API}/api/v1/user/verification/email`;

            if (isRetryButtonClicked) {
                alert('인증번호가 전송되었습니다.');
                setIsNumberInputDisabled(true);
                axios.post(apiEndpoint, requestBody)
                    .then((response) => {
                        const code = response.data.data;
                        setVerificationData(code);
                    })
                    .catch((error) => {
                        console.error('API 요청 실패:', error);
                    });
            } else {
                alert('인증번호가 전송되었습니다.');
                setAuthButtonText('재요청');
                setIsNumberInputDisabled(true);
                axios.post(apiEndpoint, requestBody)
                    .then((response) => {
                        const code = response.data.data;
                        setVerificationData(code);
                        setIsRetryButtonClicked(true);
                    })
                    .catch((error) => {
                        console.error('API 요청 실패:', error);
                    })
                    .finally(() => {
                        setIsAuthInputValid(false);
                    });
            }
        }
    };

    const handleInputOptionBoxChange = (value: string) => {
        setPhoneNumberOrEmail(value);
    };


    const handleNameInputChange = (value: string) => {
        setIsNameInputValid(value.length > 0);
    };

    const handleNameBlur = () => {
        // 포커스가 떠날 때 실행될 함수
        // if (isNameInputValid) {
        //     setIsNameDisabled(true);
        // }
    };

    const handleBirstInputChange = (value: string) => {
        setIsBirthInputValid(value.length === 8);
    };

    const handleAuthInputChange = (value: string) => {
        setEnteredAuthCode(value);
        setIsAuthButtonValid(!(value.length === 6));
    };


    const handleInputChange = (value: string) => {
    };


    const handleAuthButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (verificationData === enteredAuthCode) {
            alert('인증되었습니다!');
            props.setCheckAuthCode(true);
        } else {
            alert('인증에 실패했습니다. 다시 시도해주세요.');
            props.setCheckAuthCode(false);
        }
    };

    const [inputGender, setInputGender] = useState('');

    useEffect(() => {
        setInputGender('');
        console.log(selectedOption);
    }, [selectedOption]);

    const handleSexBoxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setInputGender(event.target.id);
            console.log(event.target.id);
        }
    };


    return (
        <div></div>
        // <div className={`inn_box ${option}_box_sub ${selectedOption === option ? "show" : "hide"}`}>
        //     {showPwForm && (
        //         <TextInput disable={false} customValidation={emailValidation} onInputChange={handleInputChange} labelText="아이디(이메일계정)" placeText="ex) example123@example.com" inputType="email" width="702px" margin="16px" />
        //         // <input type="text" className="input_text" placeholder="아이디(이메일계정)" />
        //     )}
        //     <div className="flex_box_sub">
        //         <TextInput disable={isNameDisabled} onBlur={handleNameBlur} customValidation={nameValidation} onInputChange={handleNameInputChange} labelText="이름" placeText="이름" inputType="text" width="597px" margin="16px" />
        //         {/* <input type="text" className="input_text input_name" placeholder="이름" /> */}
        //         {isNameInputValid && <img src={InputCheckIcon} alt="" className="input_check" />}
        //         <div className={`input_gender ${option === 'sms' ? 'sms_style_box':'email_style_box'} `}>
        //             <input type="radio" name="gender" id="male" checked={inputGender === 'male'} onChange={handleSexBoxClick} />
        //             <label htmlFor="male" className="first_label" >남</label>
        //             <input type="radio" name="gender" id="female" checked={inputGender === 'female'} onChange={handleSexBoxClick} />
        //             <label htmlFor="female" className="last_label" >여</label>
        //         </div>
        //     </div>
        //     <div className="birth_box">
        //         <TextInput disable={false} customValidation={birthValidation} onInputChange={handleBirstInputChange} labelText="생년월일" placeText="ex) 20230505" inputType="text" width="702px" margin="16px" />
        //         {/* <input type="text" className="input_text" placeholder="생년월일" maxLength={6} /> */}
        //         <button className="inn_btn name_request_btn">실명인증 요청</button>
        //     </div>
        //     <div className={`${option}_box`}>
        //         <TextInput disable={!isNameInputValid && !isBirthInputValid || isNumberInputDisabled} customValidation={option === "email" ? emailValidation : pnumValidation} onInputChange={handleInputOptionBoxChange} labelText={option === "email" ? "이메일" : "전화번호"} placeText={option === "email" ? "ex) example123@example.com" : "ex) 01012345678"} inputType={option === "email" ? "email" : "text"} width="702px" margin="16px" />
        //         {/* <input type="text" className="input_text" placeholder={option === "email" ? "이메일" : "전화번호"} /> */}
        //         <button className={`inn_btn auth_request_btn ${authButtonText === '재요청' ? `retry_btn` : ``}`} onClick={handleAuthRequest} disabled={!isNameInputValid && !isBirthInputValid}>{authButtonText}</button>
        //         {isNumberInputDisabled && <img src={InputCheckIcon} alt="" className="input_check" />}
        //     </div>
        //     <div className="auth_box">
        //         <TextInput disable={isAuthInputValid} customValidation={codeValidation} onInputChange={handleAuthInputChange} labelText="인증번호" placeText="6자리" inputType="text" width="702px" margin="16px" />
        //         {/* <input type="text" className="input_text" placeholder="인증번호" maxLength={6} /> */}
        //         <button className="inn_btn auth_btn" onClick={handleAuthButtonClick} disabled={isAuthButtonValid}>인증하기</button>
        //     </div>
        // </div>
    );
}

interface CertificationFormProps {
    onFindPasswordClick: () => void;
    showPwForm: boolean;
    showFindBtn: boolean;
    onNextStep: (impUid: string | null) => void;
    titleText: string;
}

const CertificationForm: React.FC<CertificationFormProps> = (props) => {
    const movePage = useNavigate();
    const [selectedOption, setSelectedOption] = useState("sms");
    const { showPwForm, titleText } = props;

    const [checkAuthCode, setCheckAuthCode] = useState<boolean>(false);




    // const handleCertificationRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     // '인증 요청' 버튼 클릭 시 SingleSignOn 함수 호출
    //     event.preventDefault();
    //     console.log("성공");
    //     SingleSignOn();
    // };

    const [impUidData, setImpUid] = useState<string | null>(null);

    const handleButtonClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log("성공////////////////////////");
        try {
            const impUid = await SingleSignOn();
            setImpUid(impUid);
        } catch (error) {
            console.error(error);
        }
        setCheckAuthCode(true);
    };

    return (
        <div className="find_body">
            <form action="" method="post" className="find_form">
                {/* <fieldset> */}
                <div className="single_sign_box">
                    <button className="single_sign_btn" onClick={handleButtonClick}>통합인증 요청</button>
                </div>
                {/* 문자 인증 */}
                <div className="sms_box">
                    <div className="find_title_box">
                        <input type="radio" id="sms_box_btn" checked={selectedOption === "sms"} onChange={() => setSelectedOption("sms")} />
                        <label htmlFor="sms_box_btn" className="find_title">문자로 {titleText}</label>
                    </div>
                    <VerificationForm option="sms" selectedOption={selectedOption} setSelectedOption={setSelectedOption} showPwForm={showPwForm} checkAuthCode={checkAuthCode} setCheckAuthCode={setCheckAuthCode} />
                </div>
                {/* 이메일 인증 */}
                <div className="email_box">
                    <div className="find_title_box">
                        <input type="radio" id="email_box_btn" checked={selectedOption === "email"} onChange={() => setSelectedOption("email")} />
                        <label htmlFor="email_box_btn" className="find_title">이메일로 {titleText}</label>
                    </div>
                    <VerificationForm option="email" selectedOption={selectedOption} setSelectedOption={setSelectedOption} showPwForm={showPwForm} checkAuthCode={checkAuthCode} setCheckAuthCode={setCheckAuthCode} />
                </div>
                {/* 휴대폰 인증 */}
                {/* <div className="phone_box">
                    <div className="find_title_box">
                        <input type="radio" id="phone_box_btn" checked={selectedOption === "phone"} onChange={() => setSelectedOption("phone")} />
                        <label htmlFor="phone_box_btn" className="find_title">휴대폰 본인인증으로 찾기</label>
                    </div>
                    <div className={`phone_box_sub ${selectedOption === "phone" ? "show" : "hide"}`}>
                        <div>안내사항</div>
                        <div>본인 명의 휴대폰 본인인증 시 제공되는 정보는 본인인증기관에서 직접 수집하며, 인증 이외의 용도로 이용하거나 저장하지 않습니다.</div>
                    </div>
                </div> */}
                {/* 찾기 버튼 */}
                {props.showFindBtn && (
                    <div className="login_btn_box">
                        <button className="login_btn" onClick={(event) => {
                            event.preventDefault();
                            props.onFindPasswordClick();
                        }}>
                            <i className="fa-solid fa-door-open"></i>
                            {showPwForm ? '비밀번호 찾기' : '아이디 찾기'}
                        </button>
                    </div>
                )}

                {/* 회원가입 다음 버튼 */}
                {!props.showFindBtn && (
                    <button className="login_btn" onClick={() => {
                        props.onNextStep(impUidData);
                    }} disabled={!checkAuthCode}>
                        <i className="fa-solid fa-door-open"></i>다음
                    </button>
                )}
                {/* </fieldset> */}
            </form>

        </div>
    );
}

export default CertificationForm;