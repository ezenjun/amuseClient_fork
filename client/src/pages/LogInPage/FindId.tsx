import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainComponent from "../../MainComponent";
import Certification from "./Certification";
import { useRecoilState } from "recoil";
import { impUid, isVisible } from "../../atoms";
import * as S from "./FindStyle";

interface FindIdProps { }

const FindId: React.FC<FindIdProps> = () => {
    const movePage = useNavigate();
    const [isShow, setIsShow] = useRecoilState(isVisible);

    const navigateToLogin = () => {
        movePage("/LogIn");
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
    const [ids, setIds] = useState([]);

    useEffect(() => {
        if (name && birth && phone) {
            axios.get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/search/id?name=${name}&birthday=${birth}&phonenumber=${phone}`)
                .then((response) => {
                    setIds(response.data.data.ids);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [name, birth, phone])

    return (
        <MainComponent>
            <S.FindBody>
                {isShow && <Certification></Certification>}
                {!isShow && (
                    <div>
                        <S.FindTitle>아이디 찾기</S.FindTitle>
                        <S.FirstText>회원님!<br /> 아이디를 찾았어요.</S.FirstText>
                        <S.SecondText>회원님의 정보로 {ids.length}개의 아이디를 찾았어요.</S.SecondText>
                        <S.ResultBox>{ids.join(', ')}</S.ResultBox>
                        <S.ContinueButton onClick={navigateToLogin}>확인</S.ContinueButton>
                    </div>
                )}
            </S.FindBody>
        </MainComponent>
    );
}

export default FindId;