import styled from "styled-components";
import checkIcon from '../LogInPage/Icons/check_icon.png';
import checkedIcon from '../LogInPage/Icons/checked_icon.png';

export const SignUpBody = styled.div`
    flex-direction: column;
    align-items: center;
    height: 75vh;
    margin: 30px auto 200px;
    position: relative;

    @media (min-width: 1024px) {
        width: 754px;
    }

    @media (max-width: 1023px){
        width: 522px;
    }

    @media (max-width: 768px) {
        width: 333px;
    }
`;

export const SignUpTitle = styled.h1`
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
    width: 100%;
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

    @media (max-width: 768px) {
        width: 333px;
        position: absolute;
        bottom: 20px;
    }
`;

export const textBox = styled.div`
    width: 100%;
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
    width: 100%;
    height: 100%;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        padding-bottom: 7px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

export const ModalTitle = styled.h2`
    color: #000;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;

    @media (min-width: 1024px) {
        font-size: 30px;
        letter-spacing: -0.64px;
    }

    @media (max-width: 1023px){
        font-size: 24px;
        letter-spacing: -0.48px;
    }

    @media (max-width: 768px) {
        font-size: 20px;
        letter-spacing: -0.4px;
    }
`;

export const ModalContent = styled.div`
    display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	border: 1px solid gray;
	padding: 0.625rem;

    @media (min-width: 1024px) {
        margin: 30px 0;
        max-height: 60%;
    }

    @media (max-width: 1023px){
        margin: 25px 0;
        max-height: 60%;
    }

    @media (max-width: 768px) {
        margin: 20px 0;
        max-height: calc(80vh - 15vw);
    }
`;

export const AgreeBtn = styled.button`
    background-color: #E6003D;
    border: none;
    border-radius: 8px;
    background: #E6003E;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
	justify-content: center;
	align-items: center;
    position: fixed;
    bottom: 30px;

    @media (min-width: 1024px) {
        width: 666px;
        height: 60px;
        font-size: 20px;
        letter-spacing: -0.4px;
    }

    @media (max-width: 1023px){
        width: 460px;
        height: 48px;
        font-size: 16px;
        letter-spacing: -0.32px;
    }

    @media (max-width: 768px) {
        width: 93%;
        height: 48px;
        font-size: 16px;
        letter-spacing: -0.32px;
    }

    @media (max-height: 350px) {
        position: relative;
        top: 0;
        width: 100%;
    }
`;

