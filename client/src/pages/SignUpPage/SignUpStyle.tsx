import styled from "styled-components";

export const SignUpBody = styled.div`
    flex-direction: column;
    align-items: center;
    width: 699px;
    height: 506px;
    margin: 30px auto;
`;

export const SignUpTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
`;

export const OAuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin: auto;
    margin-top: 10px;
`;

export const SignupButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 13px;
    text-decoration: none;
    height: 56px;
    position: relative;
    &.signup_amuse {
        background: #E6003E;
        color: #FFF;
    }
    &.signup_google {
        border: 1px solid #DDD; background: rgba(217, 217, 217, 0.00); color: black;
    }
    &.signup_kakao {
        background: #F6E625; color: black;
    }
    &.signup_naver {
        background: #1DC800; color: #FFF;
    }
`;


export const SnsLogo = styled.img`
    width: 38px;
    position: absolute;
    right: 41px;
    top: 50%;
    transform: translateY(-50%);
`;
