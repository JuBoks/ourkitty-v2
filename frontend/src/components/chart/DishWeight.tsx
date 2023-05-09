import React, { useState } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";

export default function DishWeight({ foodAmountList }: { foodAmountList: number[] }) {

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
      width: 5,
    },
    colors: ["#9FA9D8"],
    grid: {
      row: {
        colors: ["#f5f5f5f5", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 3,
      colors: ["#9FA9D8"],
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
      max : 100,
      tickAmount: 5,
      labels: {
        style: {
          colors: `${isDark ? "#FFFFFF" : "#000000"}`,
        },
      },
    },
  };
    

  const series = [{
    name: "사료 잔여량",
    data: foodAmountList
  },
  ]

  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1.3rem] font-bold" >사료 잔여량 (%)</h1>
      <div className="h-[90%] w-full">
        <Chart height="100%" options={options} type="line" series={series} />
      </div>
    </div>
  );
}
