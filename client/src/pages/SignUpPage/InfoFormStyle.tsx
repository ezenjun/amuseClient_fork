import styled from "styled-components";

export const InputTitle = styled.div`
    color: #464646;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
    margin-bottom: 11px;
`;

export const InnBtn = styled.button`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.4px;
    width: 174px;
    height: 56px;
    flex-shrink: 0;
    border-radius: 8px;
    background-color: #909090;
`;

export const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const RadioButtonContainer = styled.div`
    .input_gender input[type="radio"] {
        display: none;
    }

    .input_gender label {
        width: 87px;
        height: 56px;
        cursor: pointer;
        border: 1px solid #DDD;
        background: #FFF;
        display: inline-block;
        color: #909090;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 56px;
        vertical-align: middle;
    }

    .input_gender label.first_label {
        border-radius: 8px 0 0 8px;
    }

    .input_gender label.last_label {
        border-radius: 0 8px 8px 0;
    }

    .input_gender input[type="radio"]:checked+label {
        border: 2px solid #000;
        font-weight: 700;
        color: #000;
    }
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
    margin: 45px 0;
    &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;