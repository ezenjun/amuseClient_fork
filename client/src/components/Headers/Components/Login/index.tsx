import { useNavigate } from "react-router-dom";
import moment from "moment";
import MyPageMenu from "../../../../pages/MyPage/MyPageMenu";
import * as S from "./style";
import * as C from "./constants";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../atoms";

interface LoginProps {
  name: string | undefined;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cookies: any;
  setCookie: (
    name: "__jwtk__" | "__igjwtk__" | "__jwtkid__" | "__usrN__",
    value: any,
    options?: object | undefined
  ) => void;
  removeCookie: (
    name: "__jwtk__" | "__igjwtk__" | "__jwtkid__" | "__usrN__",
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
    localStorage.removeItem("accessToken"); // localStorage 임시 사용
    setLoggedIn(false);
    setAccessToken("");
    const expires = moment().add("1", "m").toDate();
    setCookie("__igjwtk__", token, { expires });
    removeCookie("__jwtkid__", { path: "/", maxAge: 0 });
    removeCookie("__usrN__", { path: "/", maxAge: 0 });
    navigateToHome();
  };

  return (
    <S.Login>
      {loggedIn ? (
        <S.Button>
          {name || cookies.__usrN__} {C.LOGIN.USER}
        </S.Button>
      ) : (
        ""
      )}
      {loggedIn ? (
        <S.Button onClick={handleLogout}>{C.LOGIN.LOGOUT}</S.Button>
      ) : (
        <S.Button onClick={navigateToLogIn}>{C.LOGIN.LOGIN}</S.Button>
      )}
      {loggedIn ? (
        <MyPageMenu />
      ) : (
        <S.JoinButton onClick={navigateToSignUP}>{C.LOGIN.JOIN}</S.JoinButton>
      )}
    </S.Login>
  );
}

export default Login;
