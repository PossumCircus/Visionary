import styles from './VisionBoardGrid.module.scss';

import axios from 'axios';

import React, { useState, useEffect } from 'react';
import CreateVisionBoardModal from './../VisionBoard/CreateVisionBoardModal';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VisionGrid() {
  const navigate = useNavigate();
  const handleNavigateToBoardName = () => {
    navigate('/makeboardname');
  };
  const location = useLocation();
  const [boardName, setBoardName] = useState('보드네임');

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const queryBoardName = params.get('boardName');

  //   if (!queryBoardName) {
  //     alert('비전보드 이름을 먼저 입력해주세요.');
  //     navigate('/makeboardname');
  //   } else {
  //     setBoardName(queryBoardName);
  //   }
  // }, [navigate, location]);

  const [gridItems, setGridItems] = useState([
    { id: '1', img: null, text: null, isChecked: false },
    { id: '2', img: null, text: null, isChecked: false },
    { id: '3', img: null, text: null, isChecked: false },
    { id: '4', img: null, text: null, isChecked: false },
    { id: 'name' },
    { id: '5', img: null, text: null, isChecked: false },
    { id: '6', img: null, text: null, isChecked: false },
    { id: '7', img: null, text: null, isChecked: false },
    { id: '8', img: null, text: null, isChecked: false },
  ]);
  // 유저가 선택한 그리드 실시간 추적
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 옵션 기본 값은 FullGrid
  const [selectedOption, setSelectedOption] = useState('1');
  const [uploadedText, setUploadedText] = useState(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    checkUploadComplete();
  }, [gridItems, selectedOption]);

  const checkUploadComplete = () => {
    // 유저 선택 그리드 값 
    const requiredUploadCount = getRequiredUploadCount();
    let count = 0;

    for (const item of gridItems) {
      if (item.img || item.text) {
        count++;
      }
    }

    console.log('Upload Count:', count);
    setUploadCount(count);
    // 유저 선택 그리드 값과 업로드에 필요한 그리드 값이 일치할 경우(true) 업로드 가능.
    setIsUploadComplete(count === requiredUploadCount);
  };
  // 유저 선택 그리드 값 감지
  const getRequiredUploadCount = () => {
    return selectedOption === '1' ? 8 : 4;
  };
  //타이틀을 제외하고 모달 열림
  const handleGridItemClick = (index) => {
    if (gridItems[index].id !== 'name') {
      setSelectedItemIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleImageAndTextSelect = (imgData, textData, imgPreview) => {
    setGridItems((prevGridItems) => {
      const updatedGridItems = [...prevGridItems];
      // 추적 중인 유저 선택 그리드의 인덱스 내용물 업데이트 후 반환
      const selectedItem = updatedGridItems[selectedItemIndex];
      selectedItem.img = imgData;
      selectedItem.text = textData;
      selectedItem.imgPreview = imgPreview;
      selectedItem.isChecked = false;

      return updatedGridItems;
    });
    // 아래 후에 삭제.
    console.log(imgData);
    console.log(textData);

    setUploadedText(textData);
    // 양식 제출 후 모달 닫기
    setIsModalOpen(false);
  };

  const handleCheckboxClick = (index) => {
    setGridItems((prevGridItems) => {
      const updatedGridItems = [...prevGridItems];
      updatedGridItems[index] = {
        ...updatedGridItems[index],
        isChecked: !updatedGridItems[index].isChecked,
      };
      return updatedGridItems;
    });
  };

  const handleDeleteButtonClick = () => {
    setGridItems((prevGridItems) => {
      const updatedGridItems = prevGridItems.map((item) => {
        if (item.isChecked) {
          return { id: item.id, img: null, text: null, isChecked: false };
        }
        return item;
      });
      return updatedGridItems;
    });
  };

  const handleOptionChange = (e) => {
    const newSelectedOption = e.target.value;
    // 그리드 옵션이 2(4개) 일 경우 이미지 유무 확인
    if (newSelectedOption === '2') {
      const skippedGridIds = ['name', '2', '4', '5', '7'];
      const uploadedImageCheck = gridItems
        .filter((item) => !skippedGridIds.includes(item.id))
        .some((item) => item.img !== null);

      if (uploadedImageCheck) {
        const confirmed = window.confirm(
          '기존에 업로드한 이미지는 삭제됩니다. 변경하시겠습니까?'
        );
        if (!confirmed) {
          return;
        }
      }

      setGridItems((prevGridItems) => {
        const updatedGridItems = [...prevGridItems];

        for (let i = 0; i < updatedGridItems.length; i += 2) {
          if (!skippedGridIds.includes(updatedGridItems[i].id)) {
            updatedGridItems[i].imgPreview = null;
            updatedGridItems[i].img = null;
            updatedGridItems[i].text = null;
            updatedGridItems[i].isChecked = false;
          }
        }

        return updatedGridItems;
      });
    }

    setSelectedOption(newSelectedOption);
  };

  const handleCompleteButtonClickAlert = async (e) => {
    e.preventDefault();
    if (selectedOption === '2' && uploadCount < 4) {
      alert('4개의 텍스트와 이미지를 업로드해야 합니다.');
      return;
    } else if (selectedOption === '1' && uploadCount < 8) {
      alert('8개의 텍스트와 이미지를 업로드해야 합니다.');
      return;
    }

    const formData = new FormData();
    let imageIndex = 1;
    let descriptionIndex = 1;

    for (const item of gridItems) {
      console.log(item, item.img);
      if (item.img) {
        formData.append(`image${imageIndex}`, item.img);
        imageIndex++;
      }
      if (item.text) {
        formData.append(`description${descriptionIndex}`, item.text);
        descriptionIndex++;
      }
    }

    formData.append('title', boardName);

    console.log(Array.from(formData.entries()));

    console.log(formData);

    try {
      const response = await axios.post('/api/v1/visionboard', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        console.log('Images and descriptions uploaded successfully');
        console.log(response);
        alert('비전보드 생성이 완료되었습니다.');
        navigate('/myvisionboard/list');
      } else if (response.status === 401) {
        console.log('401: 인증되지 않음');
        localStorage.removeItem('isLogin');
        navigate('/');
      } else if (response.status === 500) {
        console.log('500: 내부 서버 오류');
      }
      // else {
      //   console.log('기타 상태');
      //   alert('오류가 발생했습니다.');
      // }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {gridItems.map((item, index) => {
          const isHidden = selectedOption === '2' && [0, 2, 6, 8].includes(index);
          const gridItemClassName = `${styles.gridItem} ${isHidden ? styles.hidden : ''} ${item.img ? styles.hiddenBorder : ''}`;
          if (item.id === 'name') {
            return (
              <div className={styles.gridBoardName}>
                <div>{boardName}</div>
              </div>
            );
          } else return (
            <div
              key={item.id}
              className={item.id === 'name' ? '' : `${gridItemClassName} ${styles.hoverable}`}
              onClick={() => handleGridItemClick(index)}
            >
              {item.id !== 'name' && (
                <>
                  {item.imgPreview && (
                    <img src={item.imgPreview} alt="Selected" />
                  )}
                  {item.text && (
                    <div className={styles.gridItemText}>
                      {item.text}
                      {item.id === selectedItemIndex && uploadedText && (
                        <div>{uploadedText}</div>
                      )}
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleCheckboxClick(index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
      <input type="hidden" name="boardNameInput" value={boardName} />
      <div className={styles.btnContainer}>
        <button className={styles.deleteBtn} onClick={handleDeleteButtonClick}>
          삭제
        </button>
        <button className={styles.prevBtn} onClick={handleNavigateToBoardName}>
          이전
        </button>
        <form id="visionBoard" onSubmit={handleCompleteButtonClickAlert} className={styles.completeForm}>
          <button name="completeBtn" type="submit" className={styles.completeBtn}>
            완료
          </button>
          {gridItems.map((item, index) => (
            <>
              {item.img && (
                <input
                  type="hidden"
                  name={`image${index + 1}`}
                  value={item.img}
                />
              )}
              {item.text && (
                <input
                  type="hidden"
                  name={`description${index + 1}`}
                  value={item.text}
                />
              )}
            </>
          ))}
        </form>
        <div className={styles.selectContainer}>
          개수
          <select
            className={styles.selectBtn}
            name="gridOption"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="1">8</option>
            <option value="2">4</option>
          </select>
        </div>
      </div>
      {
        isModalOpen && (
          <CreateVisionBoardModal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            handleImageAndTextSelect={handleImageAndTextSelect}
          />
        )
      }
    </div >

  );
}