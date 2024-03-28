import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './VisionBoardGrid.module.scss'
import axios, { Axios } from 'axios';
import EditVisionBoardModal from "./Modal/EditVisionBoardModal";

const getVisionBoardDataById = async (id) => {

  try {
    const response = await axios.get(`/api/v1/myvisionboard?id=${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      console.log('get 성공 data', data)
      return data;
    } else {
      throw new Error('Network response was not successful');
    }

  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteVisionBoardDataById = async (id) => {
  try {
    await axios.delete(`/api/v1/myvisionboard?id=${id}`)
    console.log('delete성공')
  } catch (error) {
    console.error('Error:', error)
  }
}

export default function MyVisionBoardGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(true)
  const [gridOption, setGridOption] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();
  const visionaryIp = process.env.REACT_APP_VISIONARY_IP;

  const id = useMemo(() => {
    return location.pathname.split('/')[2];
  });

  const [gridItems, setGridItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [selectedOption, setSelectedOption] = useState('1');
  const [uploadedText, setUploadedText] = useState(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [prevImgGrid, setPrevImgGrid] = useState([]);
  const [gridTitle, setGridTitle] = useState('');
  const [dataLength, setDataLength] = useState('');

  // 내 비전보드 페이지 접속시 데이터 패칭
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await getVisionBoardDataById(id);
        if (result) {
          const fetchedData = result.data.visionboardcontentSequence;
          const dataLength = fetchedData.length;
          setDataLength(dataLength);
          let fetchedGrid = [];
          let prevImg = [];

          if (dataLength === 8) {
            fetchedGrid = [
              {
                key: 1,
                id: fetchedData[0].sequence,
                img: fetchedData[0].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[0].description,
                isChecked: false,
              },
              {
                key: 2,
                id: fetchedData[1].sequence,
                img: fetchedData[1].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[1].description,
                isChecked: false,
              },
              {
                key: 3,
                id: fetchedData[2].sequence,
                img: fetchedData[2].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[2].description,
                isChecked: false,
              },
              {
                key: 4,
                id: fetchedData[3].sequence,
                img: fetchedData[3].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[3].description,
                isChecked: false,
              },
              { key: 9, id: result.data.title },
              {
                key: 5,
                id: fetchedData[4].sequence,
                img: fetchedData[4].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[4].description,
                isChecked: false,
              },
              {
                key: 6,
                id: fetchedData[5].sequence,
                img: fetchedData[5].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[5].description,
                isChecked: false,
              },
              {
                key: 7,
                id: fetchedData[6].sequence,
                img: fetchedData[6].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[6].description,
                isChecked: false,
              },
              {
                key: 8,
                id: fetchedData[7].sequence,
                img: fetchedData[7].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[7].description,
                isChecked: false,
              },
            ];
            setGridTitle(result.data.title);
            prevImg = [
              { id: 1, fileName: fetchedData[0].fileName },
              { id: 2, fileName: fetchedData[1].fileName },
              { id: 3, fileName: fetchedData[2].fileName },
              { id: 4, fileName: fetchedData[3].fileName },
              { id: result.data.title },
              { id: 5, fileName: fetchedData[4].fileName },
              { id: 6, fileName: fetchedData[5].fileName },
              { id: 7, fileName: fetchedData[6].fileName },
              { id: 8, fileName: fetchedData[7].fileName },
            ];
          } else if (dataLength === 4) {
            fetchedGrid = [
              { key: 1 },
              {
                key: 2,
                id: fetchedData[0].sequence,
                img: fetchedData[0].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[0].description,
                isChecked: false,
              },
              { key: 3 },
              {
                key: 4,
                id: fetchedData[1].sequence,
                img: fetchedData[1].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[1].description,
                isChecked: false,
              },
              { key: 9, id: result.data.title },
              {
                key: 5,
                id: fetchedData[2].sequence,
                img: fetchedData[2].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[2].description,
                isChecked: false,
              },
              { key: 6 },
              {
                key: 7,
                id: fetchedData[3].sequence,
                img: fetchedData[3].imagePath.replace(
                  '/home/elice/projects/visionary',
                  visionaryIp
                ),
                text: fetchedData[3].description,
                isChecked: false,
              },
              { key: 8 },
            ];
            setGridTitle(result.data.title);
            prevImg = [
              { id: 1, fileName: '' },
              { id: 2, fileName: fetchedData[0].fileName },
              { id: 3, fileName: '' },
              { id: 4, fileName: fetchedData[1].fileName },
              { id: result.data.title },
              { id: 5, fileName: fetchedData[2].fileName },
              { id: 6, fileName: '' },
              { id: 7, fileName: fetchedData[3].fileName },
              { id: 8, fileName: '' },
            ];
          }
          setPrevImgGrid(prevImg);
          setGridItems(fetchedGrid);
          console.log('받아온 데이터 확인 fetchedData', fetchedData);
          console.log('데이터 그리드 배치 fetchedGrid', fetchedGrid);
          console.log('prevImg', prevImg);
        } else {
          throw new Error('유저 비전 보드 그리드 가져오기 실패');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchingData();
  }, []);

  useEffect(() => {
    checkUploadComplete();
  }, [gridItems, selectedOption]);

  // 목록으로 돌아가기 버튼
  const handleNavigateToMyVisionBoardList = useCallback(() => {
    navigate('/myvisionboard/list');
  }, []);

  const handleBoardDelete = useCallback(() => {
    if (window.confirm('현재 열람중인 비전보드를 삭제하시겠습니까?')) {
      alert('성공적으로 삭제하였습니다.');
      deleteVisionBoardDataById(id);
      handleNavigateToMyVisionBoardList();
    }
  }, []);

  const getRequiredUploadCount = () => {
    return selectedOption === '1' ? 8 : 4;
  };

  const checkUploadComplete = () => {
    const requiredUploadCount = getRequiredUploadCount();
    let count = 0;

    for (const item of gridItems) {
      if (item.img && item.text) {
        count++;
      }
    }
    setUploadCount(count);
    setIsUploadComplete(count === requiredUploadCount);
  };

  const handleGridItemClick = (index) => {
    if (gridItems[index].id !== '5') {
      setSelectedGrid(index);
      setSelectedItemIndex(index);
      if (readOnly === true) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
      return;
    }
  };

  const handleImageAndTextSelect = (imgData, textData, imgPreview) => {
    setGridItems((prevGridItems) => {
      const updatedGridItems = [...prevGridItems];
      const selectedItem = updatedGridItems[selectedItemIndex];
      selectedItem.img = imgData;
      selectedItem.text = textData;
      selectedItem.imgPreview = imgPreview;
      selectedItem.isChecked = false;
      return updatedGridItems;
    });

    setUploadedText(textData);
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

    if (newSelectedOption === '2') {
      const skippedGridIds = ['2', '4', '5', '6', '8'];
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

  const handlePutCompleteButtonClick = async (e) => {
    e.preventDefault();
    navigate('/myvisionboard/list');
  }

  const handleUploadCompleteButton = async (e) => {
    e.preventDefault();
    if (selectedOption === '2' && uploadCount < 4) {
      alert('4개의 텍스트와 이미지를 업로드해야 합니다.');
      return;
    } else if (selectedOption === '1' && uploadCount < 8) {
      alert('8개의 텍스트와 이미지를 업로드해야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('visionBoardData', gridItems[4].title)

    for (const item of gridItems) {
      console.log('폼데이터 gridItems의 iteration:', item);
      if (item.img && item.text) {
        formData.append('visionBoardData', item.text);
        formData.append('visionBoardData', item.img);
      }
    }

    console.log('formData:', Array.from(formData.entries()));

    try {
      const response = await axios.post(`${origin}/api/v1/visionboard/create/multiple`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

      if (response.status === 201) {
        console.log('response:', response.data.success);
        alert('비전보드 생성이 완료되었습니다.');
        // navigate('/myvisionboard/list');
      } else if (response.status === 401) {
        console.error('401: 인증되지 않음');
        localStorage.removeItem('isLogin');
        navigate('/');
      } else if (response.status === 500) {
        console.error('500: 내부 서버 오류');
      }

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
          if (item.id === '5') {
            return (
              <div className={styles.gridBoardName}>
                <div>{'보드네임'}</div>
              </div>
            );
          } else return (
            <div
              key={item.id}
              className={item.id === '5' ? '' : `${gridItemClassName} ${styles.hoverable}`}
              onClick={() => handleGridItemClick(index)}
            >
              {item.id !== '5' && (
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
      {readOnly ? (
        <div className={styles.btnContainer}>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              handleNavigateToMyVisionBoardList();
            }}
          >
            목록으로 이동
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => setReadOnly(false)}
          >
            보드 수정
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              handleBoardDelete();
            }}
          >
            보드 삭제
          </button>
        </div>
      ) : (
        <div className={styles.btnContainer}>
          <button className={styles.deleteBtn} onClick={handleDeleteButtonClick}>
            선택 삭제
          </button>
          <button className={styles.prevBtn} onClick={() => alert('handleNavigateToBoardName')}>
            이전
          </button>
          <form id="visionBoard" onSubmit={handleUploadCompleteButton} className={styles.completeForm} name='visionBoardData'>
            <button name="visionBoardData" type="submit" className={styles.completeBtn}>
              완료
            </button>
            {gridItems.map((item, index) => (
              <>
                {item.img && (
                  <input
                    type="hidden"
                    name={`image${index + 1}`}
                    value={item.img}
                  />)}
                {item.text && (
                  <input
                    type="hidden"
                    name={`description${index + 1}`}
                    value={item.text}
                  />)}
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
      )}
      {
        isModalOpen && (
          <EditVisionBoardModal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            handleImageAndTextSelect={handleImageAndTextSelect}
            readOnly={readOnly}
            dataLength={dataLength}
            gridItems={gridItems}
            selectedGrid={selectedGrid}
            prevImgGrid={prevImgGrid}
            id={id}
          />
        )
      }
    </div >
  );
}