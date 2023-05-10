import React from 'react';
import './ProductIntro.scss';
import MoreBtn from '../MoreBtn/MoreBtn';

type ProductIntroProps = {
  itemId: number | null;
};

function ProductIntro({ itemId }: ProductIntroProps) {
  return (
    <div className="product-introduction">
      <p className="introduction-title">놀면서 쉬면서 즐겨보는 나의 제주 ⭐</p>
      <p className="introduction-content">
        물 좋고 공기 좋은 제주도에서 자연과 예술의 아름다움에 빠져들어 보아요!
        <br />
        <br />
        1) 차별화된 맞춤 서비스 (상황 및 니즈에 맞는 맞춤서비스)
        <br />
        2) 동시에 2코스 진행 (가족 구성원별 일정을 나눠서 만족도 UP)
        <br />
        3) 믿음직한 전문 인솔자 (운전, 인솔, 사진촬영까지)
        <br />
        4) 돌봄 서비스 (안전캠 기록, 실시간 위치추적&연락)
        <br />
        5) 프라이빗 픽업서비스 (집앞 픽업 서비스)
        <br />

        어린이, 노인 동반 가족 구성원 모두가 즐거운 여행입니다! ✨
        <br />
        <br />

        - 한 팀은 최대 6명까지 가능해요~
        <br />
        <br />

        📢 어뮤즈와 함께하면 다른 이유!
        <br />
        1) 처음오는 제주 어디를 갈지 모를 때!
        <br />
        2) 자주 오지만 조금 더 특별한 곳을 가고 싶을 때!
        <br />
        3) 휴식을 위해 찾은 제주, 제주 같은 곳에서 쉬며 걷고 싶을 때!
        <br />
        4) 휴가내서 온 만큼 제주를 맘껏 즐기고 싶을 때!
        <br />
        5) 제주에서 한달 살기 중 조금~ 지겨워 질 때쯤!
        <br />
        6) 부모님과 아이들과 함께 하는 여행, 조금 더 편한 투어를 찾을 때!
        <br />
        7) 각종 뮤지엄과 테마파크로 감성을 채우고 싶을 때!
        <br />
        <br />

        일정은 각 여행자님에게 맞는 일정을 만들어 드립니다! 일정부터~진행~마무리까지 걱정하지마세요!
        <br />
        저희 AMUSE가 있잖아요 :)!
        <br />
        <br />

        간단한 일정 샘플, 안내사항 등은 밑에서 확인해주세요~
        <br />
        <br />
      </p>
    </div>
  );
}

export default ProductIntro;
