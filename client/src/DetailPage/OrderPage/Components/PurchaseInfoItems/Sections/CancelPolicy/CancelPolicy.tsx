import styles from "./CancelPolicy.module.scss";

export function CancelPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.policyContainer}>
        <h4>예약 취소 규정</h4>
        <div>- 여행시작 30일 전까지 (~30) 통보시 : 여행 요금 전액 환불</div>
        <div>- 여행시작 20일 전까지 (29~20) 통보시 : 결제 요금의 20% 공제</div>
        <div>- 여행시작 7일 전까지 (19~7) 통보시 :결제 요금의 30% 공제</div>
        <div>- 여행시작 4일 전까지 (6~4) 통보시 :결제 요금의 50%공제</div>
        <div>- 여행시작 당일까지 (3~당일) 통보시 : 취소/환불 불가</div>
      </div>
    </div>
  );
}
