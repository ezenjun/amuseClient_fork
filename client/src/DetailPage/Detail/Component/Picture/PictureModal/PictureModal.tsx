import React, { useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal';
import './PictureModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

interface PictureModalProps {
  onClose: () => void;
  itemId: number | null;
  images: string[];
}

const onAfterOpen = () => {
  document.body.style.overflow = 'hidden';
};

function PictureModal({ onClose, itemId, images } : PictureModalProps){

  // 이미지 목록
  const pictures = images;

  // 현재 이미지의 인덱스
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  // 다음 이미지를 보여주는 함수
  const showNextPicture = () => {
    setCurrentPictureIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  // 이전 이미지를 보여주는 함수
  const showPreviousPicture = () => {
    setCurrentPictureIndex((prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length);
  };

  const onCloseModal = () => {
    document.body.style.overflow = 'auto';
    onClose();
  };

  return (
    <Modal
      isOpen
      onAfterOpen={onAfterOpen}
      onRequestClose={onCloseModal}
      style={{
        content: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          background: 'transparent',
        },
        overlay: {
          backgroundColor: 'rgba( 73, 80, 86, 95% )',
          width: '100%',
          height: '100%',
        },
      }}
    >
      <div className="picture-modal">
        {/* 이미지 */}
        <img className="modal-img" src={pictures[currentPictureIndex]} alt="test" />

        {/* 왼쪽 버튼 */}
        <button className="btn-left" onClick={showPreviousPicture}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* 오른쪽 버튼 */}
        <button className="btn-right" onClick={showNextPicture}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* 닫기 버튼 */}
        <button className="btn-close" onClick={onCloseModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* 작은 이미지 슬라이더 */}
        <div className="small-picture">
          {pictures.map((picture, index) => (
            <img
              key={index}
              src={picture}
              alt="small"
              className={index === currentPictureIndex ? 'active' : ''}
              onClick={() => setCurrentPictureIndex(index)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PictureModal;
