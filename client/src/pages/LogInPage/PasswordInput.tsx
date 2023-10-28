import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField, { TextFieldPropsSizeOverrides, TextFieldVariants } from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { OverridableStringUnion } from '@mui/types';

interface PasswordInputProps {
  password: string;
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  design: TextFieldVariants;
  width: string;
  margin: string;
  margin_b: string;
  isValid: boolean;
  errorText: string;
  inputSize: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, handleChangePassword, labelText, design, width, margin, margin_b, isValid, errorText, inputSize }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    // <FormControl sx={{ m: 1, width: '680px' }} variant="standard">
    //   <InputLabel htmlFor={design}>{labelText}</InputLabel>
    //   <Input
    //     id={design}
    //     type={showPassword ? 'text' : 'password'}
    //     value={password}
    //     onChange={handleChangePassword}
    //     endAdornment={
    //       <InputAdornment position="end">
    //         <IconButton
    //           aria-label="toggle password visibility"
    //           onClick={handleClickShowPassword}
    //           onMouseDown={handleMouseDownPassword}
    //         >
    //           {showPassword ? <VisibilityOff /> : <Visibility />}
    //         </IconButton>
    //       </InputAdornment>
    //     }

    //   />
    // </FormControl>
    <FormControl sx={{ m: margin, width: width, mb: margin_b}} variant="outlined">
      <TextField
        id="input-password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handleChangePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        label={labelText}
        variant={design}
        size={inputSize}
        // 유효성 검사 오류 시 추가
        error={!isValid}
        helperText={!isValid ? errorText : ""}
      />
    </FormControl>
  );
}

export default PasswordInput;