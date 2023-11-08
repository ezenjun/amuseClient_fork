import { CategoryData } from "../../Interfaces/DataInterfaces";
import Banner from "./Images/banner.jpg";
import * as S from "./style";

interface MainBannerProps {
  categoryData: CategoryData | null;
  categoryImg: string | undefined;
  mainDescription: string | undefined;
  subDescription: string | undefined;
}

function MainBanner(categoryData: MainBannerProps) {
  return (
    categoryData && (
      <S.Image
        src={categoryData.categoryImg ? categoryData.categoryImg : Banner}
        alt="Main Banner"
      />
    )
  );
}

export default MainBanner;
