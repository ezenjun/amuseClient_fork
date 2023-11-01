import React, { useState } from "react";
import PictureModal from "../Popup";
import * as S from "./style";

interface SubProps {
  src: string;
  alt: string;
  modal: string[];
  clickId: number;
}

function Sub({ src, alt, modal, clickId }: SubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <S.Sub>
      <S.Image src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <PictureModal onClose={closeModal} images={modal} clickId={clickId} />
      )}
    </S.Sub>
  );
}

export default Sub;
