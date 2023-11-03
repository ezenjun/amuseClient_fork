import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Style from "./MainTiles/MainTiles.module.css";

const Box = ({
  backgroundImage,
  text,
  onClick,
}: {
  backgroundImage: string;
  text: string;
  onClick: () => void;
}) => (
  <div
    className={Style["regBox"]}
    onClick={onClick}
    style={{ margin: "auto", backgroundImage: `url(${backgroundImage})` }}
  >
    <p className={Style["regionName"]}>{text}</p>
  </div>
);

interface tileList {
  tile_id: number;
  tile_name: string;
  tile_images: string;
  itemInfos: [];
}

interface SubTileProps {
  title: string;
  tileCount: number;
  tileList: tileList[];
}

function SubTiles({ title, tileCount, tileList }: SubTileProps) {
  // const [ItemIds, setItemIds] = useState<number[]>([]);
  // const [ItemTitle, setItemTitle] = useState<string[]>([]);
  // const [ItemPrice, setItemPrice] = useState<number[]>([]);
  const [tileImageUrl, setTileImageUrl] = useState<string[]>([]);
  const [tileName, setTileName] = useState<string[]>([]);

  useEffect(() => {
    // const tileItems = tileList.map((items) => items.itemInfos);
    // console.log(title, tileItems);
    const tlist = tileList.map((item: any) => item.tile_name);
    setTileName(tlist);
    const timg = tileList.map((item: any) => item.tile_images);
    setTileImageUrl(timg);
  }, [tileList]);

  console.log("tilename ", tileName);

  // const movePage = useNavigate();
  const moveToGangwon = () => {
    // movePage("/toGangwon");
  };

  const [mobileHeader, setMobileHeader] = useState(0);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 700) {
      setMobileHeader(0);
    } else {
      setMobileHeader(1);
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
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>{title}</h2>
      {mobileHeader === 0 && ( // 넓은 화면
        <div>
          <div className={Style["container"]}>
            {tileName.map((name, index) => (
              <Box
                key={index}
                backgroundImage={tileImageUrl[index]} // You can change this to use the respective image based on the tile name
                text={name}
                onClick={moveToGangwon} // You can replace the console.log with the actual onClick function
              />
            ))}
          </div>
        </div>
      )}
      {mobileHeader === 1 && ( // 좁은 화면
        <div>
          {/* <div className={Style["container"]}>
            <Box backgroundImage={SeoulImg} text="서울 / 경기도" onClick={moveToGyeonggi} />
            <Box backgroundImage={GangwonImg} text="강원도" onClick={moveToGangwon} />
          </div>*/}
        </div>
      )}
    </>
  );
}

export default SubTiles;
