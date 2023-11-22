import React, { useState, useEffect } from "react";
import TextInput from "../LogInPage/TextInput";
import PasswordInput from "../LogInPage/PasswordInput";
import axios from "axios";
import { useRecoilState } from "recoil";
import { impUid } from "../../atoms";
import * as S from "./InfoFormStyle";
import { useCookies } from "react-cookie";
import TextField, { TextFieldPropsSizeOverrides, TextFieldVariants } from '@mui/material/TextField';
import { OverridableStringUnion } from '@mui/types';

interface InfoFormProps {
    onNextStep: (name: string) => void;
}

const InfoForm: React.FC<InfoFormProps> = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "terms",
    ]);

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
                postTerms(response.data.data.accessToken);
                props.onNextStep(name);
            })
            .catch((error) => {
                console.error('API 요청 실패:', error);
            })

    };

    // 약관 동의 정보 post
    const postTerms = (token: string) => {
        const newAgreedArray = cookies.terms.map((value: number, index: number) => ({
            number: index + 1,
            agreed: value === 1,
        }));

        const requestBody = {
            "type": "SignUp",
            "content": newAgreedArray,
        };

        const apiEndpoint = `${process.env.REACT_APP_AMUSE_API}/api/v1/user/terms_of_service`;
        axios
            .post(apiEndpoint, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                removeCookie("terms");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    };


    // 반응형 TextInput
    interface TextInputStyles {
        width: string;
        size: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
        margin: string;
    }
    
    const [textInputStyles, setTextInputStyles] = useState<TextInputStyles>({
        width: "75%", size: "medium", margin: "16px" 
    });

    const updateTextInputStyles = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            setTextInputStyles({width: "100%", size: "small", margin: "2px"});
        } else if (screenWidth <= 1023) {
            setTextInputStyles({width: "75%", size: "medium", margin: "16px"});
        } else {
            setTextInputStyles({width: "75%", size: "medium", margin: "16px"});
        }
    };

    useEffect(() => {
        updateTextInputStyles();
        window.addEventListener('resize', updateTextInputStyles);
        return () => {
            window.removeEventListener('resize', updateTextInputStyles);
        };
    }, []);


    return (
        <S.InfoBody>
            <form action="" method="post" className="info_form">
                <div>
                    <S.InputTitle>아이디</S.InputTitle>
                    <S.FlexBox>
                        <TextInput disable={false} value={id} onInputChange={handleChangeId} labelText="" placeText="아이디" inputType="text" isValid={isValidId} errorText={errorText} inputId={true} width={textInputStyles.width} margin={textInputStyles.margin} size={textInputStyles.size} />
                        <S.InnBtn onClick={handleDuplicateClick}>중복 체크</S.InnBtn>
                    </S.FlexBox>
                    <S.InputTitle>비밀번호</S.InputTitle>
                    <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="" placeText="비밀번호" design="outlined" width="100%" margin='' margin_b={textInputStyles.margin} inputSize={textInputStyles.size} isValid={isValidPassword} errorText="비밀번호는 8~16자의 영문, 숫자, 특수문자 중 두 종류 이상의 조합으로 입력해주세요" />
                    <S.InputTitle>비밀번호 재확인</S.InputTitle>
                    <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="" placeText="비밀번호 재확인" design="outlined" width="100%" margin='' margin_b={textInputStyles.margin} inputSize={textInputStyles.size} isValid={isValidCheckPassword} errorText="비밀번호가 일치하지 않습니다" />
                    <S.FlexBox>
                        <div style={{width: textInputStyles.width}}>
                            <S.InputTitle>이름</S.InputTitle>
                            <TextInput disable={true} onInputChange={handleInputChange} labelText="" placeText="이름" value={name} inputType="text" width="100%" margin={textInputStyles.margin} size={textInputStyles.size} />
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
                            {gender === "" && <span style={{ color: '#E6003D', fontSize: '12px' }}>성별을 선택해주세요.</span>}
                        </div>
                    </S.FlexBox>

                    <S.InputTitle>생년월일</S.InputTitle>
                    <TextInput disable={true} onInputChange={handleInputChange} labelText="" placeText="생년월일" value={birth} inputType="text" width="100%" margin={textInputStyles.margin} size={textInputStyles.size}/>
                    <S.InputTitle>본인 확인 이메일</S.InputTitle>
                    <TextInput disable={false} value={email} onInputChange={handleChangeEmail} labelText="" placeText="ex) example@example.com" inputType="email" isValid={checkEmail} errorText="이메일을 입력해주세요" width="100%" margin={textInputStyles.margin} size={textInputStyles.size} />
                    <S.InputTitle>전화번호</S.InputTitle>
                    <div className="">
                        <TextInput disable={true} onInputChange={handleInputChange} labelText="" placeText="ex) 01012345678" value={phone} inputType="text" width="100%" margin={textInputStyles.margin} size={textInputStyles.size} />
                    </div>
                </div>
            </form >
            <S.NextButton onClick={handleClickBtn} disabled={isNextButtonDisabled}>
                가입하기
            </S.NextButton>
        </S.InfoBody>
    );
}

export default InfoForm;