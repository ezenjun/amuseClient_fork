import React, { useState } from 'react';
import './LogIn.css';
import Header from '../Headers/Header';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import GoogleButton from './GoogleButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
    <div className="App">
        <Header />
    </div>
    <div className="login_body">
        <form className='login' action='/loginURL' method='post'>
            <div className='amuse_login_title'>
                <img className='amuse_logo' src='http://cdn.amusetravel.com/assets/headers/logo.png' alt='어뮤즈 이미지' />
                <h2 className='amuse_title_top'>모두가 즐거운 여행</h2>
                <h2 className='amuse_title_bottom'>어뮤즈 트래블</h2>
            </div>
            <div className="input">
                <div className="email">
                    <EmailInput
                    email={email}
                    handleChangeEmail={handleChangeEmail}/>
                </div>
                <div className="password">
                    <PasswordInput
                    password={password}
                    handleChangePassword={handleChangePassword}/>
                </div>
            </div>
            <div className="login_btn_box">
                <button className='login_btn'>
                    <i className="fa-solid fa-door-open"></i>로그인
                </button>
            </div>
        </form>
        <div className="v_box">
            <div className="login_function_box">
                <div className='signup_box'>
                    <span>아직 가입하지 않으셨나요?</span>
                    <Link to='/SignUp'>
                    <span className='signup_link'>회원가입</span>
                    </Link>
                </div>
                <div className='password_reset_box'>
                    <span>비밀번호를 잊으셨나요?</span>
                    <span className='password_reset_link'>비밀번호 초기화</span>
                </div>
            </div>
            <div className='OAuth'>
                <GoogleButton />
                <button className='login_naver'>
                    Naver 로그인
                </button>
                <button className='login_kakao'>
                    KaKao 로그인
                </button>
            </div>
        </div>
    </div>
    </>
  )
}
