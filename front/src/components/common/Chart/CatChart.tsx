import React from "react";
import DefaultDiv from "../DefaultDiv";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../../recoil/states/page";
export default function CatChart() {
  const isDark = useRecoilState(darkModeState)[0];

  const series = [
    {
      name: "전체",
      data: [90, 80, 70, 65, 40, 30, 20],
    },
    {
      name: "중성화",
      data: [83, 93, 24, 38, 67, 52, 28],
    },
  ];
  const series1 = [
    {
      name: "전체",
      data: [90, 80, 70, 65, 40, 30, 20],
    },
  ];
  const series2 = [
    {
      name: "중성화",
      data: [83, 93, 24, 38, 67, 52, 28],
    },
  ];

  return (
    <DefaultDiv>
      <div className="relative flex flex-col gap-2 h-[98%] w-[950px] rounded-xl dark:bg-WebDarkBackground2 p-2">
        <h1 className="mx-5 my-2 text-[2rem] font-bold dark:text-white">
          개체 수 관리
        </h1>
        <div className="m-auto w-[98%] h-[50%]">
          <ApexCharts
            type="line"
            series={series}
            options={{
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
              },
              colors: ["#FFCD4A", "#EC5E98"],
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
                categories: ["일", "월", "화", "수", "목", "금", "토"],
                labels: {
                  style: {
                    colors: `${isDark ? "#FFFFFF" : "#000000"}`,
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: `${isDark ? "#FFFFFF" : "#000000"}`,
                  },
                },
              },
            }}
            width={"100%"}
            height={"80%"}
          ></ApexCharts>
        </div>
        <div className="flex flex-row w-[98%] h-[50%] gap-3 m-auto">
          <div className="h-full w-[50%]">
            <ApexCharts
              type="line"
              series={series1}
              options={{
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
                },
                colors: ["#FFCD4A"],
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
                  categories: ["일", "월", "화", "수", "목", "금", "토"],
                  labels: {
                    style: {
                      colors: `${isDark ? "#FFFFFF" : "#000000"}`,
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: `${isDark ? "#FFFFFF" : "#000000"}`,
                    },
                  },
                },
              }}
              width={"100%"}
              height={"80%"}
            ></ApexCharts>
            <h1 className="text-[1.2rem] mt-5 font-semibold text-center dark:text-white">
              전체 개체 수
            </h1>
          </div>
          <div className="h-full w-[50%]">
            <ApexCharts
              type="line"
              series={series2}
              options={{
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
                },
                colors: ["#EC5E98"],
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
                  categories: ["일", "월", "화", "수", "목", "금", "토"],
                  labels: {
                    style: {
                      colors: `${isDark ? "#FFFFFF" : "#000000"}`,
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: `${isDark ? "#FFFFFF" : "#000000"}`,
                    },
                  },
                },
              }}
              width={"100%"}
              height={"80%"}
            ></ApexCharts>
            <h1 className="text-[1.2rem] mt-5 font-semibold text-center dark:text-white">
              중성화 개체 수
            </h1>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
