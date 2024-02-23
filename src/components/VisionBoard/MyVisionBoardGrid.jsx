import React, { useCallback, useState, useEffect, useMemo } from 'react';
import EditVisionBoardModal from "./Modal/EditVisionBoardModal";

export default function MyVisionBoardGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [readOnly, setReadOnly] = useState(true)
    return (
        <>
            <button onClick={() => setIsModalOpen(!isModalOpen)}>수정 모달 테스트 </button>
            {isModalOpen && (
                <EditVisionBoardModal
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    readOnly={readOnly}
                // handleImageAndTextSelect={handleImageAndTextSelect}
                // setGridItems={setGridItems}
                // gridItems={gridItems}
                // selectedGrid={selectedGrid}
                // prevImgGrid={prevImgGrid}
                // id={id}
                // dataLength={dataLength}
                />
            )}

        </>
    )
}