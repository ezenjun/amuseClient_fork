import styled from "styled-components";

export const InputTitle = styled.div`
    color: var(--01, #464646);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
    margin-bottom: 11px;
`;

export const InnBtn = styled.button`
    height: 25px;
    border: none;
    border-radius: 8px;
    background: #EDEDED;
    font-size: 12px;
    font-weight: 600;
    margin-top: 11px;
    z-index: 100;
    margin-left: -100px;
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
        height: 43px;
        display: inline-block;
        padding: 13px 16.2px;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #DDD;
        background: #FFF;
    }

    .input_gender label.first_label {
        border-radius: 8px 0 0 8px;
    }

    .input_gender label.last_label {
        border-radius: 0 8px 8px 0;
    }

    .input_gender input[type="radio"]:checked+label {
        background-color: #3498db;
        color: #fff;
    }
`;

export const NextButton = styled.button`
    width: 699px;
    height: 51px;
    border: none;
    border-radius: 8px;
    background: #E6003E;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
    &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;