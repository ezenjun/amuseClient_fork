import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// import SingleSignOn from "./SingleSignOn";
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import Modal from "react-modal";
import * as S from "./CertificationStyle";
import * as M from "../SignUpPage/SignUpAmuseStyle";

interface CertificationProps {
    onCalledBy: string;
}

const Certification: React.FC<CertificationProps> = ({ onCalledBy }) => {
    const movePage = useNavigate();
    const [impUidData, setImpUid] = useRecoilState(impUid);

    const location = useLocation();
    const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
    useEffect(() => {
        if (prevPageUrl === null) {
            setPrevPageUrl(location.pathname);
        }
    }, []);


    const SingleSignOnFindId = async () => {
        const { IMP } = window as any;
        IMP.init("imp38885874");
        const redirect_url = process.env.REACT_APP_REDIRECT_URL;
        IMP.certification({
            pg: 'inicis_unified.9810030929',
            merchant_uid: "ORD20180131-0000011",
            m_redirect_url: `${redirect_url}LogIn/FindId`,
        }, function (rsp: { success: any; imp_uid: any; error_msg: string; }) {
            if (rsp.success) {
                setImpUid(rsp.imp_uid);
            } else {
                alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });
    }

    const SingleSignOnFindPw = async () => {
        const { IMP } = window as any;
        IMP.init("imp38885874");
        const redirect_url = process.env.REACT_APP_REDIRECT_URL;
        IMP.certification({
            pg: 'inicis_unified.9810030929',
            merchant_uid: "ORD20180131-0000011",
            m_redirect_url: `${redirect_url}LogIn/FindPw`,
        }, function (rsp: { success: any; imp_uid: any; error_msg: string; }) {
            if (rsp.success) {
                setImpUid(rsp.imp_uid);
            } else {
                alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });
    }

    const SingleSignOnSignUp = async () => {
        const { IMP } = window as any;
        IMP.init("imp38885874");
        const redirect_url = process.env.REACT_APP_REDIRECT_URL;
        // return new Promise((resolve, reject) => {
        IMP.certification({
            pg: 'inicis_unified.{9810030929}',
            merchant_uid: "ORD20180131-0000011",
            m_redirect_url: `${redirect_url}SignUpAmuse`,
        }, function (rsp: { success: any; imp_uid: any; error_msg: string; }) {
            if (rsp.success) {
                setImpUid(rsp.imp_uid);
                // resolve(rsp.imp_uid);
            } else {
                alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });
        // });
    }

    // 본인 인증 실행
    const handleButtonClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            if (prevPageUrl !== null) {
                const currentUrl = prevPageUrl.slice(1);
                // const impUid = await SingleSignOn(`${currentUrl}`);
                // setImpUid(impUid);
                if (currentUrl === "LogIn/FindId") {
                    await SingleSignOnFindId();
                }
                if (currentUrl === "LogIn/FindPw") {
                    await SingleSignOnFindPw();
                }
                if (currentUrl === "SignUpAmuse") {
                    await SingleSignOnSignUp();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isShow, setIsShow] = useRecoilState(isVisible);
    const [isModalText, setIsMOdalText] = useState<string>("");
    const [isUser, setIsUser] = useState<boolean>(false);
    const openModal = (text: string) => {
        setIsMOdalText(text);
        setIsModalOpen(true);
    };

    const closeModal = (onCalledBy: string) => {
        setIsModalOpen(false);
        setIsMOdalText("");
        if (onCalledBy === "Find" && isUser) {
            setIsShow(false);
            if (prevPageUrl === "/LogIn/FindId") {
                console.log("아이디 찾기");
                movePage('/LogIn/FindId');
            }
            if (prevPageUrl === "/LogIn/FindPw") {
                console.log("비번 찾기");
                movePage('/LogIn/FindPw');
            }
        }
        if (onCalledBy === "Find" && !isUser) {
            movePage('/SignUp');
        }
        if (onCalledBy === "SignUp" && isUser) {
            movePage('/LogIn');
        }
        setIsShow(false);
    };

    // 인증된 정보 가져오기
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const impUidFromURL = params.imp_uid;
    if (impUidFromURL) {
        setImpUid(impUidFromURL);
    }

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
        if (impUidData || impUidFromURL) {
            axios
                .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/check/duplicate?name=${name}&birthday=${birth}&phonenumber=${phone}`)
                .then((response) => {
                    if (onCalledBy === "Find") {
                        if (response.data.data) {
                            setIsUser(true);
                            openModal("본인 인증이 완료되었습니다.");
                        }
                        if (!response.data.data) {
                            setIsUser(false);
                            openModal("회원가입된 계정이 없습니다.");
                        }
                    }

                    if (onCalledBy === "SignUp") {
                        if (response.data.data) {
                            setIsUser(true);
                            openModal("이미 가입된 로그인 정보가 존재합니다.");
                        }
                        if (!response.data.data) {
                            setIsUser(false);
                            openModal("본인 인증이 완료되었습니다.");
                        }
                    }

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [name, birth, phone])


    // 반응형 modal
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

    const updateModalStyles = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
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
        updateModalStyles();
        window.addEventListener('resize', updateModalStyles);
        return () => {
            window.removeEventListener('resize', updateModalStyles);
        };
    }, []);


    return (
        <S.CertificationBody>
            <S.CertificationTitle>본인인증</S.CertificationTitle>
            <S.SingleSignBtn onClick={handleButtonClick}>간편인증</S.SingleSignBtn>

            <div className="modal">
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => closeModal(onCalledBy)}
                    style={modalStyles}
                >
                    <div className="agree_modal">
                        <M.ModalHeader>
                            <M.ModalTitle>{isModalText}</M.ModalTitle>
                        </M.ModalHeader>
                        <div className="agree_btn_box">
                            <M.AgreeBtn onClick={() => closeModal(onCalledBy)}>확인</M.AgreeBtn>
                        </div>
                    </div>
                </Modal>
            </div>
        </S.CertificationBody>
    );
}

export default Certification;