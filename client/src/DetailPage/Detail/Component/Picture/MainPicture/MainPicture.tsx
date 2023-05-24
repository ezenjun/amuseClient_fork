import React, { useState } from 'react';
import PictureModal from '../PictureModal/PictureModal';
import './MainPicture.scss';

interface MainPictureProps {
  src: string;
  alt: string;
  itemId: number | null;
  modal: string[];
}

function MainPicture({ src, alt, itemId, modal } : MainPictureProps){
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
        <PictureModal onClose={closeModal} itemId={itemId} images={modal} />
      )}
    </div>
  );
};

export default MainPicture;
