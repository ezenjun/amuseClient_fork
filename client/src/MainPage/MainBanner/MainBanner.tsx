import React, { useState, useEffect } from "react";
import Style from "./MainBanner.module.css";
import DefaultImg from "./default.jpg";

const BigBox = ({ backgroundImg }: { backgroundImg: string }) => (
  <div className={Style["bigbox"]} style={{ backgroundImage: `url(${backgroundImg})` }}></div>
);

function MainBanner() {
  const [mainBannerImg, setMainBannerImg] = useState("");
  useEffect(() => {
    // 예를 들어 axios.get() 등을 사용하여 서버에서 이미지 URL을 가져와서 설정할 수 있습니다.
    // 만약 mainBannerImg 값을 설정하지 못하고 기본값인 ""로 남아 있다면 default 이미지를 사용합니다.
    if (mainBannerImg === "") {
      setMainBannerImg(DefaultImg);
    }
  }, [mainBannerImg]);
  return (
    <>
      {/* <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>전해드릴 소식이 있어요📢</h2> */}
      <div className={Style["container"]}>
        <BigBox backgroundImg={mainBannerImg} />
      </div>
    </>
  );
}

export default MainBanner;
