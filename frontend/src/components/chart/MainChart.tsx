import React, { useState, useEffect } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { selectedButtonState } from "../../recoil/chart";
import { getCatNum } from "../../apis/api/chart";
import { useQuery } from "react-query";


export default function MainChart({ catCountList, noTnrCountList }: { catCountList: number[], noTnrCountList: number[] }) {

  const isDark = useRecoilState(darkState)[0];

  // Create a new Date object with today's date
  const today = new Date(); 
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (index +1) );
    const dayString = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    return `${date.toLocaleDateString('ko-KR', { month: 'short' })} ${dayString}`;
  }).reverse();

  
  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
      width: "100%",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    colors: ["#EC5E98", '#29325B'],
    grid: {
      row: {
        colors: ["#f5f5f5f5", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 3,
      colors: ["#EC5E98", '#29325B'],
      shape: "circle",
      radius: 2,
      hover: {
        size: 4,
        sizeOffset: 3
      }
    },
    legend: {
      labels: {
        colors: `${isDark ? "#FFFFFF" : "#000000"}`,
      },
    },
    xaxis: {
      categories: dates,
      labels: {
        style: {
          colors: `${isDark ? "#FFFFFF" : "#000000"}`,
        },
      },
    },
    yaxis: {
      min : 0,
      max : 10,
      tickAmount: 5,
      labels: {
        style: {
          colors: `${isDark ? "#FFFFFF" : "#000000"}`,
        },
      },
    },
  };
    

  const series = [{
    name: "전체 개체 수",
    data: catCountList
  },
  {
    name: "중성화가 필요한 고양이",
    data: noTnrCountList
  }
  ]

  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1.3rem] font-bold" >개체 수 / 중성화 수</h1>
      <div className="h-[90%] w-full">
        <Chart height="100%" options={options} type="line" series={series} />
      </div>
    </div>
  );
}
