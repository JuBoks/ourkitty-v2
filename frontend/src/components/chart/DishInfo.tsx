import React, { useEffect, useState } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { selectedButtonState } from "../../recoil/chart";

export default function DishInfo() {

  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);
  const [currentDateTime, setCurrentDateTime] = useState("");

  type DishInfo = {
    name: string;
    install: string;
    TnrPercent: string;
    lastData: string;
  };

  const DishInfoFirst: DishInfo = {name: '이미현, 김정윤', install: '2023-02-19', TnrPercent: '20%', lastData: '2023-05-19 14시 34분'};
  const DishInfoSecond: DishInfo = {name: '송주영', install: '2023-02-18', TnrPercent: '40%', lastData: '2023-05-20 14시 34분'};
  const DishInfoThird: DishInfo = {name: '박정호', install: '2023-04-10', TnrPercent: '70%', lastData: '2023-05-20 14시 34분'};

  let selectedDishInfo: DishInfo | undefined;

  if (selectedButton === 1) {
    selectedDishInfo = DishInfoFirst;
  } else if (selectedButton === 2) {
    selectedDishInfo = DishInfoSecond;
  } else if (selectedButton === 3) {
    selectedDishInfo = DishInfoThird;
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");

      const formattedDateTime = `${year}년 ${month}월 ${day}일  ${hour}:${minute}`;
      setCurrentDateTime(formattedDateTime);
    };

    const timer = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(timer); // Clean up interval on component unmount
  }, []);

  return (
    <div className="w-full h-full gap-1 p-1 text-[0.7rem] flex flex-col justify-between">
      {selectedDishInfo && (
        <>
          <div>담당캣맘: <span className="font-bold">{selectedDishInfo.name}</span></div>
          <div>최초 설치일: <br /><span className="font-bold">{selectedDishInfo.install}</span></div>
          <div>중성화율: <br /><span className="font-bold">{selectedDishInfo.TnrPercent}</span></div>
          <div>마지막 촬영 시간: <br /> <span className="font-bold">{currentDateTime}</span></div>
          <div className="flex align-center">
            <div>관리상태: </div>
            <div className="flex items-center justify-center ml-[1rem] mt-[0.4rem] w-2 h-2 text-sm bg-State1 rounded-full"></div>
          </div>
        </>
      )}
    </div>
  );
}
