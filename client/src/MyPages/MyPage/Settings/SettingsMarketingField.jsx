import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function SettingsMarketingField() {
  const [state, setState] = React.useState({
    email: false,
    message: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { email, message } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" >
        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={email} onChange={handleChange} name="email" />
            }
            label={<span style={{ fontSize: "18px"}}>이메일 수신</span>}
          />
          <FormHelperText sx={{fontSize: "16px", mb: "16px"}}>주요 알림 메세지를 이메일로 수신합니다.</FormHelperText>
          <FormControlLabel
            control={
              <Checkbox checked={message} onChange={handleChange} name="message" />
            }
            label={<span style={{ fontSize: "18px"}}>문자 수신</span>}
          />
            <FormHelperText sx={{fontSize: "16px"}}>주요 알림 메세지를 문자로 수신합니다.</FormHelperText>
        </FormGroup>
      </FormControl>
    </Box>
  );
}