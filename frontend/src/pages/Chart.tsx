import React, { useState, useEffect } from "react";
import DishWeight from "../components/chart/DishWeight";
import HeatMapChart from "../components/chart/HeatMapChart";
import CatButton from "../components/chart/CatButton";
import MainChart from './../components/chart/MainChart';
import ChartCalendar from './../components/chart/ChartCalendar';
import DishInfo from './../components/chart/DishInfo';

import { selectedButtonState } from "../recoil/chart";
import { getCatNum } from "../apis/api/chart";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import Loading from "../components/common/LoadingHeatMap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import "../css/Calendar.css";
import Modal from "components/common/Modal";

export default function Chart() {

  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);
  const [foodAmountList, setFoodAmountList] = useState([])
  const [batteryAmountList, setBatteryAmountList] = useState([])
  const [catCountList, setCatCountList] = useState([])
  const [noTnrCountList, setNoTnrCountList] = useState([])

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

  const { data, isLoading } = useQuery({
    queryKey: ["getCatNum", selectedButton],
    queryFn: () => getCatNum(selectedButton),
  });

  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (data !== undefined) {
      setFoodAmountList(data["foodAmountList"])
      setBatteryAmountList(data["batteryAmountList"])
      setCatCountList(data["catCountList"])
      setNoTnrCountList(data["noTnrCountList"])
    }
  }, [data, selectedButton]);

  if (isLoading || data === undefined) return (<div><Loading/></div>);

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-2">
      <div className="w-[16%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <CatButton/>
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-[33%] flex flex-row gap-2">
          <div className="w-[60%] h-full bg-white p-1 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <Calendar className="custom-calendar h-[90%]" value={value} />
          </div>
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
              <Modal open={modalOpen} close={closeModal} header="다시하기">
                <h1 className="text-[1.3rem] font-bold p-3" >다시 하시겠습니까?</h1>
              </Modal>
              <button className="finish text-[0.8rem] text-gray-400" onClick={() => setModalOpen2(true)}>
                  검수완료
              </button>
              <Modal open={modalOpen2} close={closeModal2} header="이용 고객 사진">
                <h1 className="text-[1.3rem] font-bold p-3" >확인 완료</h1>
              </Modal>
            </div>
          </div>
          <div className="w-full h-[90%] p-1 flex flex-row gap-4 overflow-auto">
            <img src={'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/jeongho/317106d4-57d0-4034-aae9-5778929403cb.jpg'}  className="w-full h-full" />
            <img src={'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/jeongho/707804a3-75ce-40aa-94f9-0d8eb7de02d4.jpg'}  className="w-full h-full" />
            <img src={'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/jeongho/4c0d29e4-b06d-4932-8aa6-209e06a23c23.jpg'}  className="w-full h-full" />
          </div>
          
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MainChart catCountList={catCountList} noTnrCountList={noTnrCountList}/>
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
