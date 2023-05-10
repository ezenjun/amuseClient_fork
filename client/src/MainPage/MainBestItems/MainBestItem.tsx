import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../BestAndNewStyle.module.css";
import axios from "axios";

interface BoxProps {
  marginRight: string;
  itemId: number;
  handleClick: () => void;
}

const Box: React.FC<BoxProps> = ({ marginRight, itemId, handleClick }) => (
  <div className={Style["box"]} style={{ marginRight }} onClick={handleClick}>
    <p className={Style["tripTitle"]}>여행 제목</p>
    <p className={Style["tripCost"]}>가격 : ~~~</p>
  </div>
);

function MainBestItem() {
  /**
   * Best Item API
   */
  const [bestItemIds, setBestItemIds] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get("https://ammuse.store/main/best-item")
      .then((response) => {
        const bestItems = response.data.data.bestItems;
        const ids = bestItems.map((item: any) => item.item_db_id);
        setBestItemIds(ids);

        // console.log(response.data.data)
      })
      .catch(error => {
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
    <div>
      <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>실시간 Best 여행 상품🏞</h2>
      <div className={Style["container"]}>
        {bestItemIds.map((itemId, index) => (
          <Box
            key={itemId}
            marginRight={index === bestItemIds.length - 1 ? "0" : "32px"}
            itemId={itemId}
            handleClick={() => navigateToDetail(itemId)}
          />
        ))}
      </div>
    </div>
  );
}

export default MainBestItem;
