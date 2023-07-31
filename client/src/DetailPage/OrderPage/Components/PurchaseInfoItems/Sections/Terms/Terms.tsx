import { useState } from "react";
import { CommonHeader } from "../../../CommonHeader";
import { TermsModal } from "../../../Modal/TermsModal";
import styles from "./Terms.module.scss";

export function Terms() {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <CommonHeader title="약관 안내" isRight={true}>
      <div className={styles.termsContent}>
        <div>
          <span>개인정보 수집및활용 동의 (필수)</span>
          <img src="../../../" onClick={handleImageClick} />
        </div>
        <div>
          <span>영상촬영 동의 (필수)</span>
          <button />
        </div>
        <div>
          <span>촬영물 마케팅활용 동의 (선택)</span>
          <button />
        </div>
      </div>
      <div>위 약관을 확인하였으며, 회원 본인은 약관 및 결제에 동의합니다.</div>
      {showModal && <TermsModal setShowModal={setShowModal} />}
    </CommonHeader>
  );
}
