import React, { useEffect, useState } from "react";
import "./Header.css";
import Style from "../App.module.css";
import { useNavigate } from "react-router-dom";
import logoimage from "../MainPage/MainImgs/amuse_logo.png";
import { Link } from "react-router-dom";
import MyPagelist from "../MyPages/MyPageList";
import { isLoggedIn } from "../atoms";
import { useRecoilState } from "recoil";
import MyPageMenu from "../MyPages/MyPageMenu";
import axios from "axios";

interface CategoryMenuProps {
  hashtagName: string;
  handleClick: () => void;
}

interface MoreDropdownProps {
  // handleClick: () => void;
  // count: number;
}

function Header() {
  const movePage = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

  const navigateToHome = () => {
    movePage("/");
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

  const searchKeywordStyle = {
    border: "none",
    padding: "14px",
    marginRight: "10px",
    width: "250px",
    backgroundColor: "rgb(235, 235, 235)",
  };

  const CategoryMenu: React.FC<CategoryMenuProps> = ({ hashtagName, handleClick }) => (
    <div className={mobileHeader === 0 ? "menu-item" : "menu-item_mobile"} onClick={handleClick}>
      {hashtagName}
    </div>
  );

  const [hashtag, setHashtag] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const MoreDropdown: React.FC<MoreDropdownProps> = () => (
    <div className="dropdown">
      {mobileHeader === 0
        ? hashtag.slice(4).map((hashtagName: string, index: number) => (
            <div className="dropdown-item" key={index} onClick={() => navigateToSubPageComp(index + 4)}>
              {hashtagName}
            </div>
          ))
        : hashtag.slice(2).map((hashtagName: string, index: number) => (
            <div className="dropdown-item" key={index} onClick={() => navigateToSubPageComp(index + 2)}>
              {hashtagName}
            </div>
          ))}
    </div>
  );

  useEffect(() => {
    axios
      .get("https://ammuse.store/main/category")
      .then((response) => {
        const hashtagAll = response.data.data.categories;
        const categoryNames = hashtagAll.map((id: any) => id.categoryName);
        setHashtag(categoryNames);
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

  return (
    <div>
      <div className={Style["App"]}>
        <div className={`${mobileHeader === 1 ? "mobile-header" : ""}`}>
          {mobileHeader === 1 && (
            <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
              <div className="logo_container">
                <img className="logo_mobile" src={logoimage} alt="Amuse Travel Logo" onClick={navigateToHome} />

                <div className="whiteSquare"></div>
                {loggedIn ? (
                  <button
                    className="loginBtn"
                    onClick={() => {
                      setLoggedIn(false);
                      localStorage.removeItem("dev_access_token");
                      localStorage.removeItem("dev_refresh_token");
                      navigateToHome();
                    }}
                  >
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
              </div>

              <div className="search-box">
                <input
                  style={searchKeywordStyle}
                  type="text"
                  placeholder="🔍 여행 키워드를 검색해보세요!"
                  value={searchKeyword}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <button className="searchBtn" onClick={navigateToSearch}>
                  검색
                </button>
              </div>
              <div className="menu">
                {hashtag.length <= 2 ? (
                  hashtag.map((hashtagName: string, index: number) => (
                    <CategoryMenu
                      key={index}
                      hashtagName={hashtagName}
                      handleClick={() => navigateToSubPageComp(index)}
                    />
                    // <CategoryMenu key={index} hashtagName={hashtagName} handleClick={navigateToSubPageComp} />
                  ))
                ) : (
                  <>
                    {hashtag.slice(0, 2).map((id: string, index: number) => (
                      <CategoryMenu key={id} hashtagName={id} handleClick={() => navigateToSubPageComp(index)} />
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
          {mobileHeader === 0 && (
            <div>
              <div className="top">
                <img className="logo" src={logoimage} alt="Amuse Travel Logo" onClick={navigateToHome} />
                <div className="search-box">
                  <input
                    style={searchKeywordStyle}
                    type="text"
                    placeholder="🔍 여행 키워드를 검색해보세요!"
                    value={searchKeyword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />
                  <button className="searchBtn" onClick={navigateToSearch}>
                    검색
                  </button>
                </div>
                <div className="whiteSquare"></div>
                {loggedIn ? (
                  <button
                    className="loginBtn"
                    onClick={() => {
                      setLoggedIn(false);
                      localStorage.removeItem("dev_access_token");
                      localStorage.removeItem("dev_refresh_token");
                      navigateToHome();
                    }}
                  >
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
              </div>
              <div className="menu">
                {hashtag.length <= 4 ? (
                  hashtag.map((hashtagName: string, index: number) => (
                    <CategoryMenu
                      key={index}
                      hashtagName={hashtagName}
                      handleClick={() => navigateToSubPageComp(index)}
                    />
                    // <CategoryMenu key={index} hashtagName={hashtagName} handleClick={navigateToSubPageComp} />
                  ))
                ) : (
                  <>
                    {hashtag.slice(0, 4).map((id: string, index: number) => (
                      <CategoryMenu key={id} hashtagName={id} handleClick={() => navigateToSubPageComp(index)} />
                    ))}
                    <div className="menu-item more-dropdown">
                      더보기 ▼
                      <MoreDropdown />
                    </div>
                  </>
                )}
                <div className="menu-item">회사 소개</div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="menu">
          {hashtag.length <= 4 ? (
            hashtag.map((hashtagName: string, index: number) => (
              <CategoryMenu key={index} hashtagName={hashtagName} handleClick={() => navigateToSubPageComp(index)} />
              // <CategoryMenu key={index} hashtagName={hashtagName} handleClick={navigateToSubPageComp} />
            ))
          ) : (
            <>
              {hashtag.slice(0, 4).map((id: string, index: number) => (
                <CategoryMenu key={id} hashtagName={id} handleClick={() => navigateToSubPageComp(index)} />
              ))}
              <div className="menu-item more-dropdown">
                더보기 ▼
                <MoreDropdown />
              </div>
            </>
          )}
          <div className="menu-item">회사 소개</div>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default Header;
