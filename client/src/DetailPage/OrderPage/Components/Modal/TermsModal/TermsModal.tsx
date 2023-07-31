import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./TermsModal.module.scss";

interface Props {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

export const TermsModal: React.FC<Props> = ({ setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "scroll";
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      const target = event.target as HTMLInputElement;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setShowModal(false);
        document.body.style.overflow = "scroll";
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="modal">
      <div
        className={styles.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.container} ref={modalRef}>
          <h3>개인정보 수집및활용 동의서</h3>
          <div>
            관련법규 : 개인정보 보호법 제15조(개인정보의 수집‧이용),
            제18조(개인정보의 이용‧제공 제한). 제22조(동의를 받는 방법), 표준
            개인정보 보호지침 제9조(개인정보의 목적 외 이용 등)
          </div>
          <div className={styles.contents}>
            <ul>
              <li>
                수집·이용하려는 개인정보의 항목 참여 아동
                <ul>
                  <li>청소년 성명, 생년월일, 성별, 소속</li>
                  <li>보호자 성명, 아동과의 관계, 연락처, E-Mail 등</li>
                </ul>
              </li>
              <li>
                개인정보의 수집․이용의 목적
                <ul>
                  <li>
                    ㈜어뮤즈의 (돌봄여행) 운영을 위한 본인 식별 절차에 이용,
                    여행자(보호자) 보험가입에 이용
                  </li>
                </ul>
              </li>
              <li>
                개인정보 이용기간 및 보유기간
                <ul>
                  <li>
                    수집된 개인정보의 보유기간은 제출일로부터 2년간 또는 삭제
                    신청 시까지
                  </li>
                  <li>보유기간 종료 시 재생이 가능한 방법으로 즉시 파기함</li>
                </ul>
              </li>
              <li>
                개인정보 제공 동의 거부 권리 및 동의 거부에 따른 불이익 내용
                또는 제한사항
                <ul>
                  <li>
                    귀하는 개인정보제공 동의를 거부할 권리가 있으며, 동의 거부에
                    따른 불이익은 없습니다.
                  </li>
                  <li>
                    다만 위 제공사항은 프로그램 신청 참여자의 본인 식별에
                    이용되는 정보로써 반드시 필요한 사항으로, 거부하실 경우
                    프로그램 참여 신청이 불가능함 을 알려드립니다.
                  </li>
                </ul>
              </li>
              <li>
                개인정보 제공자가 동의한 내용외의 다른 목적으로 활용하지 않으며,
                제공된 개인정보의 이용을 거부하고자 할 때에는 개인정보
                관리책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다.
              </li>
            </ul>
          </div>
          <button onClick={closeModal}>close</button>
        </div>
      </div>
    </div>
  );
};
