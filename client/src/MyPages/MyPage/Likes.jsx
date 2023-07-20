import React, { useEffect, useState } from "react";
import "./Likes.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Likes() {
  const [likesList, setLikesList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const config = {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-Type": "application/json",
      },
    };
    axios.get("https://vikrant.store/my-page/like", config).then((res) => {
      console.log(res);
      setLikesList(res.data.likeItems);
    });
  });

  const navToItemDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <>
      <h2>관심상품</h2>
      {likesList &&
        likesList.map((item) => {
          return (
            <div className="total" onClick={() => navToItemDetail(item.item_db_id)}>
              <div className="Likes_box">
                <div className="Likes_img">
                  <img src={item.imageUrl} alt="여행 이미지" style={{ width: "167px", height: "110px" }} />
                </div>
                <div className="Likes_content">
                  <div className="Likes_title">{item.title}</div>
                  <div className="Likes_subtitle">
                    {item.country} {item.city}
                  </div>
                  <div className="Likes_price_box">
                    <span className="Likes_start">1인당 시작가</span>
                    <span className="Likes_price">{item.startPrice}원 ~</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
