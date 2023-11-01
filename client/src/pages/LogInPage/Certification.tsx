import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleSignOn from "./SingleSignOn";
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { impUid } from "../../atoms";

const Certification: React.FC = () => {
    const [checkAuthCode, setCheckAuthCode] = useState<boolean>(false);
    const [impUidData, setImpUid] = useRecoilState(impUid);
    
    const handleButtonClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const impUid = await SingleSignOn();
            setImpUid(impUid);
        } catch (error) {
            console.error(error);
        }
        setCheckAuthCode(true);
    };

    return (
        <CertificationBody>
            <CertificationTitle>본인인증</CertificationTitle>
            <SingleSignBtn onClick={handleButtonClick}>간편인증</SingleSignBtn>
        </CertificationBody>
    );
}

export default Certification;


const CertificationBody = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 60px 0;
    border-bottom: 6px solid rgba(204, 204, 204, 0.1);
`;

const CertificationTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
`;

const SingleSignBtn = styled.button`
    width: 699px;
    height: 60px;
    border-radius: 8px;
    border: 1px solid #CCC;
    color: var(--01, #464646);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
`;