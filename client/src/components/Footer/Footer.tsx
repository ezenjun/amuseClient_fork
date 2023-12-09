import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Style from "./Footer.module.css";
import MainMoreAbout from "./MainMoreAbout/MainMoreAbout";
import styled from "styled-components";

interface PartnerData {
  id: number;
  name: string;
  link: string;
  img: string;
}

function Footer() {
  // 푸터 정보 get
  const [footerInfoData, setFooterInfoData] = useState<string>("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/footer`)
      .then((response) => {
        setFooterInfoData(response.data.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 업체 정보 get
  const [partnerInfoData, setPartnerInfoData] = useState<PartnerData[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/api/v1/partners`)
      .then((response) => {
        setPartnerInfoData(response.data.data.partnerInfoList);
        setItems(response.data.data.partnerInfoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [items, setItems] = useState<PartnerData[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => [
        ...prevItems.slice(1),
        prevItems[0]
      ]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const partnerInfoRef = useRef<HTMLDivElement>(null);
  const [partnerInfoWidth, setPartnerInfoWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (partnerInfoRef.current) {
        setPartnerInfoWidth(partnerInfoRef.current.offsetWidth - 7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const calculateSliceRange = () => {
    return Math.min(18, Math.floor(partnerInfoWidth / 75)*3);
  };


  return (
    <div className={Style["footer"]}>
      <div className={Style["bottom"]}>
        <MainMoreAbout />
        <div className={Style["infoFlexBox"]}>
          {/* 푸터 정보 */}
          <div className={Style["footerInfo"]}>
            <div dangerouslySetInnerHTML={{
              __html: footerInfoData ?? "",
            }} />
            <div className={Style["docsBtn"]}>
              <TermsBtn href="/Terms">이용약관</TermsBtn>
              <PrivacyBtn href="/Privacy">개인정보취급정책</PrivacyBtn>
            </div>
          </div>
          {/* 업체 정보 */}
          <div className={Style["partnerInfo"]} ref={partnerInfoRef}>
            <p>어뮤즈트래블 협력업체 및 기관</p>
              <div className={Style["gridBox"]}>
              {items.length > 0 &&  items.slice(0, calculateSliceRange()).map((partner, index) => (
                  <div className={Style["item"]} id={`${partner.id}`}>
                    <a href={partner.link} target="_blank" className={Style["tooltip"]}>
                      <img src={partner.img} alt={partner.name} style={{ width: '70px', height: '70px' }} />
                      <span className={Style["tooltipText"]}>{`${partner.name}`}</span>
                    </a>
                  </div>
              ))}
              </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Footer;

const TermsBtn = styled.a`
  font-size: 12px;
  color: #a3a3a3;
  padding-right: 5px;
  margin-right: 5px;
  border-right: 1px solid #a3a3a3;
  &:hover {
    text-decoration: underline;
  }
`;

const PrivacyBtn = styled.a`
  font-size: 12px;
  color: #a3a3a3;
  &:hover {
    text-decoration: underline;
  }
`;