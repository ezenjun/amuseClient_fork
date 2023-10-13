import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SettingsGender() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">성별</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="성별"
          onChange={handleChange}
        >
          <MenuItem value={10}>선택하기</MenuItem>
          <MenuItem value={20}>남자</MenuItem>
          <MenuItem value={30}>여자</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}