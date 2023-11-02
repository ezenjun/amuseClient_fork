import React, { useState } from "react";
import Popup from "../Popup";
import * as S from "./style";

interface MainProps {
  src: string;
  alt: string;
  modal: string[];
  clickId: number;
}

function Main({ src, alt, modal, clickId }: MainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <S.Main>
      <S.Image src={src} alt={alt} onClick={openModal} />
      {isModalOpen && (
        <Popup onClose={closeModal} images={modal} clickId={clickId} />
      )}
    </S.Main>
  );
}

export default Main;
