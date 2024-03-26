import React, { useState, useRef } from 'react';
import { Modal, Box, useMediaQuery } from '@mui/material';
import arrowBack from './assets/arrow_back_icon.svg';
import media from './assets/media_icon.svg';
import styles from './VisionBoardModal.module.scss'
import axios from 'axios';

export default function EditVisionBoardModal({
  isModalOpen,
  closeModal,
  handleImageAndTextSelect,
  readOnly,
  // gridItems,
  // selectedGrid,
  // prevImgGrid,
  // id,
  // dataLength
}) {

  const [imgFile, setImgFile] = useState('');
  const [text, setText] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [previousImgRef, setPreviousImgRef] = useState(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  const handleModalClose = () => {
    if (window.confirm('게시물 작성을 취소하시겠습니까?')) {
      closeModal();
    }
  };

  const saveImgFile = () => {
    let file = imgRef.current.files[0];
    setPreviousImgRef(file)

    if (imgRef.current.files.length === 0) {
      file = previousImgRef;
      return file
    }

    let reader = new FileReader();
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setText((prevText) => prevText + '\n');
    }
  };


  // ㅁ달 이미지 및 텍스트를 myvisionboardgrid에서 보내야함
  const modalImgPutApi = async () => {
    const formData = new FormData();
    formData.append('image', imgRef.current.files[0]);

    try {
      const response = await axios.put(`/api/v1/images?name=${prevImgGrid[selectedGrid].fileName}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

      if (response.status >= 200 && response.status < 300) {
        console.log('img put data 전송 완료', response);
      } else {
        throw new Error('Network response was not successful, img put data 전송 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const modalTextPutApi = async () => {
    const gridNumber = selectedGrid + 0;
    let sequence = {};

    switch (dataLength) {
      case 8:
        sequence = {
          number: gridNumber <= 4 ? gridNumber + 1 : gridNumber,
          description: textRef.current.value
        }
        break;
      case 4:
        sequence = {
          number: parseInt((gridNumber + 1) / 2),
          description: textRef.current.value
        }
        break;
      default:
        console.log('modalPutApi default')
    }

    const requestData = {
      title: gridItems[4].title,
      sequence: sequence,
    }

    try {
      const response = await axios.put(`/api/v1/visionboard?id=${id}`,
        requestData,
        {
          headers: { 'Content-Type': 'application/json' },
        });

      if (response.status >= 200 && response.status < 300) {
        console.log('text put data 전송 완료', response);

      } else {
        throw new Error('Network response was not successful');
      }
    } catch (error) {
      console.error(error);
    }
  }


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
              <p className={styles.modalTitle}>이미지 수정</p>
              <button className={styles.modalPostButton} onClick={() => {
                handleSelect()
              }}>
                수정 완료
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
                  ref={textRef}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  readOnly={readOnly}
                />
                <div className={styles.postContents}>
                  <label
                    className={readOnly ? styles.inputLabelNoPointer : styles.inputLabel}
                    for="file"
                  >이미지 선택
                    <input
                      className={styles.imgInput}
                      type="file"
                      id="file"
                      accept="image/jpg, image/png, image/jpeg"
                      ref={imgRef}
                      onChange={saveImgFile}
                      disabled={readOnly}
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
