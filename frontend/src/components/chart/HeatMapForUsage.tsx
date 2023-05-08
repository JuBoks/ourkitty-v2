import React, { useState } from "react";
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import Modal from "../common/Modal";
import ModalContent from "../common/Modal";

// interface ArrayType {
//   name: string;
//   data: DataType[];
// }

interface DataType {
  x: string;
  y: number;
  imgs: string[];
}

export default function HeatMapForUsage() {

  // const [series, setSeries] = useState<ArrayType[]>([]);
  const [time, setTime] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);

  const [day, setDay] = useState("");
  const handleChart = (xaxis: number, yaxis: number) => {
    
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

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
      events: {
        dataPointSelection: (config) => {
          handleChart(config.dataPointIndex, config.seriesIndex);
        },
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
    legend:{
      show: true
    },
    tooltip: {
      enabled: true,
      // followCursor: true,
      // intersect: false,
      x: {
        show: true,
        format: 'dd MMM'
      },
      y: {
        
        title: {
            formatter: function(value){
                return value + ':00';
            }
        }
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
        formatter: function (value: string) {
          return value;
        },
        style: {
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
          fontFamily: 'Droid Sans',
          fontWeight: 900,
        }
      }
    },
    yaxis: {
      min : 0,
      max : 24,
      reversed: false,
      labels: {
        formatter: function (value: number) {
          return value + ':00';
        },
        style: {
          fontSize: "12px",
          cssClass: "apexcharts-yaxis-label",
          fontFamily: 'Droid Sans',
          fontWeight: 900,
        },
      }
    }
  }

const series = [
  {
    name: "0",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "2",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "4",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "6",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "8",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "10",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "12",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "14",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: ['http://k8e2031.p.ssafy.io:8000/static/yolo/jeongho_2023-05-01_23-05-16.png', 'http://k8e2031.p.ssafy.io:8000/static/yolo/iujeong_2023-04-30_09-10-26.png']  },
      { x: dates[3], y: 8 , imgs: ['http://k8e2031.p.ssafy.io:8000/static/yolo/jeongho_2023-05-01_23-05-16.png', 'http://k8e2031.p.ssafy.io:8000/static/yolo/iujeong_2023-04-30_09-10-26.png']  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "16",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: ['http://k8e2031.p.ssafy.io:8000/static/yolo/jeongho_2023-05-01_23-05-16.png', 'http://k8e2031.p.ssafy.io:8000/static/yolo/iujeong_2023-04-30_09-10-26.png']  },
      { x: dates[3], y: 8 , imgs: ['http://k8e2031.p.ssafy.io:8000/static/yolo/jeongho_2023-05-01_23-05-16.png', 'http://k8e2031.p.ssafy.io:8000/static/yolo/iujeong_2023-04-30_09-10-26.png']  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "18",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "20",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  },
  {
    name: "22",
    data: [
      { x: dates[0], y: 3 , imgs: []  },
      { x: dates[1], y: 3 , imgs: []  },
      { x: dates[2], y: 5 , imgs: []  },
      { x: dates[3], y: 8 , imgs: []  },
      { x: dates[4], y: 1 , imgs: [] },
      { x: dates[5], y: 4 , imgs: [] },
      { x: dates[6], y: 42 , imgs: [] },
    ]
  }
]


  
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <h1 className="text-[1.8rem] font-bold">고양이 방문 시간대</h1>
      <div className="h-full w-full" >
        <Chart height="100%" options={options} type="heatmap" series={series}/>
      </div>
    </div>
  );
}