import { useParams } from 'react-router-dom'
import './Review.module.css';
import Header from '../../Headers/Header';
import MyPagelist from '../MyPageList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReviewRating from './ReviewRating';
import { useState } from 'react';


export default function Review() {

  const { name } = useParams();
  const [reviewInput, setReviewInput] = useState();

  return (
    <>
    <div className="App">
        <Header />
    </div>
    <div className='myPage'>
    <MyPagelist />
    <div style={{padding: "35px"}}>
    <h2 style={{marginBottom: '30px'}}>후기</h2>
    <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '30px'}}>상품명 : {name}</p>
    <p style={{marginBottom: "30px"}}><ReviewRating/></p>
      <div>
        <TextField
        id="filled-multiline-static"
        label="후기 남기기"
        multiline
        rows={4}
        placeholder='이번 여행은 어떠셨나요?'
        variant="filled"
        sx={{ width: "500px", marginBottom: "30px" }}
        value={reviewInput}
        onChange={(e)=>setReviewInput(e.target.value)}
        />
        <div>
          <Button variant="contained" sx={{marginLeft: '10px'}}>제출하기</Button>
        </div>
      </div>
    </div>
    <div>

    </div>
    </div>

    </>
  );
}
