import React, { useState, useEffect } from "react";
import Regist from "../components/dish/Regist";
import MyDish from "../components/dish/MyDish";
import ManageLog from "../components/dish/ManageLog";
import DishWeight from "../components/chart/DishWeight";
import HeatMapChart from "../components/chart/HeatMapChart";
import CatButton from "../components/chart/CatButton";
import MainChart from "./../components/chart/MainChart";
import TnrPercent from "./../components/chart/TnrPercent";
import { dishInfo } from "../recoil/dish";
import { getCatNum } from "../apis/api/chart";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import DishInfoCard from "components/dish/DishInfoCard";


export default function DashBoard() {
  const selectedButton = useRecoilState(dishInfo)[0];
  const [foodAmountList, setFoodAmountList] = useState([]);
  const [batteryAmountList, setBatteryAmountList] = useState([]);
  const [catCountList, setCatCountList] = useState([]);
  const [noTnrCountList, setNoTnrCountList] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getCatNum", selectedButton],
    queryFn: () => getCatNum(selectedButton.dishId),
  });

  useEffect(() => {
    if (data !== undefined) {
      setFoodAmountList(data["foodAmountList"]);
      setBatteryAmountList(data["batteryAmountList"]);
      setCatCountList(data["catCountList"]);
      setNoTnrCountList(data["noTnrCountList"]);
    }
  }, [data, selectedButton]);

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      <div className="w-[50%] h-full flex flex-col gap-2">
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MyDish />
        </div>
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <ManageLog />
        </div>
      </div>

      <div className="w-[50%] h-full flex flex-col gap-2">
        <div className="w-full h-[20%] flex flex-row gap-2">
          <div className="w-[50%] h-full bg-white p-1 rounded-lg dark:bg-DarkBackground2 dark:text-white flex flex-col ">
            관할 급식소
            <div className="w-full text-center text-[5rem] font-bold" style={{ fontFamily: 'Roboto' }}>
              <span className="mr-2">3</span>
              <span className="text-2xl">개</span>
            </div>          
          </div>
          <div className="w-[50%] h-full bg-white rounded-lg dark:bg-DarkBackground2 dark:text-white">
            중성화율
            <TnrPercent
              catCountList={catCountList}
              noTnrCountList={noTnrCountList}
            />
          </div>
        </div>
        <div className="w-full h-[40%] bg-white p-1 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <div className="w-full h-full flex flex-col dark:bg-DarkBackground2 dark:text-white">
            <DishInfoCard/>
          </div>
        </div>
        <div className="w-full h-[40%] bg-white p-1 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
              <MainChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
