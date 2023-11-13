import styled from "styled-components";

export const FindBody = styled.div`
    flex-direction: column;
    align-items: center;
    max-width: 754px;
    height: 506px;
    margin: 30px auto;
`;

export const FindTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
    margin-top: 60px;
`;

export const FirstText = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

export const SecondText = styled.div`
    color: #909090;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 30px 0;
`;

export const ResultBox = styled.div`
    width: 754px;
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
`;

export const ContinueButton = styled.button`
    width: 754px;
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
`;

export const NoteBox = styled.div`
    width: 754px;
    height: 84px;
    border-radius: 8px;
    background-color: #E9E9E9;
    margin: 15px 0;
    padding: 14px;
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