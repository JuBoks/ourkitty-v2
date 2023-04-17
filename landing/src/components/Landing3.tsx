import React from "react";
import KoreaMap from "./Map/KoreaMap";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { selectSido } from "../recoil/selectMap";

export default function Landing3() {
  const landingState = useRecoilState(selectSido)[0];

  const sidoName = landingState.sidoName;
  const data1 = landingState.data1;
  const data2 = landingState.data2;

  const series = [
    {
      name: "전체 개체 수",
      data: data1,
    },
    {
      name: "중성화 개체 수",
      data: data2,
    },
  ];

  return (
    <div className="relative overflow-hidden flex flex-row gap-5 justify-center text-center w-screen h-screen bg-[pink]">
      <div className="m-auto basis-1/2">
        <KoreaMap />
      </div>
      <div className="m-auto basis-1/2 overflow-hidden">
        <div className="pr-20">
          <ApexCharts
            type="line"
            series={series}
            options={{
              chart: {
                zoom: {
                  enabled: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },
              colors: ["#0C4876", "#AEC5D8"],
              title: {
                text: `${sidoName}`,
                align: "left",
              },
              grid: {
                row: {
                  colors: ["#f5f5f5f5", "transparent"],
                  opacity: 0.5,
                },
              },
              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            }}
          ></ApexCharts>
        </div>
      </div>
    </div>
  );
}
