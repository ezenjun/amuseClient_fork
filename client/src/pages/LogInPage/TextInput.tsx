import React, { ChangeEvent, useState } from "react";
import FormControl from '@mui/material/FormControl';
import TextField, { TextFieldPropsSizeOverrides, TextFieldVariants } from '@mui/material/TextField';
import { OverridableStringUnion } from '@mui/types';

interface TextInputProps {
    labelText: string;
    placeText: string;
    inputType: string;
    width: string;
    margin: string;
    disable: boolean;
    onBlur?: () => void;
    value?: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid?: boolean;
    errorText?: string;
    inputId?: boolean;
    design?: TextFieldVariants;
    allMargin?: string;
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

const TextInput: React.FC<TextInputProps> = ({ disable, onBlur, onInputChange, labelText, placeText, value, inputType, isValid = true, errorText = "", width, margin, inputId, allMargin, design="outlined", size="medium" }) => {

    return (
        <FormControl sx={{ mb: margin, width: width, m: allMargin }} variant="outlined">
            <TextField
                hiddenLabel
                disabled={disable}
                id="input-text"
                label={labelText}
                placeholder={placeText}
                type={inputType}
                value={value}
                onChange={onInputChange}
                // variant="outlined"
                variant={design}
                size={size}
                sx={{ padding: 0 }}
                onBlur={onBlur}
                error={!isValid}
                helperText={!isValid ? errorText : (inputId ? "사용가능한 ID입니다." : "")}
            />
        </FormControl>
    );
}

export default TextInput;