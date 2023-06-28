import CatButton from "components/chart/CatButton";
import DishInfo from 'components/chart/DishInfo';
import HeatMapChart from "components/chart/HeatMapChart";
import MainChart from 'components/chart/MainChart';
import React, { useState } from "react";

import ChartCalendar from "components/chart/ChartCalendar";
import ModalConfirm from "components/common/ModalConfirm";
import "css/Calendar.css";
import 'react-calendar/dist/Calendar.css';
import { useRecoilState } from "recoil";
import { selectedButtonState, selectedSerialNumberState } from "recoil/chart";
import { darkState } from "recoil/page";
import ChartIoTImage from "components/chart/ChartIoTImage";
import ChartIoTImageList from "components/chart/ChartIotImageList";

export default function Chart() {

  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(
    selectedSerialNumberState
  );
  

  const isDark = useRecoilState(darkState)[0];

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };
  const [modalOpen2, setModalOpen2] = useState(false);
  const closeModal2 = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen2(false);
  };  

  // if (isLoading || data === undefined) return (<div className="loading-parent"><Loading/></div>);

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-2">
      <div className="w-[16%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <CatButton/>
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-[33%] flex flex-row gap-2">
          <ChartCalendar />
          <div className="w-[40%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <DishInfo/>
          </div>
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <div className="flex flex-row justify-between">
            <div className="font-bold">
              촬영된 고양이
            </div>
            <div>
              <button className="mr-[1rem] text-[0.8rem] text-gray-400" onClick={() => setModalOpen(true)}>
                  다시하기
              </button>
              <ModalConfirm open={modalOpen} close={closeModal} header="다시하기">
                <h1 className="text-[1.3rem] font-bold p-3" >다시 하시겠습니까?</h1>
              </ModalConfirm>
              <button className="finish text-[0.8rem] text-gray-400" onClick={() => setModalOpen2(true)}>
                  검수완료
              </button>
              <ModalConfirm open={modalOpen2} close={closeModal2} header="이용 고양이 사진">
                <h1 className="text-[1.3rem] font-bold p-3" >확인 완료</h1>
              </ModalConfirm>
            </div>
          </div>
          <ChartIoTImageList />
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MainChart/>
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <HeatMapChart/>
        </div>
      </div>
    </div>
  );
}
