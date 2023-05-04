import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function ReviewRating() {
  const [value, setValue] = React.useState(5);

  return (
    <>
      <Typography component="legend">별점</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </>
  );
}