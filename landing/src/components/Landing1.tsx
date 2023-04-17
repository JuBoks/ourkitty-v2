import React from "react";
import Logo from "../assets/LogoWeb.png";

export default function Landing1() {
  return (
    <div className="flex flex-col justify-center text-center w-screen h-screen bg-[#C2EABD]">
      <p className="mr-60 text-[2vh] font-bold font-noto">길고양이와</p>
      <p className="text-[2vh] font-bold font-noto">
        지역주민이{" "}
        <span className="text-MainColor font-bold text-[4vh] font-noto">
          공존
        </span>
        하는 삶
      </p>
      <div>
        <img className="w-[30vh] h-[30vh] m-auto my-10" src={Logo} alt="" />
      </div>
      <p className="text-[5vh] font-bold font-noto">냥그릇</p>
    </div>
  );
}
