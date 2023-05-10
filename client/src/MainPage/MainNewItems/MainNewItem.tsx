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

function MainNewItem() {
   /**
   * Current Item API
   */
   const [currentItemIds, setCurrentItemIds] = useState<number[]>([]);
   useEffect(() => {
    axios
      .get("https://ammuse.store/main/current-item")
      .then((response) => {
        const currentItems = response.data.data.currentItems;
        const ids = currentItems.map((item: any) => item.item_db_id);
        setCurrentItemIds(ids);

        // console.log(response.data.data.currentItems)
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
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>어뮤즈의 최신 여행 패키지🚙</h2>
      <div className={Style["container"]}>
        {currentItemIds.map((itemId, index) => (
          <Box
            key={itemId}
            marginRight={index === currentItemIds.length - 1 ? "0" : "32px"}
            itemId={itemId}
            handleClick={() => navigateToDetail(itemId)}
          />
        ))}

      </div>
    </>
  );
}

export default MainNewItem;
