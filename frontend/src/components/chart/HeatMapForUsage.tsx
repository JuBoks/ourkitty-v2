import React, { useState } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

interface ArrayType {
  name: string;
  data: DataType[];
}

interface DataType {
  x: string;
  y: number;
  imgs: ImgType[];
}

interface ImgType {
  imgUrl: string;
  createdDate: string;
}

export default function HeatMapForUsage() {

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  // const [series, setSeries] = useState<ArrayType[]>([]);
  const [time, setTime] = useState<string>();
  const [selectData, setSelectData] = useState<DataType>();

  const handleDetailModalOn = () => {
    setDetailModalOpen(true);
  }
  const handleDetailModalOff = () => {
    setDetailModalOpen(false);
  }

  const options: ApexOptions = {
    chart: {
        events: {
            click: function (event, chartContext, config) {
                var seriesIndex = parseInt(event.target.getAttribute("i"));
                var dataPointIndex = parseInt(event.target.getAttribute("j"));

                setTime(config.globals.seriesNames[seriesIndex]);
                setSelectData(config.globals.initialSeries[seriesIndex].data[dataPointIndex]);
                handleDetailModalOn();

            }
        },
        toolbar: {
            show: true,
            tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false
            },
        }
    },
    plotOptions: {
        heatmap: {
            colorScale: {
                ranges: [
                    {
                        from: -1,
                        to: 2,
                        color: "#FCF2F6",
                        name: "0~2회"
                    },
                    {
                        from: 3,
                        to: 5,
                        color: "#FFC2D7",
                        name: "3~5회"
                    },
                    {
                        from: 6,
                        to: 9,
                        color: "#FD94B7",
                        name: "6~9회"
                    },
                    {
                        from: 10,
                        to: 100,
                        color: "#FF4081",
                        name: "10회 이상"
                    }
                ]
            }
        }
    },
    dataLabels: { enabled: false },
    xaxis: {
        labels: {
            formatter: (value: string) => {
                return value.substring(5,).replace("-", "/")
            },
            show: true,
            trim: true,
            style: {
                fontSize: "12px",
                cssClass: "apexcharts-xaxis-label",
                fontFamily: 'Droid Sans',
                fontWeight: 900,
            },
            offsetX: 0,
            offsetY: 0
        }
    },
    yaxis: {
        reversed: false,
    },
}


// Create a new Date object with today's date
const today = new Date(); 
const dates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() - (index +1) );
  const dayString = date.toLocaleDateString('ko-KR', { day: 'numeric' });
  return `${date.toLocaleDateString('ko-KR', { month: 'short' })} ${dayString}`;
}).reverse();

const series = [
  {
    name: dates[0],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 1, imgs: [] },
      { x: "05:00", y: 2, imgs: [] },
      { x: "07:00", y: 3, imgs: [] },
      { x: "09:00", y: 4, imgs: [] },
      { x: "11:00", y: 5, imgs: [] },
      { x: "13:00", y: 6, imgs: [] },
      { x: "15:00", y: 7, imgs: [] },
      { x: "17:00", y: 8, imgs: [] },
      { x: "19:00", y: 0, imgs: [] },
      { x: "21:00", y: 0, imgs: [] },
      { x: "23:00", y: 0, imgs: [] },
    ],
  },
  {
    name: dates[1],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 1, imgs: [] },
      { x: "05:00", y: 2, imgs: [] },
      { x: "07:00", y: 0, imgs: [] },
      { x: "09:00", y: 4, imgs: [] },
      { x: "11:00", y: 5, imgs: [] },
      { x: "13:00", y: 6, imgs: [] },
      { x: "15:00", y: 7, imgs: [] },
      { x: "17:00", y: 0, imgs: [] },
      { x: "19:00", y: 9, imgs: [] },
      { x: "21:00", y: 0, imgs: [] },
      { x: "23:00", y: 0, imgs: [] },
    ],
  },
  {
    name: dates[2],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 1, imgs: [] },
      { x: "05:00", y: 2, imgs: [] },
      { x: "07:00", y: 3, imgs: [] },
      { x: "09:00", y: 4, imgs: [] },
      { x: "11:00", y: 5, imgs: [] },
      { x: "13:00", y: 6, imgs: [] },
      { x: "15:00", y: 0, imgs: [] },
      { x: "17:00", y: 0, imgs: [] },
      { x: "19:00", y: 0, imgs: [] },
      { x: "21:00", y: 0, imgs: [] },
      { x: "23:00", y: 0, imgs: [] },
    ],
  },
  {
    name: dates[3],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 0, imgs: [] },
      { x: "05:00", y: 0, imgs: [] },
      { x: "07:00", y: 3, imgs: [] },
      { x: "09:00", y: 4, imgs: [] },
      { x: "11:00", y: 0, imgs: [] },
      { x: "13:00", y: 0, imgs: [] },
      { x: "15:00", y: 5, imgs: [] },
      { x: "17:00", y: 0, imgs: [] },
      { x: "19:00", y: 5, imgs: [] },
      { x: "21:00", y: 0, imgs: [] },
      { x: "23:00", y: 5, imgs: [] },
    ],
  },
  {
    name: dates[4],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 5, imgs: [] },
      { x: "05:00", y: 1, imgs: [] },
      { x: "07:00", y: 1, imgs: [] },
      { x: "09:00", y: 2, imgs: [] },
      { x: "11:00", y: 5, imgs: [] },
      { x: "13:00", y: 0, imgs: [] },
      { x: "15:00", y: 3, imgs: [] },
      { x: "17:00", y: 4, imgs: [] },
      { x: "19:00", y: 4, imgs: [] },
      { x: "21:00", y: 5, imgs: [] },
      { x: "23:00", y: 5, imgs: [] },
    ],
  },
  {
    name: dates[5],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 5, imgs: [] },
      { x: "05:00", y: 0, imgs: [] },
      { x: "07:00", y: 1, imgs: [] },
      { x: "09:00", y: 2, imgs: [] },
      { x: "11:00", y: 2, imgs: [] },
      { x: "13:00", y: 3, imgs: [] },
      { x: "15:00", y: 3, imgs: [] },
      { x: "17:00", y: 0, imgs: [] },
      { x: "19:00", y: 4, imgs: [] },
      { x: "21:00", y: 5, imgs: [] },
      { x: "23:00", y: 3, imgs: [] },
    ],
  },
  {
    name: dates[6],
    data: [
      { x: "01:00", y: 2, imgs: [] },
      { x: "03:00", y: 5, imgs: [] },
      { x: "05:00", y: 1, imgs: [] },
      { x: "07:00", y: 1, imgs: [] },
      { x: "09:00", y: 2, imgs: [] },
      { x: "11:00", y: 5, imgs: [] },
      { x: "13:00", y: 10, imgs: [] },
      { x: "15:00", y: 15, imgs: [] },
      { x: "17:00", y: 14, imgs: [] },
      { x: "19:00", y: 8, imgs: [] },
      { x: "21:00", y: 5, imgs: [] },
      { x: "23:00", y: 5, imgs: [] },
    ],
  },
]
  
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <h1 className="text-[1.3rem] font-bold">고양이 방문 시간대</h1>
      <div className="h-[90%] w-full" >
        <Chart height="100%" options={options} type="heatmap" series={series}/>
      </div>
    </div>
  );
}