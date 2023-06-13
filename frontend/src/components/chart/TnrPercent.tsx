import React, { useState } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";

export default function TnrPercent({ catCountList, noTnrCountList }: { catCountList: number[], noTnrCountList: number[] }) {

  const isDark = useRecoilState(darkState)[0];

  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          },
          track: {
            background: 'gray',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: '3rem',
              fontWeight: 'bold',
              color: isDark ? '#FFFFFF' : '#000000',
            }
          }
        },
      },
      fill: {
        colors: ['#9FA9D8'], 
      },
      labels: ['중성화율 (%)'],
  };
    
  const series = [70]

  return (
    <div className="w-[80%] h-[80%] ml-[1rem] flex items-center justify-center">
        <Chart options={options} type="radialBar" series={series} />
    </div>
  );
}
