import styles from './Settings.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import SettingsGender from './SettingsGender';
import SettingsInterestField from './SettingsIntereestField';
import SettingsMarketingField from './SettingsMarketingField';

export default function Settings() {
  return (
    <div>
      <h2>나의 설정</h2>
      {/* <div className={styles.wrapper}>
        <div className={styles.upperBox}>
          <h4>아바타</h4>
          <button className={styles.modifyBtn}>아바타 수정</button>
        </div>
        <div className={styles.avater_bottomBox}>
          <img src='' alt='프로필 사진' />
          <div>
            <p>회원아이디</p>
            <p>leesu0229@naver.com</p>
          </div>
        </div>
      </div> */}
      <div className={styles.wrapper}>
        <div className={styles.upperBox}>
          <h4>내정보</h4>
          <button className={styles.modifyBtn}>내정보 수정</button>
        </div>
        <div className={styles.myInfo_middleBBox}>
          <TextField id="email" label="Email" variant="standard" placeholder='예) hong@korea.com' type='email' sx={{ mr: 0, width: "390px", margin: "10px", bgcolor: "transparent", border: 'none' }}/>
          <TextField id="phoneNumber" label="전화번호" variant="standard" placeholder='예) 010-1234-5678' type='email' sx={{ mr: 0, width: "390px", margin: "10px" }}/>
          <TextField id="name" label="실명" variant="standard" type='email' placeholder='예) 홍길동' sx={{ mr: 0, width: "390px", margin: "10px" }}/>
          <TextField id="birth" label="생년월일" variant="standard" placeholder='예) 1990-01-01' type='email' sx={{ mr: 0, width: "390px", margin: "10px" }}/>
        </div>
        <div className={styles.myInfo_bottomBBox}>
          <SettingsGender />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.upperBox}>
          <h4>관심영역</h4>
          <button className={styles.modifyBtn}>관심영역 저장</button>
        </div>
        <div className={styles.interestField_bottomBox}>
          <SettingsInterestField />
        </div>
      </div>
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
  )
}
