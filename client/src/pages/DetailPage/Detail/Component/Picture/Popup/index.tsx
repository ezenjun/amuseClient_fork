import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import * as S from "./style";

interface PopupProps {
  onClose: () => void;
  images: string[];
  clickId: number;
}

const onAfterOpen = () => {
  document.body.style.overflow = "hidden";
};

function Popup({ onClose, images, clickId }: PopupProps) {
  const pictures = images;
  const [currentPictureIndex, setCurrentPictureIndex] = useState(clickId);

  const showNextPicture = () => {
    setCurrentPictureIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  const showPreviousPicture = () => {
    setCurrentPictureIndex(
      (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length
    );
  };

  const onCloseModal = () => {
    document.body.style.overflow = "auto";
    onClose();
  };

  return (
    <Modal
      isOpen
      onAfterOpen={onAfterOpen}
      onRequestClose={onCloseModal}
      style={{
        content: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          background: "transparent",
        },
        overlay: {
          backgroundColor: "rgba( 73, 80, 86, 95% )",
          width: "100%",
          height: "100%",
          zIndex: "10",
        },
      }}
    >
      <S.Popup>
        <S.MainImage src={pictures[currentPictureIndex]} />
        <S.LeftButton onClick={showPreviousPicture}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </S.LeftButton>
        <S.RightButton onClick={showNextPicture}>
          <FontAwesomeIcon icon={faChevronRight} />
        </S.RightButton>
        <S.CloseButton onClick={onCloseModal}>
          <FontAwesomeIcon icon={faTimes} />
        </S.CloseButton>

        <S.List>
          {pictures.map((picture, index) => (
            <S.SubImage
              key={index}
              src={picture}
              alt="sub"
              className={index === currentPictureIndex ? "active" : ""}
              onClick={() => setCurrentPictureIndex(index)}
            />
          ))}
        </S.List>
      </S.Popup>
    </Modal>
  );
}

export default Popup;
