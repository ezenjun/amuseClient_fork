import React, { useState, useEffect } from "react";
// import Style from "./MainBanner.module.css";
import "./Swipestyle.css";
import DefaultImg from "./default.jpg";
import TestImg from "./test.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
// import "swiper/components";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

function MainBanner() {
  const [mainBannerImg, setMainBannerImg] = useState("");
  useEffect(() => {
    if (mainBannerImg === "") {
      setMainBannerImg(DefaultImg);
    }
  }, [mainBannerImg]);

  return (
    <div className="swiperCover" style={{border:"2px solid #f00"}}>
      <Swiper
        spaceBetween={0}
        effect="fade"
        slidesPerView={1}
        speed={1000}
        direction="horizontal"
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        loop={false}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 5000,
        }}
        autoHeight={true}
      >
        <SwiperSlide>
          <img src={mainBannerImg} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={TestImg} />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
}

export default MainBanner;
