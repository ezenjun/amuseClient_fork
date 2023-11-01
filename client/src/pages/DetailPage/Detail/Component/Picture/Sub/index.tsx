import React, { useState } from "react";
import PictureModal from "../Popup";
import * as S from "./style";

interface SubProps {
  src: string;
  alt: string;
  itemId: number | null;
  modal: string[];
}

function Sub({ src, alt, itemId, modal }: SubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.Sub>
      <S.Image src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <PictureModal onClose={closeModal} itemId={itemId} images={modal} />
      )}
    </S.Sub>
  );
}

export default Sub;
