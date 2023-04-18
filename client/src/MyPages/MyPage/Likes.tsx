import React from 'react';
import './Likes.css';

const likesList = [
  {
    title: "[1박2일] 수제맥주와 함께하는 감성 충만 강릉여행",
    subTitle: "찬찬히 둘러보는 아이돌봄 여행",
    img_url: "https://cdn.amusetravel.com/production/1612/3OC3JDvHEyfTUqwjhrm8fHTtRn59C6bR.png",
    price: "321,100"
  },
  {
    title: "[1박 2일] 바다향기 담은, 강릉 시니어 맞춤 호텔 온천욕",
    subTitle: "자연 속에서 피로회복, 강릉 호캉스 떠나봐요!",
    img_url: "https://cdn.amusetravel.com/production/1350/1nJ1VO2FSGIkKhhtvnES24nh7WsRwWZU.png",
    price: "458,000"
  },
  {
    title: "[데이투어] 봄이 가득한 액티브 춘천 시니어 당일여행",
    subTitle: "킹카누를 타고 느껴보는 춘천의 자연",
    img_url: "https://cdn.amusetravel.com/production/1367/1FjcMRv1gG0zvE8a1GGqEFymYMaTEoxN.png",
    price: "139,000"
  },
  {
    title: "[데이투어] 선비마을에서 유유자적 안동 브루어리 투어",
    subTitle: "전통문화와 현대가 공존하는 아이돌봄 여행",
    img_url: "https://cdn.amusetravel.com/production/1162/1bo6fzK8nqwz3AEWcYoUJty6pI6kaiPZ.jpg",
    price: "117,000"
  },
]

export default function Likes() {
  return (
    <>
    <h2>관심상품</h2>
    {likesList.map((item)=> {
      return  (
      <div className='total'>
      <div className='Likes_box'>
        <div className='Likes_img'>
          <img 
          src={item.img_url}
          alt='여행 이미지'
          style={{width: "167px",
                  height: "110px"}}/>
        </div>
        <div className='Likes_content'>
          <div className='Likes_title'>
            {item.title}
          </div>
          <div className='Likes_subtitle'>
            {item.subTitle}
          </div>
          <div className='Likes_price_box'>
          <span className='Likes_start'>
            1인당 시작가
          </span>
          <span className='Likes_price'>
            {item.price}원 ~
          </span>
          </div>
        </div>
      </div>
      </div>
      );
    })}
    </>
  )
}
