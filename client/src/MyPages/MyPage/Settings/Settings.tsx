import styles from "./Settings.module.css";
import TextField from "@mui/material/TextField";
import SettingsGender from "./SettingsGender";
import SettingsMarketingField from "./SettingsMarketingField";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface userProps {
  id: string;
  name: string;
  email: string;
  grade: string;
}

export default function Settings() {
  const [ cookies ] = useCookies(["__jwtkid__"]);
  const [userData, setUserData] = useState<userProps>();
  const getUserInfoAsToken = async () => {
    const token = cookies["__jwtkid__"];
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/user/login/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data);
        console.log("mypage", response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let getToken: string | null = cookies.__jwtkid__;
    if (getToken) {
      getUserInfoAsToken();
    }
  }, []);
  return (
    <div>
      <h2>나의 설정</h2>
      <div className={styles.wrapper}>
        <div className={styles.upperBox}>
          <h4>내정보</h4>
          <button className={styles.modifyBtn}>내정보 수정</button>
        </div>
        <div className={styles.myInfo_middleBBox}>
          {/* <TextField
            id="email"
            label={userData?.email}
            variant="standard"
            placeholder="예) hong@korea.com"
            type="email"
            sx={{ mr: 0, width: "390px", margin: "10px", bgcolor: "transparent", border: "none" }}
          /> */}
          <div style={{ display: "flex" }}>
            <p style={{ width: "390px", margin: "10px", backgroundColor: "transparent", border: "none" }}>
              이메일 : <span style={{ color: "gray" }}> {userData?.email || ""}</span>
            </p>
            <p style={{ width: "390px", margin: "10px", backgroundColor: "transparent", border: "none" }}>
              이름 : <span style={{ color: "gray" }}> {userData?.name || ""}</span> 님
            </p>
          </div>
          <TextField
            id="phoneNumber"
            label="전화번호"
            variant="standard"
            placeholder="예) 010-1234-5678"
            type="email"
            sx={{ mr: 0, width: "390px", margin: "10px" }}
          />
          {/* <TextField
            id="name"
            label={userData?.name}
            variant="standard"
            type="email"
            placeholder="예) 홍길동"
            sx={{ mr: 0, width: "390px", margin: "10px" }}
          /> */}
          <TextField
            id="birth"
            label="생년월일"
            variant="standard"
            placeholder="예) 1990-01-01"
            type="email"
            sx={{ mr: 0, width: "390px", margin: "10px" }}
          />
        </div>
        <div className={styles.myInfo_bottomBBox}>
          <SettingsGender />
        </div>
      </div>
      {/* <div className={styles.wrapper}>
        <div className={styles.upperBox}>
          <h4>관심영역</h4>
          <button className={styles.modifyBtn}>관심영역 저장</button>
        </div>
        <div className={styles.interestField_bottomBox}>
          <SettingsInterestField />
        </div>
      </div> */}
      <div className={styles.wrapper}>
        <div className={styles.upperBox}>
          <h4>마케팅 설정</h4>
          <button className={styles.modifyBtn}>마케팅설정 저장</button>
        </div>
        <div className={styles.marketing_bottomBox}>
          <SettingsMarketingField />
        </div>
      </div>
    </div>
  );
}
