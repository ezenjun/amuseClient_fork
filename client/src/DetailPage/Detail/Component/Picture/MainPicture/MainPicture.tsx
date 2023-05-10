import React, { useState } from 'react';
import PictureModal from '../PictureModal/PictureModal';
import './MainPicture.scss';

interface MainPictureProps {
  src: string;
  alt: string;
  itemId: number | null;
}

const MainPicture: React.FC<MainPictureProps> = ({ src, alt, itemId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="MainPicture">
      <img className="image" src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <PictureModal onClose={closeModal} itemId={itemId}/>
      )}
    </div>
  );
};

export default MainPicture;
