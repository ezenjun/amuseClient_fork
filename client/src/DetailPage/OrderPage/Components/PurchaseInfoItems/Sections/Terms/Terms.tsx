import { useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import { TermsModal } from "../../../Modal/TermsModal";
import styles from "./Terms.module.scss";
import { TermsProps } from "../../../../../../Interfaces/PropsInterfaces";


export const Terms: React.FC<TermsProps> = ({privacy,privacyCheck,takeVideo,takeVideoCheck,videoInMarketing,videoInMarketingCheck}) => {
  const [showModal, setShowModal] = useState(false);
  

  const handleImageClick = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <CommonHeader title="약관 안내" isRight={true}>
      <div className={styles.termsContent}>
        <div>
          <span style={{cursor:"pointer"}} onClick={handleImageClick}> 개인정보 수집및활용 동의 (필수)</span>
          <input type={"checkbox"} checked={privacy} onChange={()=>{privacyCheck(!privacy)}}/>
        </div>
        <div>
          <span>영상촬영 동의 (필수)</span>
          <input type={"checkbox"} checked={takeVideo} onChange={()=>{takeVideoCheck(!takeVideo)}} />
        </div>
        <div>
          <span>촬영물 마케팅활용 동의 (선택)</span>
          <input type={"checkbox"} checked={videoInMarketing} onChange={()=>{videoInMarketingCheck(!videoInMarketing)}}/>
        </div>
      </div>
      <div>위 약관을 확인하였으며, 회원 본인은 약관 및 결제에 동의합니다.</div>
      {showModal && <TermsModal setShowModal={setShowModal} />}
    </CommonHeader>
  );
}
