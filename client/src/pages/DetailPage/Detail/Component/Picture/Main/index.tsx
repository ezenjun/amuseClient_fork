import React, { useState } from "react";
import PictureModal from "../Popup";
import * as S from "./style";

interface MainProps {
  src: string;
  alt: string;
  itemId: number | null;
  modal: string[];
}

function Main({ src, alt, itemId, modal }: MainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.Main>
      <S.Image src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <PictureModal onClose={closeModal} itemId={itemId} images={modal} />
      )}
    </S.Main>
  );
}

export default Main;
