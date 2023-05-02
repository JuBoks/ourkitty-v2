import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkState } from "../recoil/page";

export default function MainLayout() {
  const isDark = useRecoilState(darkState)[0];
  return (
    <div
      className={`flex flex-row w-screen h-screen overflow-y-hidden ${
        isDark ? "dark bg-DarkBackground" : "bg-LightBackground"
      }`}
    >
      <div>
        <Header />
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
