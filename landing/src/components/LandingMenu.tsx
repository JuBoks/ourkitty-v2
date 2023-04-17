import React from "react";
import CatGif from "../assets/cat-gif01.gif";
import { useRecoilState } from "recoil";
import { selectMenu } from "../recoil/landingState";

export default function LandingMenu({ setClickMenu }: any) {
  const [page, setPage] = useRecoilState(selectMenu);

  return (
    <div className="relative w-screen h-screen">
      <hr className="fixed w-screen top-[5vh] border-2 border-MainColor z-10" />
      <div
        className="fixed px-[51px] py-[62px] bg-MainColor rounded-full right-[1vw] top-[2vh] z-20 font-bold text-[1rem] cursor-pointer rotate-45 transition ease-in-out duratioin-5000 hover:transform-none"
        onClick={() => setClickMenu((cur: boolean) => !cur)}
      >
        MAIN
      </div>
      <div className="fixed w-[10px] bg-MainColor top-0 bottom-0 right-[4vh] my-[5vh] opacity-40 z-20"></div>
      <div className="relative flex flex-col gap-20 justify-center text-center h-screen text-[3vh] font-bold font-noto">
        <div>
          <span
            className="manu-cat cursor-pointer"
            onClick={() => {
              setClickMenu((cur: boolean) => !cur);
              setPage(0);
            }}
          >
            냥그릇 소개
          </span>
        </div>
        <div>
          <span
            className="manu-cat cursor-pointer"
            onClick={() => {
              setClickMenu((cur: boolean) => !cur);
              setPage(1);
            }}
          >
            냥그릇 활동
          </span>
        </div>
        <div>
          <span
            className="manu-cat cursor-pointer"
            onClick={() => {
              setClickMenu((cur: boolean) => !cur);
              setPage(2);
            }}
          >
            냥그릇 현황
          </span>
        </div>
        <div>
          <span
            className="manu-cat cursor-pointer"
            onClick={() => {
              setClickMenu((cur: boolean) => !cur);
              setPage(3);
            }}
          >
            후원 안내
          </span>
        </div>
      </div>
      <div className="absolute bottom-5 right-10">
        <img className="w-[150px] h-[150px]" src={CatGif} alt="" />
      </div>
      <hr className="fixed w-screen bottom-[5%] border-2 border-MainColor" />
      <p className="fixed w-screen text-MainColor ml-5 text-xl bottom-[1vh] font-noto">
        Contact Us <span className=" ml-4 font-bold">catbowl@gmail.com</span>
      </p>
    </div>
  );
}
