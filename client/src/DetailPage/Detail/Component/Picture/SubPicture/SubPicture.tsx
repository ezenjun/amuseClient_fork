import React, { useState } from 'react';
import PictureModal from '../PictureModal/PictureModal';
import './SubPicture.scss';

interface SubPictureProps {
    src: string;
    alt: string;
    itemId: number | null;
    modal: string[];
}

function SubPicture({ src, alt, itemId, modal } : SubPictureProps){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="SubPicture">
      <img className="image" src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <PictureModal onClose={closeModal} itemId={itemId} images={modal} />
      )}
    </div>
  )
};

export default SubPicture;
