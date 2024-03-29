import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../atoms";
import moment from "moment";
import MyPageMenu from "../../../../pages/MyPage/MyPageMenu";
import Menu from "../../Components/Menu";
import * as S from "./style";
import * as C from "../../constants";

interface LoginProps {
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

function Login({
  name,
  loggedIn,
  setLoggedIn,
  cookies,
  setCookie,
  removeCookie,
}: LoginProps) {
  const movePage = useNavigate();

  const navigateToHome = () => {
    movePage("/");
  };

  const navigateToLogIn = () => {
    movePage("/LogIn");
  };

  const navigateToSignUP = () => {
    movePage("/SignUP");
  };

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const handleLogout = () => {
    let token = cookies.__jwtkid__;
    setLoggedIn(false);
    removeCookie("accessToken");
    setAccessToken("");
    const expires = moment().add("1", "m").toDate();
    setCookie("__igjwtk__", token, { expires });
    removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
    removeCookie("__usrN__", { path: "/", maxAge: 0 });
    navigateToHome();
  };

  return (
    <S.Login>
      <S.UserMenu>
        {loggedIn && (
          <S.User>
            {name || cookies.__usrN__} {C.LOGIN.USER}
          </S.User>
        )}
        {loggedIn ? (
          <MyPageMenu />
        ) : (
          <S.Button onClick={navigateToLogIn}>{C.LOGIN.LOGIN}</S.Button>
        )}
      </S.UserMenu>
      {loggedIn ? (
        <S.Scroll>
          <S.Menu>
            <Menu type={"mobile"} />
          </S.Menu>
          <S.Logout onClick={handleLogout}>{C.LOGIN.LOGOUT}</S.Logout>
        </S.Scroll>
      ) : (
        <>
          <S.Join type={"signup"} onClick={navigateToSignUP}>
            {C.LOGIN.JOIN}
          </S.Join>
          <S.Scroll>
            <S.Menu>
              <Menu type={"mobile"} />
            </S.Menu>
          </S.Scroll>
        </>
      )}
    </S.Login>
  );
}

export default Login;
