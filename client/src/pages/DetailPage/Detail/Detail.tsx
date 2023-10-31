import "./Detail.scss";
import Header from "../../../components/Headers/Header";
import Reservation from "./Component/Reservation";
import Title from "./Component/Title";
import Picture from "./Component/Picture/Picture";
import ProductIntro from "./Component/ProductIntro/ProductIntro";
import Footer from "../../../components/Footers/Footer";
import CourseIntro from "./Component/CourseIntro/CourseIntro";
import Map from "./Component/Map/Map";
import OtherInfo from "./Component/OtherInfo/OtherInfo";
import Manager from "./Component/Manager/Manager";
import Review from "./Component/Review/Review";
import ReviewPicture from "./Component/ReviewPicture/ReviewPicture";
import Calendar from "./Component/TicketSelect/Calendar";
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
            <ProductIntro itemId={itemId} />
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
            <Reservation
              itemId={itemId}
              productCode={productCode}
              likeNum={likeNum}
            />
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
