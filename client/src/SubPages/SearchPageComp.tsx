import React, { useEffect, useState, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import Style from "../MainPage/BestAndNewStyle.module.css";
import AppStyle from "../App.module.css";
import axios from "axios";

const numberWithCommas = (number: number | null): string => {
  if (number === null) {
    return "N/A"; // 또는 원하는 다른 대체 값을 반환할 수 있습니다.
  }
  return number.toLocaleString("en");
};

interface BoxProps {
  marginRight: string;
  itemId: number;
  handleClick: () => void;
  title: string;
  startPrice: string;
  imageUrl: string;
}
interface BoxGroupProps {
  itemIds: number;
}

function SearchPageComp() {
  const { apiKey } = useParams() as { apiKey: string };
  const [ItemIds, setItemIds] = useState<number[]>([]);
  const [ItemTitle, setItemTitle] = useState<string[]>([]);
  const [ItemPrice, setItemPrice] = useState<number[]>([]);
  const [ItemImageUrl, setItemImageUrl] = useState<string[]>([]);

  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  useEffect(() => {
    axios
      .get(`https://ammuse.store/search?keyword=${apiKey}&sort=like_num_desc&page=1`)
      .then((response) => {
        const bestItems = response.data.data.items;
        const ids = bestItems.map((item: any) => item.item_db_id);
        setItemIds(ids);
        const titles = bestItems.map((item: any) => item.title);
        setItemTitle(titles);
        const startPrices = bestItems.map((item: any) => item.startPrice);
        setItemPrice(startPrices);
        const imgUrl = bestItems.map((item: any) => item.imageUrl);
        setItemImageUrl(imgUrl);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("mainbest 연결 실패");
      });
  }, []);

  const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick, title, startPrice, imageUrl }) => (
    <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
      <div className={Style["box_before"]} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={Style["like_count"]}>
        {/* <FontAwesomeIcon
          icon={isLiked[itemId] ? fullHeart : faHeart}
          style={{ color: "#ffffff", width: "20px", height: "20px", marginTop: "10px", marginLeft: "10px" }}
          onClick={() => handleLikeClick(itemId)}
        /> */}
      </div>
      <p className={Style["tripTitle"]}>{title}</p>
      <p className={Style["tripCost"]}>가격 : {startPrice}원 ~</p>
    </div>
  );

  const BoxGroup = () => {
    const numIterations = Math.ceil(ItemIds.length / 3); // ItemIds의 길이를 3으로 나눈 후 올림하여 반복 횟수 계산

    return (
      <div>
        {Array.from({ length: numIterations }, (_, iteration) => (
          <div className={Style["container"]} style={{ marginTop: "3rem" }} key={iteration}>
            {ItemIds.slice(iteration * 3, iteration * 3 + 3).map((itemId: number, index: number) => {
              const itemIndex = iteration * 3 + index;
              if (itemIndex >= ItemIds.length) return null; // ItemIds의 범위를 초과한 경우 null 반환

              return (
                <Box
                  key={itemId}
                  marginRight={itemIndex !== 0 && (itemIndex + 1) % 3 === 0 ? "0" : "32px"}
                  itemId={itemId}
                  title={ItemTitle[itemIndex]}
                  startPrice={numberWithCommas(ItemPrice[itemIndex])}
                  handleClick={() => navigateToDetail(itemId)}
                  imageUrl={ItemImageUrl[itemIndex]}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className={AppStyle["liner"]}></div>
      {/* <br /> */}

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
          backgroundColor: "lightblue",
          margin: "0",
        }}
      >
        "{apiKey}" 검색 결과
      </h1>
      <div className={AppStyle["App"]}>
        <BoxGroup />
      </div>
      <Footer />
    </div>
  );
}

export default SearchPageComp;
