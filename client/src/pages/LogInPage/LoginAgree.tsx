import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import _ from "lodash";
import logoimage from "../../assets/Images/amuse_logo.png";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../atoms";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useNavigate } from "react-router";
import * as S from "./LoginAgreeStyle";


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
            <S.LoginAgreeBody>
                <S.LoginAgreeTitle>약관 동의</S.LoginAgreeTitle>
                <S.LoginAgreeContent>
                    <img className="logo_mobile" style={{ paddingBottom: "17px", width: "139px" }} src={logoimage} alt="Amuse Travel Logo" />
                    <S.AllAgreeBox>
                        <S.AllAgreeTitleBox>
                            <S.AgreeCheck id="all_agree" onChange={handleAllAgreeChange} checked={allAgreed}></S.AgreeCheck>
                            <S.AllAgreeText htmlFor="all_agree">전체 동의하기</S.AllAgreeText>
                        </S.AllAgreeTitleBox>
                        <S.AllAgreeContent>
                            전체동의는 어뮤즈 트래블 서비스 동의를 포함하고 있습 니다.
                            전체동의는 선택목적에 대한 동의를 포함하고 있으며,
                            선택 목적에 대한 동의를 거부해도 서비스 이용이 가능합니다.
                        </S.AllAgreeContent>
                    </S.AllAgreeBox>
                    <S.AgreeBox>
                        <S.AgreeCheck id="agree_age_info" onChange={handleAgeInfoAgreeChange} checked={ageInfoAgreed}></S.AgreeCheck>
                        <S.AgreeText htmlFor="agree_age_info">
                            (필수)<S.ContentBtn>만 14세 이상</S.ContentBtn>동의
                        </S.AgreeText>
                    </S.AgreeBox>
                    <S.AgreeBox>
                        <S.AgreeCheck id="agree_personal_info" onChange={handlePersonalInfoAgreeChange} checked={personalInfoAgreed}></S.AgreeCheck>
                        <S.AgreeText htmlFor="agree_personal_info">
                            (필수)<S.ContentBtn>개인정보 활용</S.ContentBtn>동의
                        </S.AgreeText>
                    </S.AgreeBox>
                    <S.AgreeBox>
                        <S.AgreeCheck id="agree_marketing_info" onChange={handleMarketingInfoAgreeChange} checked={marketingInfoAgreed}></S.AgreeCheck>
                        <S.AgreeText htmlFor="agree_marketing_info">
                            (선택)<S.ContentBtn>마케팅정보 활용</S.ContentBtn>동의
                        </S.AgreeText>
                    </S.AgreeBox>
                    <S.AgreeButton onClick={() => { submitAgree() }} disabled={!(ageInfoAgreed && personalInfoAgreed)}>
                        {"동의하고 계속하기"}
                    </S.AgreeButton>
                </S.LoginAgreeContent>
            </S.LoginAgreeBody>
        )
    }
}

export default LoginAgree