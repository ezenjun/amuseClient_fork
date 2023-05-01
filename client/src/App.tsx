import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../src/Home";
import Concierge from "./SubPages/Concierge/Concierge";
import ChildCare from "./SubPages/ChildCare/ChildCare";
import SeniorCare from "./SubPages/SeniorCare/SeniorCare";
import OnlineTour from "./SubPages/OnlineTour/OnlineTour";
import MyPage from "./MyPages/MyPage";
import Login from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Detail from "./DetailPage/Detail/Detail";
import ViewAll from "./SubPages/ViewAllPages/ViewAll";
import GyeonggiPage from "./SubPages/Regions/GyeonggiPage";
import GangwonPage from "./SubPages/Regions/GangwonPage";
// import NotFound from './NotFound';
import { useEffect, useState } from "react";

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
        console.log("오류 발생");
        console.error(error);
      }
    };

    fetchData();
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
        <Route path="/OnlineTour" element={<OnlineTour />}></Route>
        <Route path="/Detail" element={<Detail />}></Route>
        <Route path="/ViewAll" element={<ViewAll />}></Route>
        <Route path="/toGyeonggi" element={<GyeonggiPage />}></Route>
        <Route path="/toGangwon" element={<GangwonPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
