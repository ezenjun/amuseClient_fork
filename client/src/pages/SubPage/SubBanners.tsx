import React from "react";
import Style from "../MainPage/MainBanner/MainBanner.module.css";
import { SubBannersProps } from "../../interfaces/PropsInterfaces";

const BigBox = ({
  backgroundColor,
  content,
  bannerUrl,
  bannerLink,
}: {
  backgroundColor: string;
  content: string;
  bannerUrl: string;
  bannerLink: string;
}) => {
  const handleClick = () => {
    window.open(bannerLink, "_blank", "noopener"); // 새 탭으로 링크 열기
  };

  return (
    <div
      className={Style["bigbox"]}
      style={{
        backgroundColor,
        backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
        width: "100%",
        height: "400px",
        objectFit: "cover",
        objectPosition: "left",
      }}
      onClick={handleClick} // 클릭 시 handleClick 함수 실행
      onMouseEnter={(e) => {
        e.currentTarget.style.cursor = "pointer";
      }} // 마우스 올릴 때 포인터 모양 변경
      onMouseLeave={(e) => {
        e.currentTarget.style.cursor = "auto";
      }} // 마우스 내릴 때 포인터 모양 원래대로 변경
    >
      <h1
        style={{
          color: "white",
          marginLeft: "20px",
          marginTop: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {content}
      </h1>
    </div>
  );
};

function SubBanners({
  title,
  content,
  bannerUrl,
  bannerLink,
}: SubBannersProps) {
  return (
    <div style={{ minHeight: "500px" }}>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>{title}</h2>
      <div
        className={Style["container"]}
        style={{ width: "134%", position: "absolute", left: "-17%" }}
      >
        <BigBox
          backgroundColor="lightpink"
          content={content}
          bannerUrl={bannerUrl}
          bannerLink={bannerLink}
        />
      </div>
    </div>
  );
}

export default SubBanners;
