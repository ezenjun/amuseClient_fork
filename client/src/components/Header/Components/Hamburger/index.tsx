import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimage from "../../../../assets/Images/amuse_logo.png";
import SearchIcon from "../../Images/search.svg";
import HamburgerIcon from "../../Images/hamburger.svg";
import * as S from "./style";
import * as C from "./constants";
import Login from "../Login";
import Menu from "../Menu";

interface HamburgerProps {
  name: string | undefined;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cookies: any;
  setCookie: (
    name: "__jwtk__" | "__igjwtk__" | "__jwtkid__" | "__usrN__" | "accessToken",
    value: any,
    options?: object | undefined
  ) => void;
  removeCookie: (
    name: "__jwtk__" | "__igjwtk__" | "__jwtkid__" | "__usrN__" | "accessToken",
    options?: object | undefined
  ) => void;
}
function Hamburger({
  name,
  loggedIn,
  setLoggedIn,
  cookies,
  setCookie,
  removeCookie,
}: HamburgerProps) {
  const movePage = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const openSide = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSide = () => {
    setIsOpen(false);
    document.body.style.overflow = "hidden";
  };

  const navigateToHome = () => {
    movePage("/");
  };

  const navigateToSearch = () => {
    const encodedKeyword = encodeURIComponent(searchKeyword);
    movePage(`/search/${encodedKeyword}`);
    setSearchKeyword("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };

  return (
    <S.Hamburger>
      <S.Menu>
        <S.HamImage src={HamburgerIcon} alt="hamburger" onClick={openSide} />
        <S.Image
          src={logoimage}
          alt="Amuse Travel Logo"
          onClick={navigateToHome}
        />
        <S.Blank />
      </S.Menu>

      <S.Search>
        <S.Input
          type="text"
          placeholder={C.LOGO.SEARCH}
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <S.Button onClick={navigateToSearch}>
          <img src={SearchIcon} alt="Search Icon" />
        </S.Button>
      </S.Search>

      <S.Side className={isOpen ? "open" : ""}>
        <S.SideBack className={isOpen ? "open" : ""} onClick={closeSide} />
        <S.SideMenu className={isOpen ? "open" : ""}>
          <S.SideImage
            src={logoimage}
            alt="Amuse Travel Logo"
            onClick={navigateToHome}
          />
          <Login
            name={name}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            cookies={cookies}
            setCookie={setCookie}
            removeCookie={removeCookie}
          />
        </S.SideMenu>
      </S.Side>
    </S.Hamburger>
  );
}

export default Hamburger;
