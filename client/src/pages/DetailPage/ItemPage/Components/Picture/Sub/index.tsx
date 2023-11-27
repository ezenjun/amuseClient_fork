import React, { useState } from "react";
import Popup from "../Popup";
import * as S from "./style";

interface SubProps {
  src: string;
  alt: string;
  modal: string[];
  clickId: number;
  type: string;
}

function Sub({ src, alt, modal, clickId, type }: SubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <S.Sub type={type}>
      <S.Image src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <Popup onClose={closeModal} images={modal} clickId={clickId} />
      )}
    </S.Sub>
  );
}

export default Sub;
