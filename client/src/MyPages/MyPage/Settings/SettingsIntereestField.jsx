import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function SettingsInterestField() {
  const [state, setState] = React.useState({
    wheelChair: false,
    develop: false,
    visual: false,
    hearing: false,
    senior: false
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { wheelChair, develop, visual, hearing, senior } = state;
  const error = [wheelChair, develop, visual, hearing, senior].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex'}}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" >
        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={wheelChair} onChange={handleChange} name="wheelChair" />
            }
            label={<span style={{ fontSize: "18px"}}>휠체어 여행</span>}
          />
          <FormHelperText sx={{fontSize: "16px", mb: "16px"}}>휠체어 사용자 관련 여행상품</FormHelperText>
          <FormControlLabel
            control={
              <Checkbox checked={develop} onChange={handleChange} name="develop" />
            }
            label={<span style={{ fontSize: "18px"}}>발달 여행</span>}
          />
            <FormHelperText sx={{fontSize: "16px", mb: "16px"}}>발달 장애인 연관 여행상품</FormHelperText>
          <FormControlLabel
            control={
              <Checkbox checked={visual} onChange={handleChange} name="visual" />
            }
            label={<span style={{ fontSize: "18px"}}>시각 여행</span>}
          />
            <FormHelperText sx={{fontSize: "16px", mb: "16px"}}>시각 장애인 연관 여행상품</FormHelperText>
            <FormControlLabel
            control={
              <Checkbox checked={hearing} onChange={handleChange} name="hearing" />
            }
            label={<span style={{ fontSize: "18px"}}>청각 여행</span>}
          />
            <FormHelperText sx={{fontSize: "16px", mb: "16px"}}>청각 장애인 연관 여행상품</FormHelperText>
            <FormControlLabel
            control={
              <Checkbox checked={senior} onChange={handleChange} name="senior" />
            }
            label={<span style={{ fontSize: "18px"}}>시니어 여행</span>}
          />
            <FormHelperText sx={{fontSize: "16px"}}>법정 경로우대 (만 65세 이상) 대상자 연관 여행상품</FormHelperText>
        </FormGroup>

      </FormControl>
    </Box>
  );
}