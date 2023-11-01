import React, { ChangeEvent, useState } from "react";
import FormControl from '@mui/material/FormControl';
import TextField, { TextFieldVariants } from '@mui/material/TextField';


interface TextInputProps {
    labelText: string;
    placeText: string;
    inputType: string;
    width: string;
    margin: string;
    disable: boolean;
    // customValidation: (value: string) => string;
    // onInputChange: (value: string) => void;
    onBlur?: () => void;
    value?: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid?: boolean;
    errorText?: string;
}

    const TextInput: React.FC<TextInputProps> = ({ disable, onBlur, onInputChange, labelText, placeText, value, inputType, isValid = true, errorText = "", width, margin }) => {
    // const [inputValue, setInputValue] = useState<string>('');

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const validationValue: string = customValidation(e.target.value);
    //     setInputValue(validationValue);
    //     onInputChange(validationValue);
    // };

    return (
        <FormControl sx={{ mb: margin, width: width }} variant="outlined">
            <TextField
                disabled={disable}
                id="input-text"
                label={labelText}
                placeholder={placeText}
                type={inputType}
                value={value}
                onChange={onInputChange}
                variant="outlined"
                size="small"
                sx={{ padding: 0 }}
                onBlur={onBlur}
                error={!isValid}
                helperText={!isValid ? errorText : ""}
            />
        </FormControl>
    );
}

export default TextInput;