import React, { useEffect, useState } from "react";
import * as S from "./style";

export interface BannerProps {
  title: string;
  content: string;
  pcBannerUrl: string;
  pcBannerLink: string;
  mobileBannerUrl: string;
  mobileBannerLink: string;
}

function Banner({
  title,
  content,
  pcBannerUrl,
  pcBannerLink,
  mobileBannerUrl,
  mobileBannerLink,
}: BannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string>(
    window.innerWidth >= 768 ? pcBannerUrl : mobileBannerUrl
  );
  const [bannerLink, setBannerLink] = useState<string>(
    window.innerWidth >= 768 ? pcBannerLink : mobileBannerLink
  );

  const handleClick = () => window.open(bannerLink, "_blank", "noopener");

  useEffect(() => {
    const handleResize = () => {
      setBannerUrl(window.innerWidth >= 768 ? pcBannerUrl : mobileBannerUrl);
      setBannerLink(window.innerWidth >= 768 ? pcBannerLink : mobileBannerLink);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pcBannerUrl, pcBannerLink, mobileBannerUrl, mobileBannerLink]);

  return (
    <S.Banner>
      <S.Image src={bannerUrl} onClick={handleClick} />
    </S.Banner>
  );
}

export default Banner;
