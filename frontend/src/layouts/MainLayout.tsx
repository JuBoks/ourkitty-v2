import React, { useEffect } from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkState } from "../recoil/page";
import { isLoginState } from "../recoil/auth";

export default function MainLayout() {
  const isDark = useRecoilState(darkState)[0];
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const login = localStorage.getItem("accessToken");

  useEffect(() => {
    if (login) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [login]);

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
