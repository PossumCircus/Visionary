import React, { useState, useRef } from 'react';
import { Modal, Box, useMediaQuery } from '@mui/material';
import arrowBack from './assets/arrow_back_icon.svg';
import media from './assets/media_icon.svg';
import styles from './CreateVisionBoardModal.module.scss'

export default function CreateVisionBoardModal({
  isModalOpen,
  closeModal,
  handleImageAndTextSelect,
}) {
  const [imgFile, setImgFile] = useState('');
  const [text, setText] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const imgRef = useRef(null);
  const muiMediaQuery = useMediaQuery('(min-width:800px)')

  const handleModalClose = () => {
    if (window.confirm('게시물 작성을 취소하시겠습니까?')) {
      closeModal();
    }
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setSelectedImg(reader.result);
    };
  };

  const handleSelect = () => {
    if (imgFile && text) {
      const file = imgRef.current.files[0];

      handleImageAndTextSelect(file, text, selectedImg);

      closeModal();
    } else {
      alert('이미지와 문구를 모두 등록해 주세요.');
    }
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 70) {
      setText(inputText);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setText((prevText) => prevText + '\n');
    }
  };

  const characterCount = text.length;
  const characterLimit = 70;

  return (
    <div>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '45dvw',
              height: '85dvh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2,
            }}
          >
            <div className={styles.modalHeader}>
              <button
                onClick={handleModalClose}
                className={styles.modalCloseButton}
              >
                <img width="22px" height="22px" src={arrowBack} alt="닫기" />
              </button>
              <p className={styles.modalTitle}>이미지 올리기</p>
              <button className={styles.modalPostButton} onClick={handleSelect}>
                완료
              </button>
            </div>
            <div className={styles.modalMain}>
              <div className={styles.modalUploadFileArea}>
                <img
                  className={imgFile ? styles.modalImgO : styles.modalImgX}
                  src={imgFile ? imgFile : media}
                  alt="미리보기"
                />
              </div>
              <div className={styles.modalPostWriteArea}>
                <textarea
                  placeholder={'문구입력...'}
                  value={text}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                />
                <div className={styles.postContents}>
                  <label
                    for="file"
                  >이미지 선택/수정
                    <input
                      className={styles.imgInput}
                      type="file"
                      id="file"
                      accept="image/*"
                      ref={imgRef}
                      onChange={saveImgFile}
                    />
                  </label>
                  <p>
                    {characterCount}/{characterLimit} 글자수
                  </p>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}


