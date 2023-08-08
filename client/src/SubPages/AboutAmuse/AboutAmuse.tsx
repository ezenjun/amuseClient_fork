import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutAmuse.css";
// import ChildTitle from "./SubtitleImgs/ChildTitle.jpg";
import Fade from "../../Fade";
import MainComponent from "../../MainComponent";

function AboutAmuse() {
  const movePage = useNavigate();

  return (
    <MainComponent>
      <Fade>
        <div className="introduce">
          <div className="content-block">
            <h2>회사소개</h2>
            <p>
              어뮤즈트래블은 풀컨시어지(Full concierge) 서비스 제공 여행사이며, 가족돌봄 여행, 실버 여행 및 장애인 여행에
              특화된 여행상품들을 제공하여 신체장애 유무와 나이에 상관없이 모두가 즐거운 여행을 만들 수 있는 관광약자를
              위한 여행 스타트업입니다.
            </p>
          </div>
          <div style={{ height: "400px", width: "100%", overflow: "hidden" }}>
            <img
              src="https://cdn.amusetravel.com/assets/company/accessible-icon.jpg"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="content-block">
            <h2>🖤 Philosophy</h2>
            <p>
              어뮤즈트래블은&nbsp;
              <a href="http://accessibleicon.org/">Accessible Icon</a>의 열렬한 지지자입니다. 기존의 수동적인 픽토그램은
              독립적이지 못한 불구자라는 메타포를 갖고 있는 반면, 스스로 나아가는 새로운 픽토그램은 장애인을 행위의
              주체로서 인식하는 철학적 메타포를 견지하고 있으며, 이미 미국&nbsp;
              <a href="https://www.washingtonpost.com/blogs/govbeat/wp/2014/07/29/the-handicap-symbol-gets-an-update-at-least-in-new-york-state/">
                뉴욕 주의 모든 장애인 심볼
              </a>
              은 Accessible Icon 의 아이콘으로 변경 되었습니다. 어뮤즈트래블은 이러한 실천과 믿음이 우리 사회에도 긍정적인
              변화와 에너지를 만들 것이라 확신합니다.
            </p>
          </div>
        </div>
      </Fade>
    </MainComponent>
  );
}

export default AboutAmuse;
