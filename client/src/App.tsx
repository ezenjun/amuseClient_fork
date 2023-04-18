import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../src/Home";
import Concierge from "./SubPages/Concierge/Concierge";
import ChildCare from "./SubPages/ChildCare/ChildCare";
import SeniorCare from "./SubPages/SeniorCare/SeniorCare";
import OnlineTour from "./SubPages/OnlineTour/OnlineTour";
<<<<<<< HEAD
import MyPagelist from './MyPages/MyPageList';
import MyPage from './MyPages/MyPage';
import Header from './Headers/Header';
import Login from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
=======
import Detail from "./DetailPage/Detail/Detail";
>>>>>>> 85eb1db72722275dae0d2e8a04ecd2b4b26c3008
// import NotFound from './NotFound';

function App() {
  return (
    <div>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Concierge" element={<Concierge />}></Route>
        <Route path="/ChildCare" element={<ChildCare />}></Route>
        <Route path="/SeniorCare" element={<SeniorCare />}></Route>
<<<<<<< HEAD
        <Route path="/LogIn" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        {/* 마이페이지 */}
        <Route path="/MyPage/:category" element={<MyPage />}></Route>
=======
        <Route path="/OnlineTour" element={<OnlineTour />}></Route>
        <Route path="/Detail" element={<Detail />}></Route>
>>>>>>> 85eb1db72722275dae0d2e8a04ecd2b4b26c3008
      </Routes>
    </div>
  );
}

export default App;
