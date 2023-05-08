import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import Modal from "../common/Modal";
import ModalContent from "../common/Modal";

export default function BowlChart() {
  const isDark = useRecoilState(darkState)[0];
  const [modalOpen, setModalOpen] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState(0);

  // Create a new Date object with today's date
  const today = new Date(); 
  const dates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() - (index +1) );
  const dayString = date.toLocaleDateString('ko-KR', { day: 'numeric' });
  return `${date.toLocaleDateString('ko-KR', { month: 'short' })} ${dayString}`;
  }).reverse();

  const generateData = (count: any, yrange: any) => {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = dates[i];
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
        max: 24,
      }),
    },
    {
      name: "1",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "2",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "3",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "4",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "5",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "6",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "7",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "8",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "9",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "10",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "11",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "12",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "13",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "14",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "15",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "16",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "17",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "18",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "19",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "20",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "21",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "22",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    },
    {
      name: "23",
      data: generateData(7, {
        min: 0,
        max: 24,
      }),
    }
  ];

  const handleChart = (xaxis: number, yaxis: number) => {
    const x = dates;
    const y = Array.from({ length: 24 }, (_, index) => index);
    setDay(x[xaxis]);
    setTime(y[yaxis]);

    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-1">
    <h1 className="text-[1.3rem] font-bold">고양이 방문 시간대</h1>
    <div className="h-[100%] w-full" >
    <ApexCharts
      series={series}
      type="heatmap"
      options={{
        chart: {
          zoom: {
            enabled: false,
          },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              handleChart(config.dataPointIndex, config.seriesIndex);
            },
          },
        },
        dataLabels: {
          enabled: false,
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
          min: 0,
          max: 23,
          tickAmount: 24,
          labels: {
            formatter: function (value: number) {
              return value + '';
            },
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
    <Modal open={modalOpen} close={closeModal} header="이용 고객 사진">
      <ModalContent day={day} time={time} />
    </Modal>
    </div>
  </div>
  );
}
