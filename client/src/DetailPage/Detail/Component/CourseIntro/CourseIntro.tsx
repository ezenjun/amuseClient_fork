import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './CourseIntro.scss';
import CourseIntroDetail from './CourseIntroDetail/CourseIntroDetail';

function CourseIntro() {
  return (
    <div className="CourseIntro">
      <p className="information-title">코스 소개</p>
      {/* 1일차 일정 */}
      <CourseIntroDetail
        title="1일차. 넥슨 컴퓨터 박물관"
        time="2시간 소요"
        content={'아시아 최초의 컴퓨터 박물관으로 유명한 넥슨 컴퓨터 박물관은 컴퓨터와 게임의 역사를 잘 간직하고 있습니다.\nVR 체험시설은 물론 오락실용&가정용 게임이 도서관 컨셉으로 전시되어 있어 많은 관광객들이 방문합니다.'}
        imageSrc="images/day1-1.png"
      />
      <CourseIntroDetail
        title="1일차. 그러므로 part.2"
        time="2시간 소요"
        content={'요즘 가장 핫한 제주 감성이 가득한 카페에서 커피 한 잔의 여유를 가져보세요.\n모던한 건축물 외관으로 미술관에 온 듯한 느낌을 주는 카페가 즐거워지는 여행으로 만들어줘요.'}
        imageSrc="images/day1-2.png"
      />
      <CourseIntroDetail
        title="1일차. 천지연 폭포"
        time="20분 소요"
        content={'천지연폭포는 하늘과 땅이 만나서 이른 연못이라는 뜻을 가지고 있습니다.\n산책하기 좋은 폭포로 가는 길, 폭포수가 흐르는 아름다운 숲과 자연의 소리는 최고의 힐링공간이 됩니다.'}
        imageSrc="images/day1-3.png"
      />
      {/* 2일차 일정 */}
      <CourseIntroDetail
        title="2일차. 송악산"
        time="1시간 소요"
        content={'올레길 10코스이기도 한 송악산에 올라서 전망대에서 바라본 한라산과 산방산과 용머리해안의 아름다운 조화로움이 한 폭의 그림을 보는듯한 느낌을 가져다 줍니다.\n이곳 또한 놓치지 말아야 할 곳 중에 하나입니다.'}
        imageSrc="images/day2-1.png"
      />
      <CourseIntroDetail
        title="2일차. 오셜록 티 뮤지엄"
        time="2시간 소요"
        content={'자연을 생각하는 제주 오설록 티 뮤지엄!\n아모레퍼시픽이 차와 한국 전통차 문화를 소개하고, 보급하고자 개관한 국내 최초의 차 박물관입니다.\n'}
        imageSrc="images/day2-2.png"
      />
      <CourseIntroDetail
        title="2일차. 협재 해수욕장"
        time="30분 소요"
        content={'에메랄드 색 바다를 품고 있는 협재 해수욕장은 많은 관광객들이 제주도를 방문하면 꼭 들르는 해수욕장입니다.\n바다 너머로 보이는 예쁜 제주바다와 어우러져 아름다운 뷰를 선사합니다.'}
        imageSrc="images/day2-3.png"
      />
      {/* 3일차 일정 */}
      <CourseIntroDetail
        title="3일차. 도두동 무지개 해안도로"
        time="30분 소요"
        content={'파란 제주바다에 알록달록 무지개를 넣은듯한 느낌을 주는 해안도로입니다.\n많은 관광객들이 사진명소로 부르고 있는 장소에서 예쁜 추억을 남겨봐요!'}
        imageSrc="images/day3-1.png"
      />
      <CourseIntroDetail
        title="3일차. 이호테우 해변"
        time="30분 소요"
        content={'이호테우는 이호동 마을과 테우라는 통나무배를 합쳐서 붙여진 이름입니다.\n이호테우 해변은 공항과 가장 가까운, 낮과 밤이 모두 아름다운 해변입니다.'}
        imageSrc="images/day3-2.png"
      />
      <CourseIntroDetail
        title="3일차. 아침미소목장"
        time="1시간 소요"
        content={'젖소와 송아지에게 먹이도 주고, 아이스크림과 치즈를 직접 만들어 볼 수 있는 체험이 가득한 목장입니다.\n초록이 가득한 목장에서 도시에서 느껴볼 수 없었던 체험을 통해 생명의 소중함을 배우고 동물들의 체온을 직접 느껴봐요.'}
        imageSrc="images/day3-3.png"
      />
    </div>
  );
}

export default CourseIntro;
