import React, { useEffect, useState } from "react";
import { accessTokenState, isLoggedIn } from "../../atoms";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useInfoContext } from "../../pages/DetailPage/Contexts/InfoContext";
import axios from "axios";
import moment from "moment";
import Login from "./Components/Login";
import Logo from "./Components/Logo";
import Menu from "./Components/Menu";
import Hamburger from "./Components/Hamburger";
import * as S from "./style";

function Header() {
	const movePage = useNavigate();
	const { name, setName } = useInfoContext();

	const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
	const [cookies, setCookie, removeCookie] = useCookies([
		"__jwtk__",
		"__igjwtk__",
		"__jwtkid__",
		"__usrN__",
		"accessToken",
	]);
	const [mobileHeader, setMobileHeader] = useState(0);
	const handleResize = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth > 768) {
			setMobileHeader(0);
		} else {
			setMobileHeader(1);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (
			cookies.__usrN__ &&
			(!cookies.__jwtkid__ || cookies.__jwtkid__ === "undefined")
		) {
			removeCookie("__usrN__");
		}
		if (cookies.__jwtkid__) {
			getUserInfoAsToken(cookies.__jwtkid__);
			// setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
		if (
			!cookies.__usrN__ ||
			cookies.__usrN__ === "undefined" ||
			!cookies.__jwtkid__ ||
			cookies.__jwtkid__ === "undefined"
		) {
			setLoggedIn(false);
		}
	}, [cookies]);

	useEffect(() => {
		let locationString = window.location.toString();
		if (locationString.includes("http://localhost:3000/?access-token")) {
			let token: string | null = new URL(
				window.location.href
			).searchParams.get("access-token");
			if (token === null) {
				return;
			} else {
				const expires = moment().add("8", "h").toDate();
				setCookie("__jwtkid__", token, { expires });
				// setLoggedIn(true);
				getUserInfoAsToken(token);
				// movePage("/");
			}
		} else if (locationString.includes("amusetravel.wheelgo.net/")) {
			let token: string | null = cookies.__jwtk__;
			let igToken: string | null = cookies.__igjwtk__;
			if (!token && token !== "undefined") {
				return;
			} else if (igToken && igToken?.length > 0 && token === igToken) {
				return;
			} else {
				const expires = moment().add("8", "h").toDate();
				setCookie("__jwtkid__", token, { expires });
				// setLoggedIn(true);
				getUserInfoAsToken(token);
			}
		}
	}, []);

	const getUserInfoAsToken = async (token: string) => {
		axios
			.get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/info`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
			})
			.then((response) => {
				let userData = response.data.data;
				setName(response.data.data?.name);
				const expires = moment().add("8", "h").toDate();
				setCookie("__usrN__", response.data.data?.name, { expires });

				checkAgree().then((result) => {
					if (result) {
						setLoggedIn(true);
					} else {
						setLoggedIn(false);
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 약관 동의 여부 확인 api
	const checkAgree = () => {
		if (cookies.__jwtkid__) {
			return axios
				.get(
					`${process.env.REACT_APP_AMUSE_API}/api/v1/user/terms_of_service?type=SignUp`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `${cookies.__jwtkid__}`,
						},
					}
				)
				.then((response) => {
					console.log(response.data.data);
					return response.data.data;
				})
				.catch((err) => {
					console.log(err);
				});
		}

		return Promise.resolve(false);
	};

	// 어뮤즈 자체 로그인 정보 가져오기
	const getAmuseUserInfo = async () => {
		await axios
			.get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/info`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.accessToken}`,
				},
			})
			.then((response) => {
				let userData = response.data.data;
				setName(response.data.data?.name);
				setLoggedIn(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (cookies.accessToken) {
			getAmuseUserInfo();
		}
	}, []);

	return (
		<S.Header>
			{mobileHeader === 1 && (
				<S.Mobile>
					<Hamburger
						name={name}
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
						cookies={cookies}
						setCookie={setCookie}
						removeCookie={removeCookie}
					/>
				</S.Mobile>
			)}

			{/* pc 버전 */}
			{mobileHeader === 0 && (
				<S.PC>
					<Login
						name={name}
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
						cookies={cookies}
						setCookie={setCookie}
						removeCookie={removeCookie}
					/>
					<Logo />
					<Menu />
				</S.PC>
			)}
		</S.Header>
	);
}

export default Header;
