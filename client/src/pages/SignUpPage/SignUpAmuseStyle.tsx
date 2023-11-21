import styled from "styled-components";
import checkIcon from '../LogInPage/Icons/check_icon.png';
import checkedIcon from '../LogInPage/Icons/checked_icon.png';


export const SignUpBody = styled.div`
    flex-direction: column;
    align-items: center;
    max-width: 754px;
    // height: 506px;
    margin: 30px auto 200px;
`;

export const SignUpTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
    margin-top: 60px;
`;

// 약관 동의 style
export const AllAgreeBox = styled.div`
    height: 60px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 0px 4px 3px #F5F5F5;
    padding: 20px 16px;
`;

export const AgreeCheck = styled.input.attrs({ type: 'checkbox' })`
    content: url(${checkIcon});
    width: 20px;
    margin: 0 10px 0 0;

    &:checked {
        content: url(${checkedIcon});
    }
`;

export const AgreeBox = styled.div`
    display: flex;
    align-items: center;
    margin: 7px 16px;
`;

export const AllAgreeText = styled.label`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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

export const NextButton = styled.button`
    width: 754px;
    height: 51px;
    border: none;
    border-radius: 8px;
    background: #E6003E;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
    margin: 12px 0;
    &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;

export const textBox = styled.div`
    width: 754px;
    height: 164px;
    background-color: #ececec;
    padding: 32px;
`

export const DoneText = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
`;

export const WelcomeText = styled.div`
    margin: 30px 0;
    color: #909090;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;


// 약관동의 Modal style
export const ModalBody = styled.div`
    display: block;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.h2`
    color: #000;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.64px;
`;

export const ModalContent = styled.div`
    margin: 30px 0;
    max-height: 33vh;
    overflow-y: auto;
`;

export const AgreeBtn = styled.button`
    width: 659px;
    height: 60px;
    background-color: #E6003D;
    border: none;
    border-radius: 8px;
    background: #E6003E;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.4px;
    position: fixed;
    bottom: 42px;
`;

