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
// import NotFound from './NotFound';

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
