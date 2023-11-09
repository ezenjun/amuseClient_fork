import * as S from "./style";

export interface BannerProps {
  title: string;
  content: string;
  bannerUrl: string;
  bannerLink: string;
}

function Banner({ title, content, bannerUrl, bannerLink }: BannerProps) {
  const handleClick = () => window.open(bannerLink, "_blank", "noopener");

  return (
    <S.Banner>
      <S.Image src={bannerUrl} onClick={handleClick} />
    </S.Banner>
  );
}

export default Banner;
