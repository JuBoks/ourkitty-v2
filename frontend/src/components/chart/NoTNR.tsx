import React from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

export default function NoTNR() {

  // Create a new Date object with today's date
  const today = new Date(); 
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    const dayString = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    return `${date.toLocaleDateString('ko-KR', { month: 'short' })} ${dayString}`;
  }).reverse();


  const options: ApexOptions = {
    chart: {
      toolbar: { show: true },
      zoom: {
      enabled: false,
      },
    },
    markers: {
      size: 3,
      colors: ['#FFA500'],
      shape: "circle",
      radius: 2,
      hover: {
        size: 4,
        sizeOffset: 3
      }
    },
    stroke: {
        curve: 'straight',
        width: 2,
        colors: ['#FFA500'],
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
      categories: dates
    },
    yaxis: {
        min: 0,
        max: 10,
        tickAmount: 10,
    },
    tooltip: {
        enabled: false,
    },
    grid: {
        borderColor: '#f1f1f1',
    },
  };
    
  const series = [
    {
        name: '중성화 안된 고양이',
        data: [3, 2, 3, 3, 2, 1, 2]
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <h1 className="text-[1.3rem] font-bold">중성화가 필요한 고양이</h1>
      <div className="h-[90%] w-full">
        <Chart height="100%" options={options} type="line" series={series} />
      </div>
    </div>
  );
}
