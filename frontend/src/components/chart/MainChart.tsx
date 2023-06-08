import React, { useState, useEffect } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";

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
      width: [5, 5, 3], // Set different widths for each line
      dashArray: [0, 0, 5], // Set the dash array for the third line
    },
    colors: ["#ffcd4a", '#c495fd', '#ff0000'], 
    grid: {
      row: {
        colors: ["#f5f5f5f5", "transparent"],
        opacity: 0.5,
      },
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
        formatter: function (value) {
          return Math.round(value).toString(); // Convert the label to an integer
        },
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
    name: "중성화 x",
    data: noTnrCountList
  },
  {
    name: "권역별 TNR 목표",
    data: catCountList.map(num => Math.round(num * 0.75))
  }
  ]

  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1rem] font-bold" >개체 수 / 중성화 수 (마리)</h1>
      <div className="h-[90%] w-full">
        <Chart height="100%" options={options} type="line" series={series} />
      </div>
    </div>
  );
}
