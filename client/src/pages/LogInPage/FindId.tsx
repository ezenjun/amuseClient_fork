import React, {useState} from "react";
import MainComponent from "../../MainComponent";
import { useNavigate } from "react-router-dom";
import "./CertificationForm.scss";
import CertificationForm from "./CertificationForm";

interface FindIdProps {}

const FindId: React.FC<FindIdProps> = () => {
    const movePage = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>("findId");

    const navigateToFindId = () => {
        movePage("/LogIn/FindId");
        setSelectedTab("findId");
    };

    const navigateToFindPw = () => {
        movePage("/LogIn/FindPw");
        setSelectedTab("findPw");
    };



    const [checkAuthCode, setCheckAuthCode] = useState<boolean>(false);

    return (
        <MainComponent>
            <div className="find_account">
                <nav className="find_account_tab">
                    <ul>
                        <li className={selectedTab === "findId" ? "selected" : ""} onClick={navigateToFindId}>아이디 찾기</li>
                        <li className={selectedTab === "findPw" ? "selected" : ""} onClick={navigateToFindPw}>비밀번호 찾기</li>
                    </ul>
                </nav>
                <div>
                    <CertificationForm onFindPasswordClick={function (): void {
                        throw new Error("Function not implemented.");
                    } } showPwForm={false} showFindBtn={true} onNextStep={function (): void {
                        throw new Error("Function not implemented.");
                    } } titleText="찾기"/>
                </div>
            </div>
        </MainComponent>
    );
}

export default FindId;