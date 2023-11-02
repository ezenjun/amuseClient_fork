import { CategoryData } from "../../Interfaces/DataInterfaces";
import Style from "../../pages/SubPage/SubPage.module.css";
import ChildTitle from "../../pages/SubPage/SubtitleImgs/ChildTitle.jpg";
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
      <div className={Style["subTitleContainer"]}>
        <S.Image
          className={Style["mainPicture.image"]}
          src={categoryData.categoryImg ? categoryData.categoryImg : ChildTitle}
          alt="Title img"
        />
        <h2 className={Style["subTitle"]}>{categoryData.mainDescription}</h2>
        <h3 className={Style["subContent"]}>{categoryData.subDescription}</h3>
      </div>
    )
  );
}

export default MainBanner;
