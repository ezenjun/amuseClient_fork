import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainComponent from "../../MainComponent";
import Certification from "./Certification";
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import * as S from "./FindStyle";

const FindId: React.FC = () => {
    const movePage = useNavigate();
    const [isShow, setIsShow] = useRecoilState(isVisible);

    const navigateToLogin = () => {
        movePage("/LogIn");
    };

    const navigateToSignUp = () => {
        movePage("/SignUp");
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

    // 아이디 찾기 api
    const [id, setId] = useState<string>("");
    useEffect(() => {
        if (name && birth && phone) {
            axios.get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/search/id?name=${name}&birthday=${birth}&phonenumber=${phone}`)
                .then((response) => {
                    setId(response.data.data.id);
                })
                .catch((error) => {
                    console.log(error.response.data.code);
                });
        }
    }, [name, birth, phone])


    return (
        <MainComponent>
            <S.FindBody>
                {isShow && <Certification onCalledBy="Find"></Certification>}
                {!isShow && (
                    <div>
                        <S.FindTitle>아이디 찾기</S.FindTitle>
                        {id && (
                            <div>
                                <S.FirstText>회원님!<br /> 아이디를 찾았어요.</S.FirstText>
                                <S.SecondText>회원님의 정보로 1개의 아이디를 찾았어요.</S.SecondText>
                                <S.ResultBox>{id}</S.ResultBox>
                                <S.ContinueButton onClick={navigateToLogin}>확인</S.ContinueButton>
                            </div>
                        )}
                        {!id && (
                            <div>
                                <S.FirstText>가입한 로그인 정보가 없습니다.<br />회원가입을 통해 더 다양한 서비스를 만나보세요!</S.FirstText>
                                <S.SecondText></S.SecondText>
                                <S.ResultBox></S.ResultBox>
                                <S.ContinueButton onClick={navigateToSignUp}>회원가입 하기</S.ContinueButton>
                            </div>
                        )}
                    </div>
                )}
            </S.FindBody>
        </MainComponent>
    );
}

export default FindId;