import React from "react";
import LightNotFound from "../../assets/light_notfound.gif";
import DarkNotFound from "../../assets/dark_notfound.gif";
import { useRecoilState } from "recoil";
import { darkState } from "recoil/page";
export default function NotFound() {
  const isDark = useRecoilState(darkState)[0];

  return (
    <div className="w-full h-full flex flex-col dark:bg-DarkBackground2">
      <img
        src={isDark ? DarkNotFound : LightNotFound}
        alt=""
        className="m-auto"
      />
      <div className="m-auto text-[2rem] font-bold dark:text-white">
        요청하신 페이지를 찾을 수 없습니다.
      </div>
    </div>
  );
}
