import styled from "styled-components";
import checkIcon from './Icons/check_icon.png';
import checkedIcon from './Icons/checked_icon.png';

export const LoginAgreeBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoginAgreeTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
    margin-top: 60px;
`;

export const LoginAgreeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 446px;
    height: 510px;
    border: 1px solid #E3E3E3;
    padding: 40px 60px;
`;

export const AllAgreeBox = styled.div`

    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    padding: 12px 7px;
`;

export const AllAgreeTitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const AllAgreeContent = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-left: 30px;
`;

export const AgreeCheck = styled.input.attrs({ type: 'checkbox' })`
    content: url(${checkIcon});
    width: 20px;
    margin: 0 10px 0 0;
    &:checked {
        content: url(${checkedIcon});
    }
`;

export const AllAgreeText = styled.label`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const AgreeBox = styled.div`
    display: flex;
    align-items: center;
    margin: 7px 16px;
`;

export const AgreeText = styled.label`
    color: #9C9C9C;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const ContentBtn = styled.span`
    color: #4A87FF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
    cursor: pointer;
`;


export const AgreeButton = styled.button`
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