import React, { useEffect, useState } from 'react';
import axios from "axios";
import MainPicture from './MainPicture/MainPicture';
import SubPicture from './SubPicture/SubPicture';
import './Picture.scss';

interface PictureProps {
  itemId: number | null;
};

function Picture({ itemId }: PictureProps) {
  /**
   * Picture Data
   */
  const [pictureData, setPictureData] = useState<string[]>([]);
  const mainPicture = pictureData ? pictureData.shift() : null;
  const subPicture = pictureData.slice(0, 3);

  /**
   * Picture API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/picture`)
      .then((response) => {
        setPictureData(response.data.data.pictures)

        //console.log(response.data.data.pictures)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="Picture">
      <div className='mainpicture'>
       {mainPicture && <MainPicture src={mainPicture} alt={mainPicture} itemId={itemId} modal={pictureData} />}
      </div>
      <div className="subpicture">
        {subPicture.map((picture) => (
          <SubPicture src={picture} alt={picture} itemId={itemId} modal={pictureData}/>
        ))}
      </div>
    </div>
  );
}

export default Picture;
