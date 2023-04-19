import React from "react";
import DefaultDiv from "../DefaultDiv";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../../recoil/states/page";

export default function BowlChart() {
  const isDark = useRecoilState(darkModeState)[0];
  const generateData = (count: any, yrange: any) => {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  };

  const series = [
    {
      name: "0",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "2",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "4",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "6",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "8",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "10",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "12",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "14",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "16",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "18",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "20",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "22",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: "24",
      data: generateData(7, {
        min: 0,
        max: 90,
      }),
    },
  ];

  const series2 = [
    {
      name: "Remain",
      data: [90, 80, 70, 65, 40, 30, 20],
    },
  ];

  const handleChart = () => {
    console.log("Chart Click");
  };

  return (
    <DefaultDiv>
      <div className="relative flex flex-col my-2 h-[98%] w-[950px] rounded-xl dark:bg-WebDarkBackground2">
        <h1 className="m-5 text-[2rem] font-bold dark:text-white">
          냥그릇 차트
        </h1>
        <div className="flex flex-col justify-center m-auto w-[90%] h-full mb-3">
          <div className="h-[50%]">
            <ApexCharts
              series={series}
              type="heatmap"
              options={{
                chart: {
                  zoom: {
                    enabled: false,
                  },
                  events: {
                    click: handleChart,
                  },
                },
                dataLabels: {
                  enabled: false,
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
                colors: [`${isDark ? "#29325B" : "#9FA9D8"}`],
              }}
              width={"100%"}
              height={"100%"}
            ></ApexCharts>
            <h1 className="text-[1.2rem] font-semibold text-center dark:text-white">
              방문 시간대
            </h1>
          </div>
          <div className="h-[50%] mt-10">
            <ApexCharts
              type="line"
              series={series2}
              options={{
                chart: {
                  zoom: {
                    enabled: false,
                  },
                  width: "100%",
                  height: "10px",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
                colors: [`${isDark ? "#29325B" : "#9FA9D8"}`],
                grid: {
                  row: {
                    colors: ["#f5f5f5f5", "transparent"],
                    opacity: 0.5,
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
              사료통 무게
            </h1>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
