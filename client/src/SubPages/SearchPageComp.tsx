import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Style from "../MainPage/ListStyle.module.css";
import AppStyle from "../App.module.css";
import axios from "axios";
import MainComponent from "../MainComponent";
import { BoxProps, DropdownProps } from "../Interfaces/PropsInterfaces";

const numberWithCommas = (number: number | null): string => {
  if (number === null) {
    return "N/A";
  }
  return number.toLocaleString("en");
};

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("like_num_desc");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className={Style["dropdown"]} style={{ float: "right" }}>
      <select value={selectedOption} onChange={handleDropdownChange}>
        <option value="like_num_desc">좋아요 순</option>
        <option value="rated_desc">평점 높은 순</option>
        <option value="startPrice_desc">시작가 높은 순</option>
        <option value="startPrice_asc">시작가 낮은 순</option>
        <option value="date_desc">최신순</option>
      </select>
    </div>
  );
};

function SearchPageComp() {
  const { apiKey } = useParams() as { apiKey: string };
  const [ItemIds, setItemIds] = useState<number[]>([]);
  const [ItemTitle, setItemTitle] = useState<string[]>([]);
  const [ItemPrice, setItemPrice] = useState<number[]>([]);
  const [ItemImageUrl, setItemImageUrl] = useState<string[]>([]);
  const [searchSort, setSearchSort] = useState("like_num_desc");

  const movePage = useNavigate();
  const navigateToDetail = (itemId: number) => {
    movePage(`/detail/${itemId}`);
  };

  useEffect(() => {
    fetchData(searchSort); // 초기값으로 "like_num_desc"로 데이터를 가져옵니다.
  }, [searchSort]); // searchSort 값이 변경될 때마다 useEffect를 실행합니다.

  const fetchData = (sortOption: string) => {
    axios
      .get(
        `${process.env.REACT_APP_AMUSE_API}/item/search?keyword=${apiKey}&sort=${searchSort}&page=1`
      )
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
        console.log("search 연결 실패");
      });
  };

  const handleSortChange = (sortOption: string) => {
    setSearchSort(sortOption);
  };

  console.log(searchSort);

  const Box: React.FC<BoxProps> = ({
    itemId,
    handleClick,
    title,
    startPrice,
    imageUrl,
  }) => (
    <div className={Style["box"]} onClick={handleClick}>
      <div
        className={Style["box_before"]}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={Style["like_count"]}></div>
      <p className={Style["tripTitle"]}>{title}</p>
      <p className={Style["tripCost"]}>가격 : {startPrice}원 ~</p>
    </div>
  );

  const BoxGroup = () => {
    const numIterations = Math.ceil(ItemIds.length / displayedItemCount); // ItemIds의 길이를 3으로 나눈 후 올림하여 반복 횟수 계산

    return (
      <div>
        {Array.from({ length: numIterations }, (_, iteration) => (
          <div
            className={Style["container"]}
            style={{ marginTop: "3rem" }}
            key={iteration}
          >
            {ItemIds.slice(
              iteration * displayedItemCount,
              iteration * displayedItemCount + displayedItemCount
            ).map((itemId: number, index: number) => {
              const itemIndex = iteration * displayedItemCount + index;
              if (itemIndex >= ItemIds.length) return null; // ItemIds의 범위를 초과한 경우 null 반환

              return (
                <Box
                  key={itemId}
                  marginRight={
                    itemIndex !== 0 &&
                    (itemIndex + 1) % displayedItemCount === 0
                      ? "0"
                      : "15px"
                  }
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
  const [displayedItemCount, setDisplayedItemCount] = useState(3);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1100) {
      setDisplayedItemCount(4);
    } else if (windowWidth >= 900) {
      setDisplayedItemCount(3);
    } else if (windowWidth >= 650) {
      setDisplayedItemCount(2);
    } else {
      setDisplayedItemCount(1);
    }
  };

  useEffect(() => {
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <div>
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
      <MainComponent>
        <div className={AppStyle["App"]}>
          <Dropdown onChange={handleSortChange} />
          <BoxGroup />
        </div>
      </MainComponent>
    </div>
  );
}

export default SearchPageComp;
