import React, { useEffect, useState } from "react";
import "./Header.css";
import Style from "../App.module.css";
import { useNavigate } from "react-router-dom";
import logoimage from "../MainPage/MainImgs/amuse_logo.png";
import { Link } from "react-router-dom";
import MyPagelist from "../MyPages/MyPageList";
import { isLoggedIn, isManager } from "../atoms";
import { useRecoilState } from "recoil";
import MyPageMenu from "../MyPages/MyPageMenu";
import axios from "axios";
import SearchIcon from "./search.png";

interface CategoryMenuProps {
  categoryName: string;
  handleClick: () => void;
}

interface MoreDropdownProps {
  // handleClick: () => void;
  // count: number;
}

function Header() {
  const movePage = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [manager, setManager] = useRecoilState(isManager);
  const [token, setToken] = useState("");

  const navigateToHome = () => {
    movePage("/");
  };
  const navigateToAboutAmuse = () => {
    movePage("/aboutAmuse");
  };

  const navigateToSubPageComp = (apiKey: number) => {
    const apiKeyString: string = apiKey.toString();
    movePage(`/category/${apiKeyString}`);
  };

  const navigateToSearch = () => {
    movePage(`/search/${searchKeyword}`);
    window.location.reload();
  };

  // const handleSearch = () => {
  //   console.log(searchKeyword);
  // };

  const navigateToLogIn = () => {
    movePage("/LogIn");
  };
  const navigateToSignUP = () => {
    movePage("/SignUP");
  };

  const CategoryMenu: React.FC<CategoryMenuProps> = ({ categoryName: categoryName, handleClick }) => (
    <div className={mobileHeader === 0 ? "menu-item" : "menu-item_mobile"} onClick={handleClick}>
      {categoryName}
    </div>
  );

  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const MoreDropdown: React.FC<MoreDropdownProps> = () => (
    <div className="dropdown">
      {mobileHeader === 0 ? (
        categories.slice(4).map((categoryName: string, index: number) => (
          <div className="dropdown-item" key={index} onClick={() => navigateToSubPageComp(index + 4)}>
            {categoryName}
          </div>
        ))
      ) : (
        <>
          {categories.slice(2).map((categoryName: string, index: number) => (
            <div className="dropdown-item" key={index} onClick={() => navigateToSubPageComp(index + 2)}>
              {categoryName}
            </div>
          ))}
          <div className="dropdown-item">회사 소개</div>
        </>
      )}
    </div>
  );

  useEffect(() => {
    axios
      .get("https://vikrant.store/main/category")
      .then((response) => {
        const categoryAll = response.data.data.categories;
        const categoryNames = categoryAll.map((id: any) => id.categoryName);
        setCategories(categoryNames);
        const categoryId = categoryAll.map((id: any) => id.categoryId);
        setCategoryIds(categoryId);
        console.log(response.data.data);
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
    let getToken: string | null = new URL(window.location.href).searchParams.get("token");
    if (getToken) {
      setToken(getToken);
    }
    console.log("hghjvhvhgv", loggedIn);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setManager(false);
    localStorage.removeItem("loginToken");
    navigateToHome();
  };

  return (
    <div>
      <div className={Style["App"]}>
        {/* 모바일 버전 */}
        <div className={`${mobileHeader === 1 ? "mobile-header" : ""}`}>
          {mobileHeader === 1 && (
            <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
              <div className="btnBox_mobile">
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
                {loggedIn && manager ? (
                  <a className="adminBtn" href={`http://myadmin.wheelgo.net/login`} target="_blank" rel="noreferrer">
                    어드민
                  </a>
                ) : (
                  <div></div>
                )}
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
                      handleClick={() => navigateToSubPageComp(categoryIds[index])}
                    />
                  ))
                ) : (
                  <>
                    {categories.slice(0, 2).map((id: string, index: number) => (
                      <CategoryMenu
                        key={id}
                        categoryName={id}
                        handleClick={() => navigateToSubPageComp(categoryIds[index])}
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
                {loggedIn && manager ? (
                  <a className="adminBtn" href={`http://myadmin.wheelgo.net/login`} target="_blank" rel="noreferrer">
                    어드민
                  </a>
                ) : (
                  <div></div>
                )}
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
                      handleClick={() => navigateToSubPageComp(categoryIds[index])}
                    />
                  ))
                ) : (
                  <>
                    {categories.slice(0, 4).map((id: string, index: number) => (
                      <CategoryMenu key={id} categoryName={id} handleClick={() => navigateToSubPageComp(index)} />
                    ))}
                    <div className="menu-item more-dropdown">
                      더보기 ▼
                      <MoreDropdown />
                    </div>
                  </>
                )}
                <div className="menu-item" onClick={navigateToAboutAmuse}>
                  회사 소개
                </div>
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
