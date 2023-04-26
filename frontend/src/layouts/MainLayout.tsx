import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkModeState } from "../recoil/states/page";

function MainLayout() {
  const isDark = useRecoilState(darkModeState)[0];

  return (
    <div
      className={
        isDark
          ? "flex flex-row w-screen h-screen dark bg-WebDarkBackground"
          : "flex flex-row w-screen h-screen"
      }
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
