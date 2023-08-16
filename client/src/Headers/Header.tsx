import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./Header.css";
import Style from "../App.module.css";
import { useNavigate } from "react-router-dom";
import logoimage from "../MainPage/MainImgs/amuse_logo.png";
import { isLoggedIn } from "../atoms";
import { useRecoilState } from "recoil";
import MyPageMenu from "../MyPages/MyPageMenu";
import axios from "axios";
import SearchIcon from "./search.png";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useCategoryContext } from "./Contexts/CategoryContext";
import { CategoryNameMenuProps } from "../Interfaces/PropsInterfaces";
import { useInfoContext } from "../DetailPage/Contexts/InfoContext";

interface MoreDropdownProps {
  // handleClick: () => void;
  // count: number;
}

function Header() {
  const movePage = useNavigate();
  const { name, setName } = useInfoContext();
  const { setCategoriesInfo } = useCategoryContext();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // const [manager, setManager] = useRecoilState(isManager);
  // const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtk__", "__igjwtk__", "__jwtkid__", "__usrN__"]);

  // const checkIsManager = (token: String) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const email = searchParams.get("email");

  //   axios
  //     .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/admin/search/users?email=${email}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.code == 1000) {
  //         setManager(true);
  //       }
  //     });
  // };

  const navigateToHome = () => {
    movePage("/");
  };
  const navigateToAboutAmuse = () => {
    movePage("/aboutAmuse");
  };

  const navigateToSubPageComp = (apiKey: number, cName: string) => {
    const apiKeyString: string = apiKey.toString();
    console.log(apiKey, "apiKey");
    if (cName === "home" || cName === "Home") {
      movePage("/");
    } else movePage(`/category/${apiKeyString}`);
  };

  const navigateToSearch = () => {
    movePage(`/search/${searchKeyword}`);
  };

  const navigateToLogIn = () => {
    movePage("/LogIn");
  };
  const navigateToSignUP = () => {
    movePage("/SignUP");
  };

  const CategoryMenu: React.FC<CategoryNameMenuProps> = ({ categoryName: categoryName, handleClick }) => (
    <div className={mobileHeader === 0 ? "menu-item" : "menu-item_mobile"} onClick={handleClick}>
      {categoryName}
    </div>
  );

  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);

  const MoreDropdown: React.FC<MoreDropdownProps> = () => (
    <div className="dropdown">
      {mobileHeader === 0 ? (
        categories.slice(4).map((categoryName: string, index: number) => (
          <div
            className="dropdown-item"
            key={index}
            onClick={() => navigateToSubPageComp(categoryIds[index + 4], categoryName)}
          >
            {categoryName}
          </div>
        ))
      ) : (
        <>
          {categories.slice(2).map((categoryName: string, index: number) => (
            <div
              className="dropdown-item"
              key={index}
              onClick={() => navigateToSubPageComp(categoryIds[index + 2], categoryName)}
            >
              {categoryName}
            </div>
          ))}
          {/* <div className="dropdown-item">회사 소개</div> */}
        </>
      )}
    </div>
  );

  // useEffect(() => {
  //   const token = cookies["__jwtkid__"];
  //   if (token) {
  //     checkIsManager(token);
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const categoryAll = response.data.data.categories;
        const categorySort: any | [] = _.sortBy(categoryAll, "sequence");
        const categoryNames = categorySort.map((id: any) => id.categoryName);
        setCategoriesInfo(categorySort);
        setCategories(categoryNames);
        const categoryId = categoryAll.map((id: any) => id.categoryId);
        setCategoryIds(categoryId);
      })
      .catch((error) => {
        console.log("해시태그 연결 실패");
      });
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };

  const [mobileHeader, setMobileHeader] = useState(0);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 700) {
      setMobileHeader(0);
    } else {
      setMobileHeader(1);
    }
  };
  useEffect(() => {
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  useEffect(() => {
    let getToken: string | null = cookies.__jwtkid__;
    console.log("getToken ",getToken)
    if(!cookies.__usrN__ || cookies.__usrN__ === "undefined"){
      removeCookie("__jwtkid__")
      setLoggedIn(false);
    }
    if(cookies.__usrN__ && (!cookies.__jwtkid__ || cookies.__jwtkid__ === "undefined")){
      removeCookie("__usrN__")
    }
    if (getToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);

  useEffect(() => {
    let locationString = window.location.toString();
    if (locationString.includes("http://localhost:3000/?access-token")) {
      let token: string | null = new URL(window.location.href).searchParams.get("access-token");
      if (token === null) {
        return;
      } else {
        const expires = moment().add("8", "h").toDate();
        setCookie("__jwtkid__", token, { expires });
        setLoggedIn(true);
        getUserInfoAsToken(token);
        // movePage("/");
      }
    } else if (locationString.includes("amusetravel.wheelgo.net/")) {
      let token: string | null = cookies.__jwtk__;
      let igToken: string | null = cookies.__igjwtk__;
      if (token === null) {
        return;
      } else if (igToken && igToken?.length > 0 && token === igToken) {
        return;
      } else {
        // localStorage.setItem("loginToken", token);
        const expires = moment().add("8", "h").toDate();
        setCookie("__jwtkid__", token, { expires });
        setLoggedIn(true);
        getUserInfoAsToken(token);
      }
    }
  }, []);

  const getUserInfoAsToken = async (token: string) => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/login/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        // setUserData(response.data.data);
        let userData = response.data.data;
        setName(response.data.data?.name);
        const expires = moment().add("8", "h").toDate();
        setCookie("__usrN__", response.data.data?.name, { expires });
        if (!userData?.advertisementTrue) {
          setLoggedIn(false);
          // setManager(false);
          movePage("/LoginAgree");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    let token = cookies.__jwtkid__;
    setLoggedIn(false);
    // setManager(false);
    const expires = moment().add("1", "m").toDate();
    setCookie("__igjwtk__", token, { expires });
    removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
    removeCookie("__usrN__", { path: "/", maxAge: 0 });
    navigateToHome();
  };
  // if(!name){
  //   setName(cookies.__usrN__)
  // }
  return (
    <div>
      <div className={Style["App"]}>
        {/* 모바일 버전 */}
        <div className={`${mobileHeader === 1 ? "mobile-header" : ""}`}>
          {mobileHeader === 1 && (
            <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
              <div className="btnBox_mobile">
                {loggedIn ? <div>{name || cookies.__usrN__} 님 😊</div> : ""}
                {loggedIn ? (
                  <button className="loginBtn" onClick={handleLogout}>
                    로그아웃
                  </button>
                ) : (
                  <button className="loginBtn" onClick={navigateToLogIn}>
                    로그인
                  </button>
                )}
                {loggedIn ? (
                  <MyPageMenu />
                ) : (
                  <button className="signInBtn" onClick={navigateToSignUP}>
                    회원가입
                  </button>
                )}
                {/* {loggedIn && manager ? (
                  <a className="adminBtn" href={`http://myadmin.wheelgo.net/login`} target="_blank" rel="noreferrer">
                    어드민
                  </a>
                ) : (
                  <div></div>
                )} */}
              </div>
              <div className="logo_container">
                <img className="logo_mobile" src={logoimage} alt="Amuse Travel Logo" onClick={navigateToHome} />
              </div>

              <div className="search-box-mobile">
                <input
                  type="text"
                  placeholder="여행 키워드를 검색해보세요!"
                  value={searchKeyword}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <button className="searchBtn" onClick={navigateToSearch}>
                  <img src={SearchIcon} alt="searchIcon"></img>
                </button>
              </div>
              <div className="menu">
                {categories.length <= 2 ? (
                  categories.map((categoryName: string, index: number) => (
                    <CategoryMenu
                      key={index}
                      categoryName={categoryName}
                      handleClick={() => navigateToSubPageComp(categoryIds[index], categoryName)}
                    />
                  ))
                ) : (
                  <>
                    {categories.slice(0, 2).map((categoryName: string, index: number) => (
                      <CategoryMenu
                        key={index}
                        categoryName={categoryName}
                        handleClick={() => navigateToSubPageComp(categoryIds[index], categoryName)}
                      />
                    ))}
                    <div className="menu-item_mobile more-dropdown">
                      더보기 ▼
                      <MoreDropdown />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {/* pc 버전 */}
          {mobileHeader === 0 && (
            <div>
              <div className="btnBox">
                {loggedIn ? <div className="userName">{name || cookies.__usrN__} 님 😊</div> : ""}
                {loggedIn ? (
                  <button className="loginBtn" onClick={handleLogout}>
                    로그아웃
                  </button>
                ) : (
                  <button className="loginBtn" onClick={navigateToLogIn}>
                    로그인
                  </button>
                )}
                {loggedIn ? (
                  <div>
                    <MyPageMenu />
                    {/* <a
                      className="adminBtn"
                      href={`http://13.125.82.58/manager?token=${token}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      어드민
                    </a> */}
                  </div>
                ) : (
                  <button className="signInBtn" onClick={navigateToSignUP}>
                    회원가입
                  </button>
                )}
                {/* {loggedIn && manager ? (
                  <a className="adminBtn" href={`http://myadmin.wheelgo.net/login`} target="_blank" rel="noreferrer">
                    어드민
                  </a>
                ) : (
                  <div></div>
                )} */}
              </div>
              <div className="top">
                <img className="logo" src={logoimage} alt="Amuse Travel Logo" onClick={navigateToHome} />
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="여행 키워드를 검색해보세요!"
                    value={searchKeyword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />
                  <button className="searchBtn" onClick={navigateToSearch}>
                    <img src={SearchIcon} alt="searchIcon"></img>
                  </button>
                </div>
              </div>
              <div className="menu">
                {categories.length <= 4 ? (
                  categories.map((categoryName: string, index: number) => (
                    <CategoryMenu
                      key={index}
                      categoryName={categoryName}
                      handleClick={() => navigateToSubPageComp(categoryIds[index], categoryName)}
                    />
                  ))
                ) : (
                  <>
                    {categories.slice(0, 4).map((categoryName: string, index: number) => (
                      <CategoryMenu
                        key={index}
                        categoryName={categoryName}
                        handleClick={() => navigateToSubPageComp(categoryIds[index], categoryName)}
                      />
                    ))}
                    <div className="menu-item more-dropdown">
                      더보기 ▼
                      <MoreDropdown />
                    </div>
                  </>
                )}
                {/* <div className="menu-item" onClick={navigateToAboutAmuse}>
                  회사 소개
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={Style["liner"]}></div>
    </div>
  );
}

export default Header;
