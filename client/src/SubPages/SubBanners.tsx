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
    }}
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
        <BigBox backgroundColor="lightgray" content={content} bannerUrl={bannerUrl} />
      </div>
    </>
  );
}

export default SubBanners;
