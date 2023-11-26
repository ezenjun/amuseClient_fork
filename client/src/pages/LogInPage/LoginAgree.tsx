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

import * as M from "../SignUpPage/SignUpAmuseStyle";
import Modal from "react-modal";
import CloseIcon from "./Icons/close_icon.png";

interface TermData {
    id: number;
    title: string;
    content: string;
    mandatory: boolean;
}

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
                // setLoggedIn(true);
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
                // setLoggedIn(true);
                getUserInfoAsToken();
            }
        }
    }, [cookies.__jwtkid__]);


    const getUserInfoAsToken = async () => {
        if (cookies.__jwtkid__) {
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
                    checkAgree().then((result) => {
                        if (result) {
                            setLoggedIn(true);
                            movePage("/");
                        } else {
                            setLoggedIn(false);
                            setIsShow(true);
                        }
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // 약관 동의 여부 확인 api
    const checkAgree = () => {
        if (cookies.__jwtkid__) {
            return axios
                .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/terms_of_service?type=SignUp`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${cookies.__jwtkid__}`,
                    },
                })
                .then((response) => {
                    console.log(response.data.data);
                    return response.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return Promise.resolve(false);
    }

    // 약관 동의 post api
    const submitAgree = async () => {
        const token = cookies["__jwtkid__"]
        const newAgreedArray = termAgreeStatus.map((value: number, index: number) => ({
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
                movePage("/");
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


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
    const [ageInfoAgreed, setAgeInfoAgreed] = useState<boolean>(false);
    const handleAllAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        const newAgreeStatus = termAgreeStatus.map(() => (isChecked ? 1 : 0));
        setTermAgreeStatus(newAgreeStatus);
        setAllAgreed(isChecked);
        setAgeInfoAgreed(isChecked);
    };

    const handleTermAgreeChange = (index: number) => {
        const newAgreeStatus = [...termAgreeStatus];
        newAgreeStatus[index] = newAgreeStatus[index] === 1 ? 0 : 1;
        setTermAgreeStatus(newAgreeStatus);
        setAllAgreed(newAgreeStatus.every((status) => status === 1) && ageInfoAgreed);
    };

    const handleAgeInfoAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setAgeInfoAgreed(isChecked);
        setAllAgreed(isChecked && termAgreeStatus.every((status) => status === 1));
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

                    {terms.map((term, index) => (
                        <S.AgreeBox key={`${term.id}`}>
                            <S.AgreeCheck id={`agree_${term.id}`} onChange={() => handleTermAgreeChange(index)} checked={termAgreeStatus[index] === 1}></S.AgreeCheck>
                            <S.AgreeText htmlFor={`agree_${term.id}`}>
                                {`(${term.mandatory ? '필수' : '선택'})`}
                                <M.ContentBtn onClick={() => openModal(index)}>{`${term.title}`}</M.ContentBtn>
                            </S.AgreeText>
                        </S.AgreeBox>
                    ))}

                    <S.AgreeButton
                        onClick={() => { submitAgree() }}
                        disabled={!(ageInfoAgreed && !(terms
                            .filter((term, index) => term.mandatory && termAgreeStatus[index] !== 1)
                            .length > 0))}>
                        {"동의하고 계속하기"}
                    </S.AgreeButton>
                </S.LoginAgreeContent>

                {/* 약관 동의 modal */}
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
                                height: "486px",
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
                        {modalContent !== null && (
                            <M.ModalBody>
                                <M.ModalHeader>
                                    <M.ModalTitle>{`${terms[modalContent].title}(${terms[modalContent].mandatory ? '필수' : '선택'})`}</M.ModalTitle>
                                    <button className="modal_btn_close" onClick={closeModal}>
                                        <img src={CloseIcon} className="close_icon" />
                                    </button>
                                </M.ModalHeader>
                                <M.ModalContent>
                                    {terms[modalContent].content.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </M.ModalContent>
                                <M.AgreeBtn onClick={closeModal}>확인</M.AgreeBtn>
                            </M.ModalBody>
                        )}
                    </Modal>
                </div>
            </S.LoginAgreeBody>
        )
    }
}

export default LoginAgree