import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import Modal from "../common/Modal";
import { useQuery } from "react-query";
import { selectedButtonState } from "../../recoil/chart";
import { getCatUserList } from "../../apis/api/chart";
import CatImages from './CatImages';


interface ImgType {
  imgUrl: string;
}

export default function HeatMapChart() {

  // 냥그릇 선택 iD 가져오기
  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);
  
  // 선택한 id로 API 요청
  const { data, isLoading } = useQuery({
    queryKey: ["getCatUserList", selectedButton],
    queryFn: () => getCatUserList(selectedButton),
  });

  // 어제부터 7일
  const today = new Date(); 
  const dates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() - (index +1) );
  const dayString = date.toLocaleDateString('ko-KR', { day: 'numeric' });
  return `${date.toLocaleDateString('ko-KR', { month: 'short' })} ${dayString}`;
  }).reverse();

  // 데이터 load
  type Data = {
    x: string;
    y: any;
    imgs: any;
  };
  
  type Series = {
    name: string;
    data: Data[];
  };
  
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      const newData = [];
      for (let i = 0; i < 24; i++) {
        const hourlyData = data[i];
        const newHourlyData = [];
        for (let j = 0; j < 7; j++) {
          const x_data = dates[j];
          const y_date = hourlyData[j].size;
          const imgs_date = hourlyData[j].imageList;
          newHourlyData.push({ x : x_data , y : y_date, imgs : imgs_date });
        }
        newData.push({ name: `${i}시`, data: newHourlyData });
      }
      setSeries(newData);
    }
  }, [data]);

  const isDark = useRecoilState(darkState)[0];
  const [modalOpen, setModalOpen] = useState(false);

  const [day, setDay] = useState("");
  const [time, setTime] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleChart = (xaxis: number, yaxis: number) => {
    const x = dates;
    const y = Array.from({ length: 24 }, (_, index) => index);
    const imgList: string[] = []; 
    setDay(x[xaxis]);
    setTime(y[yaxis]);
    const dataPoint = series[yaxis].data[xaxis];
    dataPoint.imgs.forEach((img: string) => {
      imgList.push(img); // push the path of each image to imgList
    });
    setImages(imgList); // set the state of images to imgList
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  if (isLoading || data === undefined) return null;

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
        plotOptions: {
          heatmap: {
            colorScale: {
                ranges: [
                    {
                        from: -1,
                        to: 2,
                        color: "#E1E5F4",
                        name: "0~2회"
                    },
                    {
                        from: 3,
                        to: 5,
                        color: "#BFC7E5",
                        name: "3~5회"
                    },
                    {
                        from: 6,
                        to: 9,
                        color: "#C8CFE8",
                        name: "6~9회"
                    },
                    {
                        from: 10,
                        to: 100,
                        color: "#97A4D2",
                        name: "10회 이상"
                    }
                ]
            }
          }
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
    <h1 className="text-[1.3rem] font-bold p-3" >{day} {time}시 촬영된 고객들</h1>
      <CatImages images={images} />    
      </Modal>
    </div>
  </div>
  );
}
