import React from "react";
import "./Landing.css";

export default function Landing4() {
  return (
    <div className="relative flex flex-col justify-center text-center w-full h-full bg-page1">
      <div className="w-[100%] h-40 bg-page1"></div>
      <div className="absolute w-[100%] h-[15%] bg-page1 z-10 bottom-0"></div>
      <div className="absolute w-[20%] h-[20%] bg-page1 z-10 top-32"></div>
      <div className="absolute w-[20%] h-[20%] bg-page1 z-10 top-32 right-16 rounded-[80px]"></div>
      <iframe
        className="frame z-0 w-[80%] h-[70%] m-auto"
        title="Cat in a Box"
        frameborder="0"
        src="https://sketchfab.com/models/726067b21dcc439895aec9c3d2410881/embed?autostart=1"
      ></iframe>
      <div className="absolute rounded-2xl z-40 w-full top-40">
        <a
          href="https://paypal.me/e204catbowl?country.x=KR&locale.x=ko_KR"
          class="relative px-20 py-6 rounded-2xl inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span class="p-80 rotate-[-40deg] bg-Yellow absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-28 ml-28 group-hover:ml-5 group-hover:mb-80 group-hover:translate-x-0"></span>
          <span class="relative rounded-2xl w-full text-left text-black text-[2rem] font-noto font-bold transition-colors duration-300 ease-in-out group-hover:text-white">
            후원하기
          </span>
        </a>
      </div>
    </div>
  );
}
