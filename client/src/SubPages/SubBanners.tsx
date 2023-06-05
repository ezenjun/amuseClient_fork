import React, { ReactNode } from "react";
import Style from "../MainPage/MainBanner/MainBanner.module.css";

interface SubBannersProps {
  title: string;
  content: string;
  bannerUrl: string;
}

const BigBox = ({
  backgroundColor,
  content,
  bannerUrl,
}: {
  backgroundColor: string;
  content: string;
  bannerUrl: string;
}) => (
  <div
    className={Style["bigbox"]}
    style={{
      backgroundColor,
      backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
    }} // url 있을때는 이미지로, 없으면 기본 배경
  >
    <h3 style={{ marginLeft: "1rem" }}>{content}</h3>
  </div>
);

function SubBanners({ title, content, bannerUrl }: SubBannersProps) {
  console.log(title);
  return (
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>{title}</h2>
      <div className={Style["container"]}>
        <BigBox backgroundColor="lightpink" content={content} bannerUrl={bannerUrl} />
      </div>
    </>
  );
}

export default SubBanners;
