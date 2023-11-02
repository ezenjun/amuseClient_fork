import _ from "lodash";
import { Routes, Route } from "react-router-dom";
import Home from "../src/Home";
import SubPageComp from "./pages/SubPage/SubPageComp";
import MyPage from "./pages/MyPage/MyPage";
import Login from "./pages/LogInPage/LogIn";
import FindId from "./pages/LogInPage/FindId";
import FindPw from "./pages/LogInPage/FindPw";
import LoginAgree from "./pages/LogInPage/LoginAgree";
import SignUp from "./pages/SignUpPage/SignUp";
import SignUpAmuse from "./pages/SignUpPage/SignUpAmuse";
import Detail from "./pages/DetailPage/Detail/Detail";
import Review from "./pages/MyPage/Review/Review";
import ViewAll from "./pages/SubPage/ViewAllPages/ViewAll";
import SearchPageComp from "./pages/SubPage/SearchPageComp";
// import NotFound from './NotFound';
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderPage } from "./pages/DetailPage/OrderPage";
import { OrderContextProvider } from "./pages/DetailPage/Contexts/OrderContext";
import { CategoryContextProvider } from "./components/Header/Contexts/CategoryContext";
import { InfoContextProvider } from "./pages/DetailPage/Contexts/InfoContext";
import OrderCompletePage from "./pages/DetailPage/OrderCompletePage/OrderCompletePage";
import PaymentDetailPage from "./pages/DetailPage/PaymentDetailPage/PaymentDetailPage";

function App() {
  const [cookies, setCookie, deleteCookie] = useCookies(["__jwtkid__"]);
  /**
   * Current Item API
   */
  const [currentItemIds, setCurrentItemIds] = useState<number[]>([]);
  const [currentItemProductCodes, setCurrentItemProductCodes] = useState<
    number[]
  >([]);
  const [currentItemStartPrices, setCurrentItemStartPrices] = useState<
    number[]
  >([]);
  const [currentItemLikeNums, setCurrentItemLikeNums] = useState<number[]>([]);
  const [activePageCount, setActivePageCount] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/item/all/display`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${cookies.__jwtkid__}`,
        },
      })
      .then((response) => {
        const items = response.data.data.items;
        const ids = items.map((item: any) => item.item_db_id);
        const codes = items.map((item: any) => item.product_code);
        const prices = items.map((item: any) => item.startPrice);
        const likeNums = items.map((item: any) => item.likeNum);

        // console.log( _.uniq([...currentItemIds,...ids]))
        setCurrentItemIds(_.uniq([...currentItemIds, ...ids]));
        setCurrentItemProductCodes(
          _.uniq([...currentItemProductCodes, ...codes])
        );
        setCurrentItemStartPrices(_.uniq([currentItemStartPrices, ...prices]));
        setCurrentItemLikeNums(_.uniq([...currentItemLikeNums, ...likeNums]));
      })
      .catch((error) => {
        console.log("연결 실패", error);
      });
  }, [activePageCount]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_AMUSE_API}/test/api/product/getList/byDisplay`, {
  //       params: {
  //         limit: 8,
  //         page: activePageCount,
  //         displayStatus: "DISPLAY",
  //       },
  //     })
  //     .then((res) => {
  //       let pageCount = res.data.data.pageCount
  //       for(let i = activePageCount; i< pageCount+1; i++){
  //         setActivePageCount(pageCount)
  //       }
  //     });
  // }, []);

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
        <InfoContextProvider>
          {/* <div style={{ fontFamily: "Pretendard" }}> */}
          <Routes>
            <Route path="/" element={<Home />} />

            {/* <Route path="/Concierge" element={<Concierge />}></Route>
          <Route path="/ChildCare" element={<ChildCare />}></Route>
          <Route path="/SeniorCare" element={<SeniorCare />}></Route> */}

            <Route path="/LogIn" element={<Login />}></Route>
            <Route path="/LogIn/FindId" element={<FindId />}></Route>
            <Route path="/LogIn/FindPw" element={<FindPw />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/SignUpAmuse" element={<SignUpAmuse />}></Route>
            <Route path="/MyPage" element={<MyPage />}>
              <Route path="settings" element={<MyPage />} />
              <Route path="like" element={<MyPage />} />
              <Route path="payment" element={<MyPage />} />
            </Route>
            <Route path="/Review/:id" element={<Review />}></Route>
            {/* <Route path="/OnlineTour" element={<OnlineTour />}></Route> */}
            <Route path="/ViewAll" element={<ViewAll />}></Route>
            <Route path="/Subtest" element={<SubPageComp />}></Route>
            <Route path="/order" element={<OrderPage />}></Route>
            <Route
              path="/order/complete"
              element={<OrderCompletePage />}
            ></Route>
            <Route
              path="/payment/:paymentId"
              element={<PaymentDetailPage />}
            ></Route>
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
          {/* </div> */}
        </InfoContextProvider>
      </CategoryContextProvider>
    </OrderContextProvider>
  );
}

export default App;
