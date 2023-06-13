import React, { useState } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";

export default function DishInfo() {


  return (
    <div className="w-full h-full gap-1 p-1 text-[0.7rem] flex flex-col justify-between">
      <div>담당캣맘 : <span className="font-bold">박정호</span></div>
      <div>최초 설치일 : <br/><span className="font-bold">2023-02-19</span></div>
      <div>중성화율 : <br/><span className="font-bold">20%</span></div>
      <div>마지막 촬영 시간 : <br/> <span className="font-bold">2023-05-19 14시 34분</span> </div>
      <div className="flex align-center">
        <div>관리상태 : </div>
        <div className="flex items-center justify-center ml-[1rem] mt-[0.4rem] w-2 h-2 text-sm bg-State1 rounded-full"></div>
      </div>
    </div>
  );
}
