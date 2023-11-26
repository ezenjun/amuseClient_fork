import styled from "styled-components";

export const CertificationBody = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 80px;
    border-bottom: 6px solid rgba(204, 204, 204, 0.1);

    position: relative;
`;

export const CertificationTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;

    @media (min-width: 1024px) {
        font-size: 24px;
        margin-top: 40px;
    }

    @media (max-width: 1023px){
        font-size: 24px;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        margin-top: 10px;
    }
`;

export const SingleSignBtn = styled.button`
    border-radius: 8px;
    background-color: #DFDFDF;
    color: #464646;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.4px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%); 

    @media (min-width: 1024px) {
        width: 754px;
        height: 56px;
        font-size: 20px;
    }

    @media (max-width: 1023px){
        width: 768px;
        height: 56px;
        font-size: 20px;
    }

    @media (max-width: 768px) {
        width: 333px;
        height: 40px;
        font-size: 16px;
    }

`;