import { Routes, Route, Router } from "react-router-dom";
import { redirect } from "react-router-dom";
import Home from "../src/Home";
import SubPageComp from "./SubPages/SubPageComp";
import MyPage from "./MyPages/MyPage";
import Login from "./LogIn/LogIn";
import LoginAgree from "./LogIn/LoginAgree";
import SignUp from "./SignUp/SignUp";
import Detail from "./DetailPage/Detail/Detail";
import Review from "./MyPages/Review/Review";
import ViewAll from "./SubPages/ViewAllPages/ViewAll";
import SearchPageComp from "./SubPages/SearchPageComp";
// import NotFound from './NotFound';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Headers/Header";
import Footer from "./Footers/Footer";
import AboutAmuse from "./SubPages/AboutAmuse/AboutAmuse";
import { OrderPage } from "./DetailPage/OrderPage";
import { OrderContextProvider } from "./DetailPage/Contexts/OrderContext"; 
import { CategoryContextProvider } from "./Headers/Contexts/CategoryContext";

function App() {
  /**
   * Current Item API
   */
  const [currentItemIds, setCurrentItemIds] = useState<number[]>([]);
  const [currentItemProductCodes, setCurrentItemProductCodes] = useState<number[]>([]);
  const [currentItemStartPrices, setCurrentItemStartPrices] = useState<number[]>([]);
  const [currentItemLikeNums, setCurrentItemLikeNums] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/item/search?page=1`)
      .then((response) => {
        const items = response.data.data.items;
        const ids = items.map((item: any) => item.item_db_id);
        const codes = items.map((item: any) => item.product_code);
        const prices = items.map((item: any) => item.startPrice);
        const likeNums = items.map((item: any) => item.likeNum);

        setCurrentItemIds(ids);
        setCurrentItemProductCodes(codes);
        setCurrentItemStartPrices(prices);
        setCurrentItemLikeNums(likeNums);

        //console.log(response.data.data.items[0])
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, []);

  /**
   * Course API
   */
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const categories = response.data.data.categories;
        const ids = categories.map((category: any) => category.categoryId);
        setCategoryIds(ids);
        //console.log(response.data.data.categories);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, []);

  return (
    <OrderContextProvider>
      <CategoryContextProvider>
      <div style={{fontFamily:"Pretendard-Regular"}}>
        
        <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route path="/Concierge" element={<Concierge />}></Route>
          <Route path="/ChildCare" element={<ChildCare />}></Route>
          <Route path="/SeniorCare" element={<SeniorCare />}></Route> */}
          <Route path="/LogIn" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/MyPage/:category" element={<MyPage />}></Route>
          <Route path="/Review/:id" element={<Review />}></Route>
          {/* <Route path="/OnlineTour" element={<OnlineTour />}></Route> */}
          <Route path="/ViewAll" element={<ViewAll />}></Route>
          <Route path="/Subtest" element={<SubPageComp />}></Route>
          <Route path="/aboutAmuse" element={<AboutAmuse />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/LogInAgree" element={<LoginAgree />}></Route>

          {/**
           * 상세페이지 Route
           */}
          {currentItemIds.map((currentItemId, index) => (
            <Route
              key={currentItemId}
              path={`/detail/${currentItemId}`}
              element={
                <Detail
                  itemId={currentItemId}
                  productCode={currentItemProductCodes[index]}
                  startPrice={currentItemStartPrices[index]}
                  likeNum={currentItemLikeNums[index]}
                />
              }
            />
          ))}
          {/**
           * 서브페이지 Route
           */}
          <Route path="/category/:apiKey" element={<SubPageComp />} />
          {/**
           * 검색 시 Route
           */}
          <Route path="/search/:apiKey" element={<SearchPageComp />} />
        </Routes>
      </div>
      </CategoryContextProvider>
    </OrderContextProvider>
  );
}

export default App;
