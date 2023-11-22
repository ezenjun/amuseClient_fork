import styled from "styled-components";
import checkIcon from './Icons/check_icon.png';
import checkedIcon from './Icons/checked_icon.png';

export const LoginBody = styled.div`
    flex-direction: column;
    align-items: center;
    // max-width: 699px;
    height: 506px;
    margin: 30px auto;

    @media (min-width: 1024px) {
        width: 699px;
    }

    @media (max-width: 1023px){
        width: 522px;
    }

    @media (max-width: 768px) {
        width: 333px;
    }
`;

export const LoginTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
`;

export const InputContainer = styled.div`
    width: 100%;
    height: 150px;
    border: solid 1px #DDDDDD;
    border-radius: 8px;
`;

export const ErrorMessage = styled.div`
    color: red;
    margin-top: 8px;
`;

export const KeepIdContainer = styled.div`
    margin: 15px;
    display: flex;
    align-items: center;
`;

export const KeepIdCheck = styled.input.attrs({ type: 'checkbox' })`
    content: url(${checkIcon});
    width: 20px;
    margin: 0 10px 0 0;

    &:checked {
        content: url(${checkedIcon});
    }
`;

export const KeepIdText = styled.label`
    color: #111;
`;

export const LoginButton = styled.button`
    width: 100%;
    height: 51px;
    border: none;
    border-radius: 8px;
    background: #E6003E;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
`;

export const FunctionBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 0 0 0;
    color: #353535;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
`;

export const FindIdButton = styled.a`
    text-decoration: none;
    color: #353535;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    padding-right: 12px;
`;

export const FindPwButton = styled.a`
    text-decoration: none;
    color: #353535;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    padding-left: 12px;
    border-left: 1px solid #DDD;
`;

export const NoDecorationLink = styled.a`
    text-decoration: none;
    color: #353535;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    display: flex;
    align-items: center;
`;

export const SignUpButton = styled.div`
    display: flex;
    align-items: center;
`;

export const SignUpLink = styled.span`
    color: #4A87FF;
    margin-left: 4px;
`;

export const VBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    align-items: center;
    color: #797979;
    font-size: 15px;
`;

export const OAuthContainer = styled.div`
    display: flex;
    text-align: center;
`;

export const SnsLogo = styled.img`
    width: 49px;
    margin-right: 0;
    margin-left: 10px;
`;
