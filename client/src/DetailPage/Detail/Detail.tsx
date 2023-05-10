import React, { useState } from 'react';
import './Detail.scss';
import Header from '../../Headers/Header';
import Reservation from './Component/Reservation/Reservation';
import Title from './Component/Title/Title';
import IconInfo from './Component/IconInfo/IconInfo';
import Picture from './Component/Picture/Picture';
import ProductIntro from './Component/ProductIntro/ProductIntro';
import Footer from '../../Footers/Footer';
import CourseIntro from './Component/CourseIntro/CourseIntro';
import Map from './Component/Map/Map';
import OtherInfo from './Component/OtherInfo/OtherInfo';
import Manager from './Component/Manager/Manager';
import Review from './Component/Review/Review';
import ReviewPicture from './Component/ReviewPicture/ReviewPicture';
import Calendar from './Component/TicketSelect/Calendar/Calendar';

type DetailProps = {
  itemId: number | null;
};

function Detail({ itemId }: DetailProps) {
  const [savedItemId, setSavedItemId] = useState(itemId);

  return (
    <div className="Detail">
        <>
          <div className="App">
            <Header />
          </div>
          <div className="liner"></div>
        </>
        <div className="page">
          <Reservation />
          <Title />
          <IconInfo />
          <Picture />
          <Calendar />
          <ProductIntro />
          <CourseIntro />
          <Map />
          <OtherInfo />
          <Manager />
          <ReviewPicture />
          <Review />
          <Footer />
        </div>
    </div>
  );
}

export default Detail;
