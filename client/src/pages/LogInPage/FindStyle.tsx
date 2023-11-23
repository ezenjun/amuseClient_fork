import styled from "styled-components";

export const FindBody = styled.div`
    flex-direction: column;
    align-items: center;
    height: 80vh;
    margin: 0 auto;
    position: relative;

    @media (min-width: 1024px) {
        width: 754px;
    }

    @media (max-width: 1023px){
        width: 768px;
    }

    @media (max-width: 768px) {
        width: 333px;
    }
`;

export const FindTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 20px;
    margin-top: 60px;

    @media (min-width: 1024px) {
        font-size: 24px;
    }

    @media (max-width: 1023px){
        font-size: 32px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        justify-content: left;
    }
`;

export const FirstText = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media (max-width: 1023px){
        text-align: center;
    }

    @media (max-width: 768px) {
        text-align: left;
    }
`;

export const SecondText = styled.div`
    color: #909090;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 30px 0;

    @media (max-width: 1023px){
        text-align: center;
    }

    @media (max-width: 768px) {
        text-align: left;
    }
`;

export const ResultBox = styled.div`
    width: 100%;
    height: 97px;
    flex-shrink: 0;
    border-radius: 8px;
    background-color: #E9E9E9;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 97px;
    vertical-align: middle; 

    @media (max-width: 1023px){
        height: 160px;
        line-height: 160px;
    }

    @media (max-width: 768px) {
        height: 97px;
        line-height: 97px;
    }
`;

export const ContinueButton = styled.button`
    width: 100%;
    height: 51px;
    border: none;
    border-radius: 8px;
    background-color: #E6003E;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    font-family: Pretendard;
    font-style: normal;
    line-height: normal;
    margin: 16px 0;
    &:disabled {
        background-color: #E9E9E9;
        color: #464646;
        cursor: not-allowed;
    }

    @media (max-width: 1023px) {
        position: absolute;
        bottom: 20px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

// 비밀번호 재설정 폼
export const InputTitle = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
    margin-bottom: 14px;

    @media (max-width: 1023px) {
        font-size: 20px;
        font-weight: 700;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        font-weight: 700;
    }
`;

export const NoteBox = styled.div`
    width: 100%;
    height: 84px;
    border-radius: 8px;
    background-color: #E9E9E9;
    margin: 15px 0;
    padding: 14px;

    @media (max-width: 768px) {
        height: 102px;
    }
`;

export const NoteTitle = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const NoteContent = styled.div`
    color: #464646;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 148%;
    margin: 8px 14px;
`;