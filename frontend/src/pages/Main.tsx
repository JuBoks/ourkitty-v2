import React, { useState } from "react";
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
  const [userId, setUserId] = useState("admin");
  const [userPw, setUserPw] = useState("1234");

  const loginRequest = useMutation(
    ["login"],
    (formData: FormData) => login(formData),
    {
      onSuccess: () => {
        setIsLogin(true);
        const Toast = Swal.mixin({
          toast: true, // 토스트 형식
          position: "bottom-end", // 알림 위치
          showConfirmButton: false, // 확인버튼 생성 유무
          timer: 1500, // 지속 시간
          timerProgressBar: true, // 지속시간바 생성 여부
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });

        Toast.fire({
          icon: "success",
          title: "로그인되었습니다.",
        });
      },
    }
  );
  const handleLogin = () => {
    const formData = new FormData();
    formData.append("clientEmail", userId);
    formData.append("clientPassword", userPw);

    loginRequest.mutate(formData);
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  return (
    <div className="w-[1620px] h-full">
      {isLogin ? (
        category[0] ? (
          <DashBoard />
        ) : category[1] ? (
          <User />
        ) : category[2] ? (
          <Dish />
        ) : category[3] ? (
          <DishDetail />
        ) : category[4] ? (
          <Chart />
        ) : (
          <Report />
        )
      ) : (
        <div className="w-full h-full ml-[10%]">
          <div className="w-[60%] h-[20%] bg-LightMain rounded-lg mt-10 flex flex-row gap-12">
            <div className="flex flex-col justify-center gap-10 ml-[10%] mt-2 text-[1.2rem] text-white font-bold">
              <div>아이디</div>
              <div>비밀번호</div>
            </div>
            <div className="flex flex-col gap-7 w-[300px] h-[60px] mt-[4%]">
              <input
                type="text"
                value={userId}
                onChange={handleId}
                className="pl-2 rounded-lg py-2"
              />
              <input
                type="password"
                value={userPw}
                onChange={handlePassword}
                className="pl-2 rounded-lg py-2"
              />
            </div>
            <button
              className="w-[100px] h-[80px] bg-DarkMainHover text-[1.3rem] text-white font-bold mt-[5%] rounded-xl hover:bg-DarkMain"
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
