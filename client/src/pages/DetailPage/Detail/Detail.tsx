import "./Detail.scss";
import Header from "../../../components/Header/Header";
import Side from "./Component/Side";
import Title from "./Component/Title";
import Picture from "./Component/Picture";
import ItemInfo from "./Component/ItemInfo";
import Footer from "../../../components/Footer/Footer";
import CourseIntro from "./Component/CourseIntro";
import Map from "./Component/Map";
import OtherInfo from "./Component/OtherInfo";
import Manager from "./Component/Manager";
import Review from "./Component/Review/Review";
import ReviewPicture from "./Component/ReviewPicture/ReviewPicture";
import Calendar from "./Component/Ticket/Calendar";
import ReservationBottom from "./Component/ReservationBottom/ReservationBottom";
import { DetailProps } from "../../../Interfaces/PropsInterfaces";
import MainComponent from "../../../MainComponent";
import * as S from "./style";

function Detail({ itemId, productCode, startPrice, likeNum }: DetailProps) {
  return (
    <MainComponent>
      <S.Detail>
        <div className="page">
          {/* 상세페이지 컨텐츠 */}
          <S.Content>
            <Title itemId={itemId} />
            <Picture itemId={itemId} />
            <Calendar itemId={itemId} numberOfmonth={2} />
            <ItemInfo itemId={itemId} />
            <CourseIntro itemId={itemId} />
            <Map itemId={itemId} />
            <OtherInfo itemId={itemId} />
            <Manager itemId={itemId} />
            <ReviewPicture itemId={itemId} />
            <Review itemId={itemId} />
            {/* <Footer /> 상세페이지 푸터 */}
          </S.Content>
          {/* 상세페이지 사이드 바 */}
          <div className="side">
            <Side itemId={itemId} productCode={productCode} likeNum={likeNum} />
          </div>
          {/* 상세페이지 모바일 티켓선택 */}
          <div className="bottom-btn">
            <ReservationBottom itemId={itemId} />
          </div>
        </div>
      </S.Detail>
    </MainComponent>
  );
}

export default Detail;
