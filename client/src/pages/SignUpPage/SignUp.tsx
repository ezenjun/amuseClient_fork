import React from "react";
import MainComponent from "../../MainComponent";
import GoogleIcon from "../LogInPage/Icons/google_logo_2.png";
import KakaoIcon from "../LogInPage/Icons/kakao_logo.png";
import NaverIcon from "../LogInPage/Icons/naver_logo.png";
import AmuseIcon from "../LogInPage/Icons/amuse_logo.png";
import * as S from "./SignUpStyle";


export default function SignUp(props: any) {
  // const redirectU = `${process.env.REACT_APP_REDIRECT_URL}LoginAgree`
  const redirectU = `${process.env.REACT_APP_REDIRECT_URL}`

  const handleSignupNaverClick = () => {
    window.location.href = `${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/naver?redirect_uri=${redirectU}`;
    window.location.href = '/LoginAgree';
  };

  
  return (
    <MainComponent>
      <S.SignUpBody>
        <S.SignUpTitle>회원가입</S.SignUpTitle>
        <S.OAuthContainer>
          <S.SignupButton className="signup_amuse" href="/SignUpAmuse">
            어뮤즈 아이디로 회원가입
            <S.SnsLogo src={AmuseIcon} alt="어뮤즈 로고" />
          </S.SignupButton>
          {/* <S.SignupButton
            className="signup_naver"
            href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/naver?redirect_uri=${redirectU}`}
          >
            네이버 아이디로 회원가입
            <S.SnsLogo src={NaverIcon} alt="네이버 로고" />
          </S.SignupButton> */}
          <S.SignupButton
            className="signup_naver" onClick={handleSignupNaverClick}>
            네이버 아이디로 회원가입
            <S.SnsLogo src={NaverIcon} alt="네이버 로고" />
          </S.SignupButton>
          <S.SignupButton
            className="signup_kakao"
            href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/kakao?redirect_uri=${redirectU}`}
          >
            카카오 계정으로 회원가입
            <S.SnsLogo src={KakaoIcon} alt="카카오 로고" />
          </S.SignupButton>
          <S.SignupButton
            className="signup_google"
            href={`${process.env.REACT_APP_AMUSE_API}/oauth2/authorization/google?redirect_uri=${redirectU}`}
          >
            구글 계정으로 회원가입
            <S.SnsLogo src={GoogleIcon} alt="구글 로고" />
          </S.SignupButton>
        </S.OAuthContainer>
      </S.SignUpBody>
    </MainComponent>
  );
}