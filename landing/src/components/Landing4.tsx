import React from "react";
import "./Landing.css";

export default function Landing4() {
  return (
    <div className="relative flex flex-col gap-3 justify-center text-center w-screen h-screen bg-MainColor">
      <p className="text-[2vh] font-bold font-noto">
        <span className="cat-bowl text-[8vh]">냥그릇</span>은{" "}
      </p>
      <p className="text-[2vh] font-bold font-noto">
        <span className="text-[4vh]">길고양이</span>와{" "}
        <span className="text-[4vh]">지역주민</span>이
      </p>
      <p className="text-[2vh] font-bold font-noto">
        <span className="text-[5vh] text-white">공존</span>하는 문화를 만듭니다.
      </p>
      <div className="mt-20 h-20">
        <button
          className="paypal text-MainColor bg-white px-20 py-5 rounded-[50px] font-bold text-[3vh]"
          onClick={() => window.open("https://paypal.me/e204catbowl")}
        >
          후원하기
        </button>
      </div>
    </div>
  );
}
