import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkState } from "../recoil/dark";

export default function MainLayout() {
  const isDark = useRecoilState(darkState)[0];
  console.log(isDark);
  return (
    <div
      className={`flex flex-row w-screen h-screen ${
        isDark ? "dark bg-DarkBackground" : "bg-LightBackground"
      }`}
    >
      <Header />
      <Outlet />
    </div>
  );
}
