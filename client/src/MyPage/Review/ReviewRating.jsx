import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function ReviewRating({rating, handleRating}) {


  return (
    <>
      <Typography component="legend">별점</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          handleRating(newValue);
        }}
      />
    </>
  );
}