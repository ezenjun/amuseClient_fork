import React, { useState, useEffect, ChangeEvent } from "react";
import styled from 'styled-components';
import axios from "axios";
import _ from "lodash";
// import logoimage from "../MainPage/MainImgs/logo.png";
import logoimage from "../../assets/Images/amuse_logo.png";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../atoms";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useNavigate } from "react-router";

import checkIcon from './Icons/check_icon.png';
import checkedIcon from './Icons/checked_icon.png';


const LoginAgree: React.FC = () => {
    const movePage = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([
        "__jwtk__",
        "__igjwtk__",
        "__jwtkid__",
        "__usrN__",
        "accessToken",
    ]);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [privacy, setPrivacy] = useState(false)
    const [marketingAgree, setMarketingAgree] = useState(false)
    const [isShow, setIsShow] = useState(false)


    useEffect(() => {
        let locationString = window.location.toString();
        if (locationString.includes("http://localhost:3000/LoginAgree?access-token")) {
            let token: string | null = new URL(window.location.href).searchParams.get(
                "access-token"
            );
            if (token === null) {
                return;
            } else {
                const expires = moment().add("8", "h").toDate();
                setCookie("__jwtkid__", token, { expires });
                setLoggedIn(true);
                getUserInfoAsToken();
            }
        } else if (locationString.includes("amusetravel.wheelgo.net/")) {
            let token: string | null = cookies.__jwtk__;
            let igToken: string | null = cookies.__igjwtk__;
            if (!token && token !== "undefined") {
                return;
            } else if (igToken && igToken?.length > 0 && token === igToken) {
                return;
            } else {
                const expires = moment().add("8", "h").toDate();
                setCookie("__jwtkid__", token, { expires });
                setLoggedIn(true);
                getUserInfoAsToken();
            }
        }
    }, [cookies.__jwtkid__]);


    const getUserInfoAsToken = async () => {
        axios
            .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/info`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${cookies.__jwtkid__}`,
                },
            })
            .then((response) => {
                let userData = response.data.data
                setCookie("__usrN__", response.data.data?.name);
                if (userData?.personalInformationAgreement === true) {
                    movePage("/");
                } else {
                    setIsShow(true);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };


    const submitAgree = async () => {
        const token = cookies["__jwtkid__"]
        const requestBody = {
            advertisement_true: marketingInfoAgreed,
            personalInformationAgreement: personalInfoAgreed,
        };
        console.log(requestBody, {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        })
        axios.post(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/login/info`, requestBody, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
        }).then((response) => {
            movePage("/");
        }).catch((err) => {
            console.log(err);
        })
    }

    // const handleLogout = () => {
    //     setLoggedIn(false)
    //     let token = cookies.__jwtkid__
    //     const expires = moment().add("1", "m").toDate();
    //     setCookie("__igjwtk__", token, { expires });
    //     removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
    //     movePage("/");
    // };

    // useEffect(() => {
    //     getUserInfoAsToken()
    // }, [])



    const [allAgreed, setAllAgreed] = useState<boolean>(false);
    const [personalInfoAgreed, setPersonalInfoAgreed] = useState<boolean>(false);
    const [marketingInfoAgreed, setMarketingInfoAgreed] = useState<boolean>(false);
    const [ageInfoAgreed, setAgeInfoAgreed] = useState<boolean>(false);


    const handleAllAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setAllAgreed(isChecked);
        setPersonalInfoAgreed(isChecked);
        setMarketingInfoAgreed(isChecked);
        setAgeInfoAgreed(isChecked);
    };

    const handlePersonalInfoAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setPersonalInfoAgreed(isChecked);
        setAllAgreed(isChecked && marketingInfoAgreed && ageInfoAgreed);
    };

    const handleMarketingInfoAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setMarketingInfoAgreed(isChecked);
        setAllAgreed(isChecked && personalInfoAgreed && ageInfoAgreed);
    };

    const handleAgeInfoAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setAgeInfoAgreed(isChecked);
        setAllAgreed(isChecked && personalInfoAgreed && marketingInfoAgreed);
    };

    if (!isShow) {
        return (<></>)
    } else {
        return (
            <LoginAgreeBody>
                <LoginAgreeTitle>약관 동의</LoginAgreeTitle>
                <LoginAgreeContent>
                    <img className="logo_mobile" style={{ paddingBottom: "17px", width: "139px" }} src={logoimage} alt="Amuse Travel Logo" />
                    <AllAgreeBox>
                        <AllAgreeTitleBox>
                            <AgreeCheck id="all_agree" onChange={handleAllAgreeChange} checked={allAgreed}></AgreeCheck>
                            <AllAgreeText htmlFor="all_agree">전체 동의하기</AllAgreeText>
                        </AllAgreeTitleBox>
                        <AllAgreeContent>
                            전체동의는 어뮤즈 트래블 서비스 동의를 포함하고 있습 니다.
                            전체동의는 선택목적에 대한 동의를 포함하고 있으며,
                            선택 목적에 대한 동의를 거부해도 서비스 이용이 가능합니다.
                        </AllAgreeContent>
                    </AllAgreeBox>
                    <AgreeBox>
                        <AgreeCheck id="agree_age_info" onChange={handleAgeInfoAgreeChange} checked={ageInfoAgreed}></AgreeCheck>
                        <AgreeText htmlFor="agree_age_info">
                            (필수)<ContentBtn>만 14세 이상</ContentBtn>동의
                        </AgreeText>
                    </AgreeBox>
                    <AgreeBox>
                        <AgreeCheck id="agree_personal_info" onChange={handlePersonalInfoAgreeChange} checked={personalInfoAgreed}></AgreeCheck>
                        <AgreeText htmlFor="agree_personal_info">
                            (필수)<ContentBtn>개인정보 활용</ContentBtn>동의
                        </AgreeText>
                    </AgreeBox>
                    <AgreeBox>
                        <AgreeCheck id="agree_marketing_info" onChange={handleMarketingInfoAgreeChange} checked={marketingInfoAgreed}></AgreeCheck>
                        <AgreeText htmlFor="agree_marketing_info">
                            (선택)<ContentBtn>마케팅정보 활용</ContentBtn>동의
                        </AgreeText>
                    </AgreeBox>
                    <AgreeButton onClick={() => { submitAgree() }} disabled={!(ageInfoAgreed && personalInfoAgreed)}>
                        {"동의하고 계속하기"}
                    </AgreeButton>
                </LoginAgreeContent>
            </LoginAgreeBody>
        )
    }
}
export default LoginAgree

const LoginAgreeBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoginAgreeTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
    margin-top: 60px;
`;

const LoginAgreeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 446px;
    height: 510px;
    border: 1px solid #E3E3E3;
    padding: 40px 60px;
`;

const AllAgreeBox = styled.div`

    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    padding: 12px 7px;
`;

const AllAgreeTitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const AllAgreeContent = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left: 30px;
`;

const AgreeCheck = styled.input.attrs({ type: 'checkbox' })`
    content: url(${checkIcon});
    width: 20px;
    margin: 0 10px 0 0;
    &:checked {
        content: url(${checkedIcon});
    }
`;

const AllAgreeText = styled.label`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const AgreeBox = styled.div`
    display: flex;
    align-items: center;
    margin: 7px 16px;
`;

const AgreeText = styled.label`
    color: #9C9C9C;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const ContentBtn = styled.span`
    color: #4A87FF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
    cursor: pointer;
`;


const AgreeButton = styled.button`
    &:disabled {
        color:#fff;
        background-color:#828282;
        cursor: not-allowed;
    }
    width: 327px;
    height: 46px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 8px;
    background: #E6003E;
    color:#fff;
    font-size:20px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor:pointer;
    margin-top: 10px;
`;
// const ReadText = styled.div`
//     display:flex;
//     align-items:center;
//     width:32;
//     height:24;
//     font-size:12px;
//     cursor:pointer;
//     color:rgb(120,120,120);

//     &:hover{
//         color:#e6003d;
//     }
// `;
// const CancelBtn = styled.div`
//     width: 100%;
//     max-width: 348px;
//     display: flex;
//     flex-direction: row-reverse;
//     margin-top: 20px;
//     margin-right: 12px;

//     &:hover{
//         color :#e6003d;
//     }
// `;