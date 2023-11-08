import { DetailProps } from "../../../Interfaces/PropsInterfaces";
import Side from "./Components/Side";
import ReservationBottom from "./Components/ReservationBottom/ReservationBottom";
import Title from "./Components/Title";
import Picture from "./Components/Picture";
import Calendar from "./Components/Ticket/Calendar";
import ItemInfo from "./Components/ItemInfo";
import CourseIntro from "./Components/CourseIntro";
import Map from "./Components/Map";
import OtherInfo from "./Components/OtherInfo";
import Manager from "./Components/Manager";
import Review from "./Components/Review";
import ReviewPicture from "./Components/ReviewPicture";
import MainComponent from "../../../MainComponent";
import * as S from "./style";

function Detail({ itemId, productCode, startPrice, likeNum }: DetailProps) {
  return (
    <MainComponent>
      <S.Detail>
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
        </S.Content>
        <S.Side>
          <Side itemId={itemId} productCode={productCode} likeNum={likeNum} />
        </S.Side>
        {/* <ReservationBottom itemId={itemId} /> */}
      </S.Detail>
    </MainComponent>
  );
}

export default Detail;
