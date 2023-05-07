import React from "react";
import ApexCharts from "react-apexcharts";
import Carousel from "react-material-ui-carousel";
import "./skilline.css";
import Cat from "../assets/cat.png";
import CatIcon from "../assets/catIcon.png";
import App from "../assets/app.png";
import Chat from "../assets/chat.png";
import Haeundae from "../assets/haeundae.jpg";
import CatFood from "../assets/catFood.png";
import SittingCat from "../assets/sittingCat.png";
import Cats01 from "../assets/cats01.jpg";
import Cats02 from "../assets/cats02.jpg";
import Tnr01 from "../assets/tnr01.PNG";
import Tnr02 from "../assets/tnr02.PNG";
import Tnr03 from "../assets/tnr03.PNG";
import Tools from "../assets/tools.png";
import News01 from "../assets/news01.jpg";
import News02 from "../assets/news02.png";
import News03 from "../assets/news03.png";
import News04 from "../assets/news04.png";

export default function Landing() {
  const series = [
    {
      name: "전체",
      data: [6, 7, 7, 7, 8, 10, 12],
    },
    {
      name: "중성화 X",
      data: [4, 4, 3, 3, 2, 1, 1],
    },
  ];

  return (
    <div className="w-screen h-screen">
      <div className="bg-cream pt-20 ">
        <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start">
          <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
            <h1
              data-aos="fade-right"
              data-aos-once="true"
              className="w-full my-4 text-5xl font-bold leading-tight"
            >
              <span className="text-yellow-500">길</span>에서 태어났지만 우리의{" "}
              <span className="text-yellow-500">이웃</span>입니다
            </h1>
            <p
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay={300}
              className="w-full leading-normal text-2xl mb-8"
            >
              길고양이와의 공존을 위한 제안{" "}
              <span className="text-yellow-500 font-bold text-4xl">냥그릇</span>
            </p>
            <div
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay={700}
              className="w-full flex items-center justify-center"
            >
              <button className="flex flex-row gap-5 lg:mx-0 bg-yellow-500 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                <svg
                  className="w-5 h-5 ml-2 mt-1"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5751 12.8097C23.2212 13.1983 23.2212 14.135 22.5751 14.5236L1.51538 27.1891C0.848878 27.5899 5.91205e-07 27.1099 6.25202e-07 26.3321L1.73245e-06 1.00123C1.76645e-06 0.223477 0.848877 -0.256572 1.51538 0.14427L22.5751 12.8097Z"
                    fill="#FFFFFF"
                  />
                </svg>
                홍보영상 보러가기
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 lg:-mt-10 relative" id="girl">
            <img
              data-aos="fade-up"
              data-aos-once="true"
              className="w-10/12 mx-auto 2xl:-mb-20"
              src={Cat}
              alt=""
            />
            <div
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-once="true"
              className="absolute top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52 animate-floating2"
            >
              <div className="flex flex-col justify-center w-[220px] h-[70px] bg-white rounded-lg shadow-lg">
                <div className="flex flex-row gap-3">
                  <img
                    src={CatIcon}
                    alt=""
                    className="w-[40px] h-[40px] ml-3"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold">실시간 관리</div>
                    <div className="text-[0.8rem]">자동 급식 & 개체수 측정</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay={400}
              data-aos-once="true"
              className="absolute top-20 right-10 sm:right-24 sm:top-28 md:top-36 md:right-32 lg:top-32 lg:right-16 animate-floating"
            >
              <svg
                className="h-16 sm:h-24"
                viewBox="0 0 149 149"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d)">
                  <rect
                    x={40}
                    y={32}
                    width={69}
                    height={69}
                    rx={14}
                    fill="#F3627C"
                  />
                </g>
                <rect
                  x="51.35"
                  y="44.075"
                  width="47.3"
                  height="44.85"
                  rx={8}
                  fill="white"
                />
                <path
                  d="M74.5 54.425V78.575"
                  stroke="#F25471"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
                <path
                  d="M65.875 58.7375L65.875 78.575"
                  stroke="#F25471"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
                <path
                  d="M83.125 63.9125V78.575"
                  stroke="#F25471"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
                <defs>
                  <filter
                    id="filter0_d"
                    x={0}
                    y={0}
                    width={149}
                    height={149}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy={8} />
                    <feGaussianBlur stdDeviation={20} />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.825 0 0 0 0 0.300438 0 0 0 0 0.396718 0 0 0 0.26 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-once="true"
              className="absolute bottom-14 -left-4 sm:left-2 sm:bottom-20 lg:bottom-24 lg:-left-4 animate-floating"
            >
              <div className="flex flex-col justify-center w-[230px] h-[100px] bg-white rounded-lg shadow-lg">
                <div className="flex flex-row gap-3">
                  <img
                    src={App}
                    alt=""
                    className="w-[40px] h-[40px] ml-3 mt-3"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold">관리 앱 출시</div>
                    <div className="text-[0.8rem]">
                      실시간 상태 관리 및 보고
                    </div>
                    <div className="text-[0.8rem] text-slate-300">
                      (앱스토어 "냥그릇" 검색)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay={600}
              data-aos-once="true"
              className="absolute bottom-20 md:bottom-48 lg:bottom-52 -right-6 lg:right-8 animate-floating2"
            >
              <div className="flex flex-col justify-center w-[250px] h-[70px] bg-white rounded-lg shadow-lg">
                <div className="flex flex-row gap-3">
                  <img src={Chat} alt="" className="w-[40px] h-[40px] ml-3" />
                  <div className="flex flex-col">
                    <div className="font-bold">실시간 소통</div>
                    <div className="text-[0.8rem]">
                      커뮤니티를 통한 양방향 소통
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-40 relative">
          <svg
            className="xl:h-40 xl:w-full"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              fill="currentColor"
            />
          </svg>
          <div className="bg-white w-full h-20 -mt-px" />
        </div>
      </div>
      {/* 협약 지역 */}
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center mb-3 text-gray-400 font-medium">
            협약 지역
          </h1>
          <div className="flex flex-row justify-items-center">
            <img src={Haeundae} alt="" className="h-20 mx-auto" />
          </div>
        </div>
        {/* 하는 일 */}
        <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
          <h1 className="font-bold text-black my-3 text-2xl">
            냥그릇은 <span className="text-yellow-500">어떤 일</span>을 하나요?
          </h1>
          <p className="leading-relaxed text-gray-500">
            지역주민과 길고양이들의 공존을 위해 다양한 일들을 진행하고 있습니다.
          </p>
        </div>
        {/* 카드 */}
        <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
          <div
            data-aos="fade-up"
            className="bg-white shadow-xl p-6 text-center rounded-xl"
          >
            <div
              style={{ background: "#5b72ee" }}
              className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            >
              <img src={CatFood} alt="" className="w-8 h-8" />
            </div>
            <h1 className="text-xl mb-3 lg:px-14 text-black font-bold">
              길고양이 자동 급식소
            </h1>
            <p className="px-4 text-gray-500 text-center">
              무분별한 급식소 운영으로 인한 갈등을 줄이고자 지자체와의 사회적
              합의를 통해 위치를 지정하고, 관리인을 선별하여 급식소가 방치되지
              않게 지속적인 관리를 목적으로 하고 있습니다.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay={150}
            className="bg-white shadow-xl p-6 text-center rounded-xl"
          >
            <div
              style={{ background: "#f48c06" }}
              className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            >
              <img src={SittingCat} alt="" className="w-8 h-8" />
            </div>
            <h1 className="text-xl mb-3 lg:px-14 text-black font-bold">
              자동 개체수 파악
            </h1>
            <p className="px-4 text-gray-500">
              이미지 분류 기술을 통해 길고양이들의 개체 수를 파악하고, 고도화된
              AI 모델을 통해 길고양이들의 중성화 여부를 판단해줍니다. 차트를
              통해 시각화하여 관리 편의성을 높여주는 것을 목적으로 하고
              있습니다.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay={300}
            className="bg-white shadow-xl p-6 text-center rounded-xl"
          >
            <div
              style={{ background: "#29b9e7" }}
              className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            >
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 55 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-xl mb-3 lg:px-14 text-black lg:h-14 font-bold">
              실시간 소통
            </h1>
            <p className="px-4 text-gray-500">
              "냥그릇" 어플 이용자들간의 실시간 커뮤니티 기능을 통해
              길고양이들의 현재 상태를 공유하고 이용자들간의 유대감을 쌓을뿐만
              아니라 쉽고 간단한 절차를 통해 관리자와도 소통할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mt-28">
          <div
            data-aos="flip-down"
            className="text-center max-w-screen-md mx-auto"
          >
            <h1 className="text-3xl font-bold mb-4">
              어떤 <span className="text-yellow-500">기술</span>을 사용하나요?
            </h1>
            <p className="text-gray-500">
              개체수 및 중성화 여부 파악을 위한 IoT 기술과 여러 AI 모델들 뿐만
              아니라 관리자를 위한 Web, 사용자들을 위한 App 등 다양한 분야의
              기술들을 사용하고 있습니다.
            </p>
          </div>
          {/* 기술 상세 */}
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-7"
          >
            <div className="relative md:w-5/12">
              <img className="rounded-2xl w-full h-full" src={Cats01} alt="" />
              <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col gap-3 w-60">
                    <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                      IoT
                    </button>
                    <button className="rounded-full text-white text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out bg-yellow">
                      AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative md:w-5/12">
              <img className="rounded-2xl w-full h-full" src={Cats02} alt="" />
              <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col gap-3 w-60">
                    <button className="rounded-full text-white text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out bg-yellow">
                      Web
                    </button>
                    <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                      App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 차트 */}
        <div className="sm:flex items-center sm:space-x-8 mt-36">
          <div data-aos="fade-right" className="sm:w-1/2 relative">
            <div className="bg-yellow-500 rounded-full absolute w-12 h-12 z-0 -left-4 -top-3 animate-pulse" />
            <h1 className="font-semibold text-2xl relative z-50 text-black lg:pr-10">
              2023년 5월 3째 주{" "}
              <span className="text-yellow-500">개체수 현황</span>
            </h1>
            <p className="py-5 lg:pr-32">
              해운대구에 설치된 냥그릇 개체 수 현황입니다.
            </p>
            <p className="py-5 lg:pr-32">
              좌측 상단 아이콘 버튼을 클릭하면 개체 수 현황 정보를 이미지 또는
              엑셀 파일로 다운로드 할 수 있습니다.
            </p>
            <a href className="underline">
              더보기
            </a>
          </div>
          <div data-aos="fade-left" className="sm:w-1/2 relative mt-10 sm:mt-0">
            <div
              style={{ background: "#23bdee" }}
              className="animate-floating w-24 h-24 absolute rounded-lg z-0 -top-3 -left-3"
            />
            <div className="w-full h-full bg-white  rounded-lg z-40 relative">
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
                  colors: ["#FFCD4A", "#c495fd"],
                  title: {
                    align: "left",
                    style: {
                      color: "black",
                    },
                  },
                  grid: {
                    row: {
                      colors: ["transparent"],
                      opacity: 0.5,
                    },
                  },
                  legend: {
                    labels: {
                      colors: "black",
                    },
                  },
                  xaxis: {
                    categories: [
                      "11일",
                      "12일",
                      "13일",
                      "14일",
                      "15일",
                      "16일",
                      "17일",
                      "18일",
                    ],
                    labels: {
                      style: {
                        colors: "black",
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: "#FFFFFF",
                      },
                    },
                  },
                }}
              ></ApexCharts>
            </div>
            <div className="bg-yellow-500 w-40 h-40 animate-floating absolute rounded-lg z-10 -bottom-3 -right-3" />
          </div>
        </div>
        {/* 중성화 실태 */}
        <div className="md:flex mt-40 md:space-x-10 items-start">
          <div data-aos="fade-down" className="md:w-7/12 relative">
            <div
              style={{ background: "#33efa0" }}
              className="w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"
            />
            <div
              style={{ background: "#33d9ef" }}
              className="w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"
            />
            <div className="relative z-50 animate-floating w-full h-[44vh] m-auto max-w-[70vh] rounded-xl bg-transparent">
              <Carousel autoPlay={false} indicators={false}>
                <img
                  src={Tnr01}
                  alt=""
                  className="w-full h-[39vh] rounded-xl"
                />

                <img
                  src={Tnr02}
                  alt=""
                  className="w-full h-[39vh] rounded-xl"
                />

                <img
                  src={Tnr03}
                  alt=""
                  className="w-full h-[39vh] rounded-xl"
                />
              </Carousel>
            </div>

            <div
              style={{ background: "#5b61eb" }}
              className="w-36 h-36 rounded-full absolute z-0 right-16 -bottom-1 animate-pulse"
            />
            <div
              style={{ background: "#f56666" }}
              className="w-5 h-5 rounded-full absolute z-0 right-52 bottom-1 animate-ping"
            />
          </div>
          <div
            data-aos="fade-down"
            className="md:w-5/12 mt-20 md:mt-0 text-gray-500"
          >
            <h1 className="text-2xl font-semibold text-black">
              <span className="text-yellow-500">냥그릇</span>을 통해 중성화된
              길고양이
            </h1>
            <p className="py-5 lg:pr-32">중성화 과정</p>
            <div className="flex items-center space-x-5 my-5">
              <div className="flex-shrink bg-white shadow-lg rounded-full p-3 px-5 flex items-center justify-center bg-red text-white font-bold">
                1
              </div>
              <p>
                설치된 냥그릇 기기에서 포착된 고양이의 중성화 여부를 파악합니다.
              </p>
            </div>
            <div className="flex items-center space-x-5 my-5">
              <div className="flex-shrink bg-white shadow-lg rounded-full p-3 px-5 flex items-center justify-center bg-yellow-500 text-white font-bold">
                2
              </div>
              <p>
                평균 방문 시간대를 확인하고 해당 시간대에 맞춰 포획 준비를
                합니다.
              </p>
            </div>
            <div className="flex items-center space-x-5 my-5">
              <div className="flex-shrink bg-white shadow-lg rounded-full p-3 px-5 flex items-center justify-center bg-yellow text-white font-bold">
                3
              </div>
              <p>포획 후 협약된 인근 동물병원에서 중성화 완료 후 풀어줍니다.</p>
            </div>
          </div>
        </div>
        {/* 기술 전체 */}
        <div className="mt-24 flex flex-col md:flex-row items-start md:space-x-10">
          <div data-aos="zoom-in-right" className="md:w-6/12">
            <img
              className="w-full h-[35vh] md:w-12/12 mx-auto"
              src={Tools}
              alt=""
            />
          </div>
          <div data-aos="zoom-in-left" className="md:w-6/12">
            <div className="flex items-center space-x-20 mb-5">
              <span className="border border-gray-300 w-14 absolute" />
              <h1 className="text-gray-400 tracking-widest text-sm">
                사용 기술 목록
              </h1>
            </div>
            <h1 className="font-semibold text-black text-2xl lg:pr-52">
              19가지 이상의 다양한 기술을 통해{" "}
              <span className="text-yellow-500">냥그릇</span>이 탄생했습니다.
            </h1>
            <p className="text-gray-500 mt-5 lg:pr-20">
              <span className="font-bold">AI: </span>&nbsp;Python, Yolov5,
              MobileNetv2, CVAT, OpenCV
            </p>
            <p className="text-gray-500 mt-2 lg:pr-20">
              <span className="font-bold">APP/BACK: </span>&nbsp;Kotlin, Spring,
              MySQL
            </p>
            <p className="text-gray-500 mt-2 lg:pr-20">
              <span className="font-bold">FRONT: </span>&nbsp;React, React
              Query, Recoil, TypeScript, Tailwind
            </p>
            <p className="text-gray-500 mt-2 lg:pr-20">
              <span className="font-bold">ETC: </span>&nbsp;AWS EC2, AWS S3,
              Jenkins, FastAPI, Arduino
            </p>
            <button className="px-5 py-3 border border-yellow-500 text-yellow-500 font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full">
              사용기술 전체
            </button>
          </div>
        </div>
        {/* 길고양이 관련 뉴스 */}
        <div data-aos="zoom-in" className="mt-40 text-center">
          <h1 className="text-black text-2xl font-semibold">
            길고양이 관련 최근 뉴스
          </h1>
        </div>
        <div
          data-aos="zoom-in-up"
          className="my-14 flex flex-col lg:flex-row lg:space-x-20"
        >
          <div className="lg:w-6/12">
            <img className="w-full mb-6 rounded-xl" src={News01} alt="" />
            <h1 className="text-gray-800 font-semibold my-3 text-xl">
              "캣맘 싫어서"…인천 길고양이 급식소 훼손한 중학생 검거
            </h1>
            <p
              className="content-detail text-gray-500 mb-3 w-full overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `<div>인천의 한 중학생이 길고양이 급식소를 둔기로 파손하는 일이 벌어졌다. 3일 경찰 등에 따르면 인천 서부경찰서는 길고양이 급식소를 둔기로 파손한 혐의(특수재물손괴)로 중학생 A 군(14)을 불구속 입건해 검찰에 송치했다. A 군은 지난 2월 인천시 서구 청라동의 한 아파트 단지에서 쇠 파이프를 휘둘러 길고양이 급식소 2개를 잇달아 훼손한 혐의를 받는다.</div>`,
              }}
            ></p>
          </div>
          <div className="lg:w-7/12 flex flex-col justify-between mt-12 space-y-5 lg:space-y-0 lg:mt-0">
            <div className="flex space-x-5">
              <div className="w-4/12">
                <div className="relative">
                  <img className="rounded-xl w-full" src={News02} alt="" />
                </div>
              </div>
              <div className="w-8/12">
                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                  길고양이와 공존하는 법
                </h1>
                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md truncate">
                  서울 강남의 한 아파트 단지에 설치된 길고양이 급식소.
                  길고양이에게 밥을 주는 사람을 지칭하는 ‘캣맘’이 약속된 시간에
                  먹이를 갖다 놓자, 잠시 후 길고양이가 와서 맛있게 밥을 먹는다.
                  아파트 단지 안에 이렇게 길고양이 급식소를 들이는 과정은 간단치
                  않다. 아파트 대표 회의에서 과반수의 동의를 얻고 나면
                  지자체에서는 관리자로 캣맘을 지정하고 교육한다. 설치 후에도
                  캣맘은 급식소로 찾아오는 길고양이의 중성화 수술을 도와야 한다.
                </p>
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="w-4/12">
                <div className="relative">
                  <img className="rounded-xl w-full" src={News03} alt="" />
                </div>
              </div>
              <div className="w-8/12">
                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                  길고양이 급식소 설치… 주민들끼리 날선 신경전
                </h1>
                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md truncate">
                  최근 일부 아파트 단지를 드나드는 길고양이의 관리 문제를 두고
                  주민들이 이견을 보이고 있다. 27일 중부일보 취재진이 수원시 내
                  아파트 단지들을 살펴본 결과, 다수의 단지에 길고양이를 위한
                  보금자리와 급식소가 설치돼 있었다. 이와 함께 단지를
                  돌아다니거나 화단에 앉아 있고, 설치된 급식소로 들어가는
                  길고양이들도 목격됐다.
                </p>
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="w-4/12">
                <div className="relative">
                  <img className="rounded-xl w-full" src={News04} alt="" />
                </div>
              </div>
              <div className="w-8/12">
                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                  길냥이들의 보금자리 설치로 입주민-길고양이 서로 ‘윈윈’
                </h1>
                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md truncate">
                  길고양이가 차를 긁거나 지나가는 시민에게 공격을 하는 등의
                  피해를 입히는 경우가 계속 발생하고 있다. 그런 가운데 몇몇
                  아파트는 길고양이들의 보금자리를 설치해 입주민들의 피해가
                  오히려 줄었다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 후원 */}
      <div className="relative flex flex-col justify-center text-center w-full h-full bg-page1">
        <div className="absolute rounded-2xl z-40 w-full top-10">
          <a
            href="https://paypal.me/e204catbowl?country.x=KR&locale.x=ko_KR"
            class="relative"
          >
            <button className="text-[1.5rem] font-bold px-20 py-5 bg-white border border-yellow-500 text-yellow font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full hover:bg-yellow hover:text-white">
              후원하기
            </button>
          </a>
        </div>
        <div className="w-[100%] h-40 bg-page1"></div>
        <div className="absolute w-[100%] h-[15%] bg-page1 z-10 bottom-0"></div>
        <div className="absolute w-[30%] h-[20%] bg-page1 z-10 top-32"></div>
        <div className="absolute w-[20%] h-[20%] bg-page1 z-10 top-32 right-16 rounded-[80px]"></div>
        <iframe
          className="frame z-0 w-[80%] h-[70%] m-auto"
          title="Cat in a Box"
          frameborder="0"
          src="https://sketchfab.com/models/726067b21dcc439895aec9c3d2410881/embed?autostart=1"
        ></iframe>
      </div>
      {/* Footer */}
      <footer className="bg-page1">
        <div className="max-w-lg mx-auto">
          <div className="flex pb-12 justify-center text-white items-center px-20 sm:px-36">
            <div className="relative">
              <h1 className="font-bold text-xl pr-5 relative z-50">OurKitty</h1>
              <svg
                className="w-11 h-11 absolute -top-2 -left-3 z-40"
                viewBox="0 0 79 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.9645 2.94975C37.9171 0.997129 41.0829 0.997127 43.0355 2.94975L76.0502 35.9645C78.0029 37.9171 78.0029 41.0829 76.0503 43.0355L43.0355 76.0502C41.0829 78.0029 37.9171 78.0029 35.9645 76.0503L2.94975 43.0355C0.997129 41.0829 0.997127 37.9171 2.94975 35.9645L35.9645 2.94975Z"
                  stroke="#FFCD4A"
                  strokeWidth={2}
                />
              </svg>
            </div>
          </div>
          <div className="text-center pb-16 pt-5">
            <label className="text-white font-semibold">
              냥그릇 소식 알림받기
            </label>
            <div className="px-5 sm:px-0 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 justify-center mt-3">
              <input
                type="text"
                placeholder="연락처 입력"
                className="rounded-full py-2 pl-5 bg-white border border-white outline-none"
              />
              <button
                type="submit"
                className="text-white w-40 sm:w-auto mx-auto sm:mx-0 font-semibold px-5 py-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(105.5deg, #FFCD4A 19.57%, #F48C06 78.85%)",
                }}
              >
                알림 받기
              </button>
            </div>
          </div>
          <div className="flex items-center text-sm justify-center text-white">
            <a href className="pr-3">
              삼성 청년 SW 아카데미
            </a>
          </div>
          <div className="text-center text-white my-3 text-sm pb-10">
            © SSAFY 8기 자율 프로젝트 "냥그릇"
          </div>
        </div>
      </footer>
    </div>
  );
}
