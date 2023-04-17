import React from 'react';
import './SubPicture.scss';

interface SubPictureProps {
    src: string;
    alt: string;
}

const SubPicture: React.FC<SubPictureProps> = ({ src, alt }) => (
  <div className="SubPicture">
    <img className="image" src={src} alt={alt} />
  </div>
);

export default SubPicture;
