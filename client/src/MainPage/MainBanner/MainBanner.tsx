import React, { useState, useEffect } from "react";
import Style from "./MainBanner.module.css";
import "./swiperStyle.css";
import DefaultImg from "./default.jpg";
import TestImg from "./test.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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
    <>
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
          delay: 6000,
        }}
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
    </>
  );
}

export default MainBanner;
