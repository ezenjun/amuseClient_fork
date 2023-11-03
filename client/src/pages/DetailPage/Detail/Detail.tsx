import "./Detail.scss";
import Header from "../../../components/Header/Header";
import Side from "./Components/Side";
import Title from "./Components/Title";
import Picture from "./Components/Picture";
import ItemInfo from "./Components/ItemInfo";
import Footer from "../../../components/Footer/Footer";
import CourseIntro from "./Components/CourseIntro";
import Map from "./Components/Map";
import OtherInfo from "./Components/OtherInfo";
import Manager from "./Components/Manager";
import Review from "./Components/Review/Review";
import ReviewPicture from "./Components/ReviewPicture/ReviewPicture";
import Calendar from "./Components/Ticket/Calendar";
import ReservationBottom from "./Components/ReservationBottom/ReservationBottom";
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
