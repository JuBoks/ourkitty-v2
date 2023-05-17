import React, {useState} from "react";
import ApexCharts from "react-apexcharts";
import Carousel from "react-material-ui-carousel";
import "./landing.css";
import Cat from "../assets/cat.png";
import CatIcon from "../assets/catIcon.png";
import App from "../assets/app.png";
import Chat from "../assets/chat.png";
import Haeundae from "../assets/haeundae.jpg";
import CatFood from "../assets/catFood.png";
import SittingCat from "../assets/sittingCat.png";
import People from "../assets/people.png";
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
    
    const [webPage, setWebPage] = useState(true);
    const openWebPage = () => {
      setWebPage(true)
    };
    const openAppPage = () => {
      setWebPage(false)
    };
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
      name: "전체",
      data: [5,6,7,10,9,8,6],
    },
    {
      name: "중성화 X",
      data: [2,3,3,5,5,5,5],
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
        {/* 길고양이 관련 뉴스 */}
        <div data-aos="zoom-in" className="mt-40 text-center">
          <h1 className="text-black text-2xl font-semibold">
          <span className="text-yellow-500">길고양이 </span> 관련 최근 뉴스
          </h1>
        </div>
        <div
          data-aos="zoom-in-up"
          className="my-14 flex flex-col lg:flex-row lg:space-x-20"
        >
          <div className="lg:w-6/12">
            <img className="w-full mb-6 rounded-xl" src={News01} alt="" />
            <a
              href="https://www.seoul.co.kr/news/newsView.php?id=20221007015004"
              target="_blank"
              rel="noreferrer"
            >
              <h1 className="text-gray-800 font-semibold my-3 text-xl cursor-pointer">
                <span className="hover:border-b-[2px]">
                  [단독] 수술대에서 죽은 아기 고양이… 포획업자·수의사 통장엔 나랏돈 꽂혔다
                </span>
              </h1>
            </a>
            <p
              className="content-detail text-gray-500 mb-3 w-full overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `<div>지난해 목포시가 위탁해 5개 동물병원이 중성화 수술을 한 길고양이 325마리 중 약 27%(87마리)가 임신묘 등 규정상 수술하면 안 되는 대상이었다.</div>`,
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
                <a
                  href="https://www.iusm.co.kr/news/articleView.html?idxno=955985"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                    <span className="hover:border-b-[2px]">
                      10년째 TNR 하면서 ‘개체 수 조사’도 없었다
                    </span>
                  </h1>
                </a>
                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md truncate">
                현재 길고양이 목시조사는 정해진 장소에서 5회 이상, 1회에 3∼4시간씩 눈으로 관찰해 기록하는 방법으로 이뤄지고 있다.
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
                <a
                  href="http://www.joongboo.com/news/articleView.html?idxno=363589741"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                    <span className="hover:border-b-[2px]">
                      농식품부, 길고양이 중성화 효과성·전문성 강화
                    </span>
                  </h1>
                </a>
                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md truncate">
                농림축산식품부는 길고양이 개체 수 조절을 위해 길고양이 중성화(TNR) 사업의 개선방안을 3.10.(금) 발표하였다.
                - 정부는 중성화 사업을 통해 ’18~22년까지 길고양이 35만 8천여 마리에 대해 중성화를 실시하였고, 
                7대 특·광역시(세종 제외)의 길고양이 개체 수(㎢당 마릿수)를 조사한 결과 
                길고양이 숫자는 ’20년도 273마리에서 ’22년도 233마리로 감소하였으며, 자묘(새끼 고양이)의 비율은 ’20년도 29.7%에서 ’22년도 19.6%로 감소한 것으로 파악되었음.
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
                <a
                  href="http://www.civicnews.com/news/articleView.html?idxno=35273"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                    <span className="hover:border-b-[2px]">
                      길냥이들의 보금자리 설치로 입주민-길고양이 서로 ‘윈윈’
                    </span>
                  </h1>
                </a>
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
        {/* 하는 일 */}
        <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-48">
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
            <h1 className="text-xl mb-8 lg:px-14 text-black font-bold">
              길고양이 자동 급식소
            </h1>
            <p className="px-4 text-sm text-gray-500 text-left">
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
            <h1 className="text-xl mb-8 lg:px-14 text-black font-bold">
              개체 수 파악 자동화
            </h1>
            <p className="px-4 text-sm text-gray-500 text-left">
              AI 모델을 통해 길고양이들의 개체 수와 중성화 여부를 판단해줍니다. 
              차트를 통해 시각화하여 관리 편의성을 높여주는 것을 목적으로 하고
              있습니다.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="bg-white shadow-xl p-6 text-center rounded-xl"
          >
            <div
              style={{ background: "#29b9e7" }}
              className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            >
              <img src={People} alt="" className="w-8 h-8" />
            </div>
            <h1 className="text-xl mb-8 lg:px-14 text-black font-bold">
              실시간 소통
            </h1>
            <p className="px-4 text-gray-500 text-sm text-left">
              "냥그릇" 어플로 이용자들간의 실시간 커뮤니티 기능을 통해
              길고양이들의 현재 상태를 공유하고 이용자들간의 유대감을 쌓을뿐만
              아니라 쉽고 간단한 절차를 통해 관리자와도 소통할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mt-36">
          <div
            data-aos="flip-down"
            className="text-center max-w-screen-md mx-auto"
          >
            <h1 className="text-3xl font-bold mb-4">
              어떤 <span className="text-yellow-500">기술</span>을 사용하나요?
            </h1>
            <p className="text-gray-500">
              개체수 및 중성화 여부 파악을 위한 IoT 기술과 여러 AI 모델들 뿐만
              아니라 관리자를 위한 Web, <br/> 사용자들을 위한 App 등 다양한 분야의
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
                    <button onClick={openWebPage} className="rounded-full text-white text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out bg-yellow">
                      Web
                    </button>
                    <button onClick={openAppPage} className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                      App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 차트 */}
        {webPage ? <div className="sm:flex items-center sm:space-x-8 mt-36 mb-36">
          <div data-aos="fade-right" className="sm:w-1/2 relative ml-12">
            <div className="bg-yellow-500 rounded-full absolute w-12 h-12 z-0 -left-4 -top-3 animate-pulse" />
            <h1 className="font-semibold text-2xl relative z-50 text-black lg:pr-10 mb-8">
              2023년 5월 3째 주{" "}
              <span className="text-yellow-500">개체수 현황</span>
            </h1>
            <p className="py-5 lg:pr-32">
              <span className="text-yellow-500 font-bold text-2xl">부산시</span>
              에 설치된 냥그릇이 파악한 길고양이 개체 수 <br/> 및 중성화 수 현황입니다.
            </p>
            <p className="py-5 lg:pr-32">
              우측 상단 버튼(≡)을 클릭하면 개체 수 현황 정보를 이미지 또는
              엑셀 파일로 다운로드 할 수 있습니다.
            </p>
            <span className="underline">더보기</span>
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
                    categories: dates,
                    labels: {
                      style: {
                        colors: "black",
                      },
                    },
                  },
                  yaxis: {
                    min : 0,
                    max : 12,
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
          : 
          <div></div>
        }
        {/* 중성화 실태
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
              <div className="flex-shrink bg-red shadow-lg rounded-full p-3 px-5 flex items-center justify-center bg-red text-white font-bold">
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
        </div> */}
        {/* 기술 전체 */}
        <div className="mt-24 mb-32 flex flex-col md:flex-row items-start md:space-x-10">
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
            <h1 className="font-semibold text-black text-2xl">
              <span className="text-yellow-500">19가지 이상의 기술</span>들로
              냥그릇이 탄생했습니다.
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
      </div>
      {/* 후원 */}
      <div className="relative flex flex-col justify-center text-center w-full h-full bg-page1">
        <div className="absolute rounded-2xl z-40 w-full top-10">
          <a
            href="https://paypal.me/e204catbowl?country.x=KR&locale.x=ko_KR"
            className="relative"
            target="_blank"
            rel="noreferrer"
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
          <div className="flex items-center text-sm justify-center text-white">
            <p className="pr-3">삼성 청년 SW 아카데미</p>
          </div>
          <div className="text-center text-white my-3 text-sm pb-10">
            © SSAFY 8기 자율 프로젝트 "냥그릇"
          </div>
        </div>
      </footer>
    </div>
  );
}
