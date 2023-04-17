import React from 'react';
import MainPicture from './MainPicture/MainPicture';
import SubPicture from './SubPicture/SubPicture';
import './Picture.scss';

function Picture() {
  return (
    <div className="Picture">
      <MainPicture src="images/main.jpeg" alt="test1" />
      <div className="subpicture">
        <SubPicture src="images/day2-3.png" alt="test1" />
        <SubPicture src="images/day3-3.png" alt="test1" />
        <SubPicture src="images/picturetest.png" alt="test1" />
      </div>
    </div>
  );
}

export default Picture;
