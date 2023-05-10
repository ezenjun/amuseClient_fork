import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Style from "./App.module.css";
import Home from "../src/Home";
import Concierge from "./SubPages/Concierge/Concierge";
import ChildCare from "./SubPages/ChildCare/ChildCare";
import SeniorCare from "./SubPages/SeniorCare/SeniorCare";
import OnlineTour from "./SubPages/OnlineTour/OnlineTour";
import MyPage from "./MyPages/MyPage";
import Login from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Detail from "./DetailPage/Detail/Detail";
import Review from './MyPages/Review/Review';
import ViewAll from "./SubPages/ViewAllPages/ViewAll";
import GyeonggiPage from "./SubPages/Regions/GyeonggiPage";
import GangwonPage from "./SubPages/Regions/GangwonPage";
// import NotFound from './NotFound';
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = "https://ammuse.shop/amusetest";

function App() {
  const [data, setData] = useState<Response | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        setData(responseData);
        console.log(data);
      } catch (error) {
        console.log("연결 실패");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /**
   * Current Item API
   */
  const [currentItemIds, setCurrentItemIds] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get("https://ammuse.store/main/current-item")
      .then((response) => {
        const currentItems = response.data.data.currentItems;
        const ids = currentItems.map((item: any) => item.item_db_id);
        setCurrentItemIds(ids);

        // console.log(response.data.data.currentItems)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, []);

  /**
   * Course API
   */
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get("https://ammuse.store/main/category")
      .then((response) => {
        const categories = response.data.data.categories;
        const ids = categories.map((category: any) => category.categoryId);
        setCategoryIds(ids);
        console.log(response.data.data.categories)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Concierge" element={<Concierge />}></Route>
        <Route path="/ChildCare" element={<ChildCare />}></Route>
        <Route path="/SeniorCare" element={<SeniorCare />}></Route>
        <Route path="/LogIn" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/MyPage/:category" element={<MyPage />}></Route>
        <Route path="/Review/:name" element={<Review />}></Route>
        <Route path="/OnlineTour" element={<OnlineTour />}></Route>
        <Route path="/ViewAll" element={<ViewAll />}></Route>
        <Route path="/toGyeonggi" element={<GyeonggiPage />}></Route>
        <Route path="/toGangwon" element={<GangwonPage />}></Route>

        {/**
         * 상세페이지 Route
         */}
         {currentItemIds.map((currentItemId) => (
            <Route 
              key={currentItemId}
              path={`/detail/${currentItemId}`} 
              element={<Detail itemId={currentItemId} />}
            />
         ))}
        
      </Routes>
    </div>
  );
}

export default App;
