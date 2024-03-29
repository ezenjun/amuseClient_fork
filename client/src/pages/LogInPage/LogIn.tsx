import React, { useEffect, useState } from "react";
import { Link, redirect, useRoutes, useSearchParams, } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";
import { useRecoilState } from "recoil";
import { accessTokenState, isLoggedIn } from "../../atoms";
import { useNavigate } from "react-router-dom";
import AppStyle from "../App.module.css";
import axios from "axios";
import MainComponent from "../../MainComponent";
import GoogleIcon from "./Icons/google_logo.png";
import KakaoIcon from "./Icons/kakao_logo.png";
import NaverIcon from "./Icons/naver_logo.png";
import SignUpIcon from "./Icons/signup_icon.png";
import { useCookies } from "react-cookie";
import moment from "moment";
import * as S from "./LoginStyle";


const Login: React.FC = () => {
	const [id, setId] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loggedIn, setLoggedIn] = useRecoilState<boolean>(isLoggedIn);
	const navigate = useNavigate();

	// const redirectUrl = process.env.REACT_APP_REDIRECT_URL
	const redirectUrl = `${process.env.REACT_APP_REDIRECT_URL}LoginAgree`
	

	const axiosInstance = axios.create({
		withCredentials: true,
	});

	const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};


	// 아이디 저장 기능
	const [rememberId, setRememberId] = useState<boolean>(false);

	useEffect(() => {
		const storedId = localStorage.getItem("savedId");
		const storedRememberId = localStorage.getItem("rememberId") === "true";

		if (storedRememberId && storedId) {
			setId(storedId);
			setRememberId(storedRememberId);
		}
	}, []);

	const handlerememberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRememberId(e.target.checked);
	};


	// 어뮤즈 자체 로그인 API
	const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
	const [error, setError] = useState<string | null>(null);
	const [cookies, setCookie] = useCookies(['accessToken','__jwtkid__']);

	const handleLogin = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();

		if (rememberId) {
			localStorage.setItem("savedId", id);
			localStorage.setItem("rememberId", "true");
		} else {
			localStorage.removeItem("savedId");
			localStorage.setItem("rememberId", "false");
		}

		await axios
			.get(`${process.env.REACT_APP_AMUSE_API}/api/v1/auth/user/login?id=${id}&password=${password}`)
			.then((response) => {
				const accessToken = response.data.data.accessToken;
				setAccessToken(accessToken);
				setCookie('accessToken', accessToken);
				
				const expires = moment().add("8", "h").toDate();
				setCookie("__jwtkid__", accessToken, { expires });
				// setLoggedIn(true);

				navigate("/");
			})
			.catch((error) => {
				if (error.response) {
					setError(error.response.data.message);
				}
			});
	}


	return (
		<MainComponent>
			<S.LoginBody>
				{/* <form className="login" action="/loginURL" method="post"> */}
					<S.LoginTitle>로그인</S.LoginTitle>
					<S.InputContainer>
						<div className="id">
							<TextInput disable={false} value={id} onInputChange={handleChangeId} labelText="아이디" placeText="아이디" inputType="text" width="97%" margin="" allMargin="8px" design="standard"/>
						</div>
						<div className="password">
							<PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="비밀번호" placeText="비밀번호" design="standard" width="97%" margin='8px' margin_b='' isValid={true} errorText="" inputSize="medium" />
						</div>
					</S.InputContainer>
					{error && <S.ErrorMessage>아이디 또는 비밀번호가 올바르지 않습니다.</S.ErrorMessage>}
					<S.KeepIdContainer>
						<S.KeepIdCheck id="keep" className="keep_id_check" checked={rememberId} onChange={handlerememberIdChange}></S.KeepIdCheck>
						<S.KeepIdText htmlFor="keep" className="keep_id_text">아이디 저장</S.KeepIdText>
					</S.KeepIdContainer>
					<S.LoginButton onClick={handleLogin}>
						<i className="fa-solid fa-door-open"></i>로그인
					</S.LoginButton>
				{/* </form> */}
				<S.FunctionBox>
					<div className="find_btn">
						<S.FindIdButton href="/LogIn/FindId">아이디 찾기</S.FindIdButton>
						<S.FindPwButton href="/LogIn/FindPw">비밀번호 찾기</S.FindPwButton>
					</div>
					<S.SignUpButton>
						<S.NoDecorationLink href="/SignUp">
							<img src={SignUpIcon} alt="회원가입 아이콘" className="signup_icon" />
							<S.SignUpLink>회원가입</S.SignUpLink>
						</S.NoDecorationLink>
					</S.SignUpButton>
				</S.FunctionBox>
				<S.VBox>
					<div>간편 로그인</div>
					<S.OAuthContainer>
						<a className="login_google" href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/google?redirect_uri=${redirectUrl}`}>
							<S.SnsLogo src={GoogleIcon} alt="구글 로고" className="sns_logo" />
						</a>
						<a className="login_naver" href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/naver?redirect_uri=${redirectUrl}`}>
							<S.SnsLogo src={NaverIcon} alt="네이버 로고" className="sns_logo" />
						</a>
						<a className="login_kakao" href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/kakao?redirect_uri=${redirectUrl}`}>
							<S.SnsLogo src={KakaoIcon} alt="카카오 로고" className="sns_logo" />
						</a>
					</S.OAuthContainer>
				</S.VBox>
			</S.LoginBody>
		</MainComponent>
	);
}

export default Login;