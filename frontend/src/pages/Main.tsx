import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DashBoard from "./DashBoard";
import User from "./User";
import Dish from "./Dish";
import Report from "./Report";
import Chart from "./Chart";
import { useRecoilState } from "recoil";
import { categoryState, darkState } from "../recoil/page";
import { isLoginState } from "../recoil/auth";
import { useMutation } from "react-query";
import { login } from "../apis/api/auth";
import DishDetail from "./DishDetail";

export default function Main() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const isDark = useRecoilState(darkState)[0];
  const category = useRecoilState(categoryState)[0];
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [])

  const loginRequest = useMutation(
    ["login"],
    (formData: FormData) => login(formData),
    {
      onSuccess: () => {
        setIsLogin(true);
        setIsLoggingIn(false); // Reset the login status
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "success",
          title: "로그인되었습니다.",
        });
      },
      onError: () => {
        setIsLoggingIn(false); // Reset the login status
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "error",
          title: "아이디 비밀번호 확인 바랍니다",
        });
      },
    }
  );

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("clientEmail", userId);
    formData.append("clientPassword", userPw);
    setIsLoggingIn(true);
    loginRequest.mutate(formData);
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  return (
    <div className="w-full h-full">
      {isLogin ? (
        category[0] ? (
          <DashBoard />
        ) : category[1] ? (
          <User />
        ) : category[2] ? (
          <Dish />
        ) : category[3] ? (
          <Chart />
        ) : category[4] ? (
          <Report />
        ) : (
          <Report />
        )
      ) : (
        <div className="w-full h-full ml-[10%]">
          <div className="w-[45rem] h-[20%] bg-LightMain rounded-lg mt-10 flex flex-row gap-12">
            <div className="flex flex-col justify-center gap-8 ml-[10%] mt-2 text-[1.2rem] text-white font-bold">
              <div>아이디</div>
              <div>비밀번호</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-7 w-[45%]">
              <input
                type="text"
                value={userId}
                onChange={handleId}
                className="pl-2 rounded-lg py-2 outline-none"
              />
              <input
                type="password"
                value={userPw}
                onChange={handlePassword}
                className="pl-2 rounded-lg py-2 outline-none"
              />
            </div>
            <button
              className="w-[100px] h-[80px] bg-DarkMainHover text-[1.3rem] text-white font-bold rounded-xl hover:bg-DarkMain self-center"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
