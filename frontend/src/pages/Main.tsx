import React, { useState } from "react";
import DashBoard from "./DashBoard";
import User from "./User";
import Dish from "./Dish";
import Report from "./Report";
import Chart from "./Chart";
import LockIcon from "@mui/icons-material/Lock";
import { useRecoilState } from "recoil";
import { categoryState } from "../recoil/page";
import { isLoginState } from "../recoil/auth";
import { useMutation } from "react-query";
import { login } from "../apis/api/auth";

export default function Main() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const category = useRecoilState(categoryState)[0];
  const [userId, setUserId] = useState("admin");
  const [userPw, setUserPw] = useState("1234");

  const loginRequest = useMutation(
    ["login"],
    (formData: FormData) => login(formData),
    {
      onSuccess: () => {
        setIsLogin(true);
      },
    }
  );
  const handleLogin = () => {
    const formData = new FormData();
    formData.append("clientEmail", userId);
    formData.append("clientPassword", userPw);

    loginRequest.mutate(formData);
  };

  const handleInput = () => {};
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
          <Report />
        ) : (
          <Chart />
        )
      ) : (
        <>
          <input type="text" value={userId} onChange={handleInput} />
          <input type="text" value={userPw} onChange={handleInput} />
          <button className="p-10 bg-LightMain" onClick={handleLogin}>
            로그인
          </button>
        </>
      )}
    </div>
  );
}
