import React, { useState } from "react";
import MainComponent from "../../MainComponent";
import { useNavigate } from "react-router-dom";
import "./CertificationForm.scss";
import CertificationForm from "./CertificationForm";
import PasswordInput from "./PasswordInput";

interface FindPwProps { }

const FindPw: React.FC<FindPwProps> = (props) => {
    const movePage = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>("findPw");
    const [showResetForm, setShowResetForm] = useState<boolean>(false);

    const navigateToFindId = () => {
        movePage("/LogIn/FindId");
        setSelectedTab("findId");
    };

    const navigateToFindPw = () => {
        movePage("/LogIn/FindPw");
        setSelectedTab("findPw");
    };

    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
    const [isValidCheckPassword, setIsValidCheckPassword] = useState<boolean>(true);

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsValidPassword(false);
        const newPassword = e.target.value;
        const isValid1 = /^(?=(?:[^A-Za-z]*[A-Za-z]){1,})(?=(?:\D*\d){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);
        const isValid2 = /^(?=(?:[^A-Za-z]*[A-Za-z]){1,})(?=(?:[^\W_]*[\W_]){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);
        const isValid3 = /^(?=(?:\D*\d){1,})(?=(?:[^\W_]*[\W_]){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);
        const isValid4 = /^(?=(?:[^A-Za-z]*[A-Za-z]){1,})(?=(?:\D*\d){1,})(?=(?:[^\W_]*[\W_]){1,})[A-Za-z\d\W_]{8,20}$/.test(newPassword);

        if (isValid1 || isValid2 || isValid3 || isValid4) {
            setPassword(newPassword);
            setIsValidPassword(true);
        } else {
            setPassword(newPassword);
            setIsValidPassword(false);
        }
    };

    const handleChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsValidCheckPassword(false)
        if (password === e.target.value) {
            setCheckPassword(e.target.value);
            setIsValidCheckPassword(true)
        } else {
            setCheckPassword(e.target.value)
            setIsValidCheckPassword(false)
        }
    };



    const [checkAuthCode, setCheckAuthCode] = useState<boolean>(false);

    return (
        <MainComponent>
            <div className="find_account">
                {/* 비밀번호 찾기 탭 */}
                {showResetForm === false && (
                    <div>
                        <nav className="find_account_tab">
                            <ul>
                                <li className={selectedTab === "findId" ? "selected" : ""} onClick={navigateToFindId}>아이디 찾기</li>
                                <li className={selectedTab === "findPw" ? "selected" : ""} onClick={navigateToFindPw}>비밀번호 찾기</li>
                            </ul>
                        </nav>
                        {/* <div>
                            <CertificationForm showPwForm={selectedTab === "findPw"} onFindPasswordClick={() => setShowResetForm(true)} showFindBtn={true} onNextStep={function (): void {
                                throw new Error("Function not implemented.");
                            } } titleText="찾기"/>
                        </div> */}
                    </div>
                )}
                {/* 비밀번호 재설정 폼 */}
                {showResetForm && (
                    <div className="reset_pw_body">
                        <div className="reset_pw">
                            <h1 className="reset_title">비밀번호 재설정</h1>
                            <div className="reset_pw_box">
                                <span className="input_pw_title">새 비밀번호</span>
                                <PasswordInput password={password} handleChangePassword={handleChangePassword} labelText="새 비밀번호" placeText="새 비밀번호" design="outlined" width="702px" margin='0' margin_b='0' isValid={isValidPassword} errorText="8자 이상, 영문 대/소문자, 숫자, 특수문자 중 두 종류 이상의 조합으로 설정해 주세요" inputSize='medium' />
                                {/* <input type="password" className="input_pw" placeholder="새 비밀번호" /> */}
                                <span className="input_pw_title">새 비밀번호 확인</span>
                                <PasswordInput password={checkPassword} handleChangePassword={handleChangeCheckPassword} labelText="새 비밀번호 확인" placeText="새 비밀번호 확인" design="outlined" width="702px" margin='0'  margin_b='0' isValid={isValidCheckPassword} errorText="일치하지 않습니다" inputSize='medium'/>
                                {/* <input type="password" className="input_pw" placeholder="새 비밀번호 확인" /> */}
                                <div className="note_box">
                                    <p className="note_title">ℹ️ 유의사항</p>
                                    <p className="note_content">• 비밀번호 설정 시 총 8자~20자로 설정해주세요.</p>
                                    <p className="note_content">• 영문 대/소문자, 숫자, 특수문자 등 두 종류 이상의 문자를 조합해 구성되어야 합니다.</p>
                                </div>
                            </div>
                            <div className="login_btn_box">
                                <button className="login_btn" >
                                    <i className="fa-solid fa-door-open"></i>변경하기
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </MainComponent>
    );
}

export default FindPw;