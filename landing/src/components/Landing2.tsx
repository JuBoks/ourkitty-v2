import React from "react";
import Cat01 from "../assets/cat01.jpg";
import Cat02 from "../assets/cat02.jpg";
import Cat03 from "../assets/cat03.jpg";

export default function Landing2() {
  return (
    <div className="w-screen h-screen bg-[#F9DF74]">
      <div className="flex flex-col justify-center pt-40 h-[40%]">
        <p className="align-middle text-[4vh] text-center font-bold font-noto">
          <span className="text-[8vh] text-MainColor">냥그릇</span>은
        </p>
        <p className="align-middle text-[4vh] text-center font-bold font-noto">
          어떤 일을 하나요?
        </p>
      </div>
      <div className="flex flex-row h-[55%]">
        <div className="basis-1/3 text-center relative cursor-pointer">
          <p className="absolute z-20 top-3 left-5 text-white font-noto text-[2vh] font-bold">
            사료 공급
          </p>
          <img
            className="w-full h-full opacity-40 hover:opacity-100"
            src={Cat01}
            alt=""
          />
        </div>
        <div className="basis-1/3 text-center relative cursor-pointer">
          <p className="absolute z-20 top-3 left-5 text-white font-noto text-[2vh] font-bold">
            개체 수 확인
          </p>
          <img
            className="w-full h-full opacity-40 hover:opacity-100"
            src={Cat02}
            alt=""
          />
        </div>
        <div className="basis-1/3 text-center relative cursor-pointer">
          <p className="absolute z-20 top-3 left-5 text-white font-noto text-[2vh] font-bold">
            중성화 보조
          </p>
          <img
            className="w-full h-full opacity-40 hover:opacity-100"
            src={Cat03}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
