import React, { useState } from "react";
import PictureModal from "../PictureModal/PictureModal";
import * as S from "./style";

interface MainPictureProps {
  src: string;
  alt: string;
  itemId: number | null;
  modal: string[];
}

function MainPicture({ src, alt, itemId, modal }: MainPictureProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.MainPicture>
      <S.Image src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <PictureModal onClose={closeModal} itemId={itemId} images={modal} />
      )}
    </S.MainPicture>
  );
}

export default MainPicture;
