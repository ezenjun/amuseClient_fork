import { useParams } from 'react-router-dom'
import './Review.module.css';
import Header from '../../Headers/Header';
import MyPagelist from '../MyPageList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReviewRating from './ReviewRating';
import { useEffect, useState } from 'react';
import axios from 'axios';

//이미지 미리보기를 위한 컴포넌트 
function ImagePreview({ image }) {
  return (
    <div>
      <img src={image} alt="Preview" style={{ width: '150px', height: '150px', margin: '0 10px' }} />
    </div>
  );
}

export default function Review() {

  const { id } = useParams();
  const [reviewInput, setReviewInput] = useState('');
  const [reviewItemImg, setReviewItemImg] = useState();
  const [itemTitle, setItemTitle] = useState('');
  const [reviewImages, setReviewImages] = useState([]);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    axios.get(`https://ammuse.store/detail/${id}/picture`).then((res)=>{
      console.log(res);
      setReviewItemImg(res.data.data.pictures[0]);
    })
    axios.get(`https://ammuse.store/detail/${id}/title`).then((res) => {
      console.log(res);  
      setItemTitle(res.data.data.title);
    })
  })

  const handleImageSelect = (e) => {
    const files = e.target.files;
    const selectedImages = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        selectedImages.push(event.target.result);
        if (selectedImages.length === files.length) {
          setReviewImages(selectedImages);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const submitRating = () => {
    const data = {
      rate: rating / 1.0,
      review_content: reviewInput,
      review_imgs: reviewImages.map((image, index) => ({
        fileName: `image${index + 1}.jpeg`,
        base64Data: image,
      })),
    };
    //local storage에서 accessToken 가져오기
    const loginToken = localStorage.getItem('loginToken');
    const config = {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDc5MTE1OTM4NDA4NTkxMzUxNjYiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjg0OTQ5Njc0fQ.4TztQwDottQsAdb4HUaD-9YZuh70F5AkbGRFyfdp3IQ`,
        'Content-Type': 'application/json'
      }
    }
    // 리뷰 post 요청하기
    axios.post(`https://ammuse.store/my-page/item/${id}/review`, data, config)
    .then((res) => console.log(res))
  }

  const handleRating = (newValue) => {
    setRating(newValue);
  }

  return (
    <>
    <div className="App">
        <Header />
    </div>
    <div className='myPage'>
    <MyPagelist />
    <div style={{padding: "35px"}}>
    <h2 style={{marginBottom: '30px'}}>후기 남기기</h2>
    <img src={reviewItemImg} alt='여행 상품 이미지' style={{width: '500px', height: '310px'}} />
    <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '30px'}}>상품명 : {itemTitle}</p>
    <p style={{marginBottom: "30px"}}><ReviewRating rating={rating} handleRating={handleRating}/></p>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* 이미지 미리보기 */}
      {reviewImages.map((image, index) => (
        <ImagePreview key={index} image={image} />
      ))}
    </div>
    <input type="file" multiple onChange={handleImageSelect} />
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
          <Button variant="contained" sx={{marginLeft: '10px'}} onClick={submitRating}>제출하기</Button>
        </div>
      </div>
    </div>
    <div>

    </div>
    </div>

    </>
  );
}
