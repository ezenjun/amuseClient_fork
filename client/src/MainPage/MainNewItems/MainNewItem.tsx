import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../BestAndNewStyle.module.css";
import axios from "axios";

const numberWithCommas = (num: number): string => {
  return num.toLocaleString("en");
};

interface BoxProps {
  marginRight: string;
  itemId: number;
  handleClick: () => void;
  title: string;
  startPrice: string;
}

const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick, title, startPrice }) => (
  <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
    <p className={Style["tripTitle"]}>{title}</p>
    <p className={Style["tripCost"]}>가격 : {startPrice}원 ~</p>
  </div>
);

function MainNewItem() {
  /**
   * Current Item API
   */
  const [currentItemIds, setCurrentItemIds] = useState<number[]>([]);
  const [currentItemTitle, setCurrentItemTitle] = useState([]);
  const [currentItemPrice, setCurrentItemPrice] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get("https://ammuse.store/main/current-item")
      .then((response) => {
        const currentItems = response.data.data.currentItems;
        const ids = currentItems.map((item: any) => item.item_db_id);
        setCurrentItemIds(ids);
        const titles = currentItems.map((item: any) => item.title);
        setCurrentItemTitle(titles);
        const startPrices = currentItems.map((item: any) => item.startPrice);
        setCurrentItemPrice(startPrices);
        console.log(response.data.data.currentItems);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, []);

  /**
   * Best Item -> Detail Page
   */
  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  return (
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>어뮤즈의 최신 여행 패키지🚙</h2>
      <div className={Style["container"]}>
        {currentItemIds.slice(0, 3).map((itemId: any, index: number) => (
          <Box
            key={itemId}
            marginRight={index === currentItemIds.length - 1 ? "0" : "32px"}
            itemId={itemId}
            title={currentItemTitle[index]}
            startPrice={numberWithCommas(currentItemPrice[index])}
            handleClick={() => navigateToDetail(itemId)}
          />
        ))}
      </div>
    </>
  );
}

export default MainNewItem;
