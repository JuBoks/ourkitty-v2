import React from "react";
import Swal from "sweetalert2";
import Dash from "@mui/icons-material/Dashboard";
import User from "@mui/icons-material/AccountCircle";
import DishManage from "@mui/icons-material/Home";
import DishDetail from "@mui/icons-material/Pets";
import Report from "@mui/icons-material/Campaign";
import Chart from "@mui/icons-material/Leaderboard";
import Logout from "@mui/icons-material/ExitToApp";
import Light from "@mui/icons-material/WbSunny";
import Dark from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightLogo from "../../assets/logo_light.png";
import DarkLogo from "../../assets/logo_dark.png";
import { useRecoilState } from "recoil";
import { darkState, categoryState } from "../../recoil/page";
import { isLoginState } from "../../recoil/auth";
import { useMutation } from "react-query";
import { logout } from "../../apis/api/auth";

export default function Header() {
  const [isDark, setIsDark] = useRecoilState(darkState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const handleHeaderMenu = (num: number) => {
    switch (num) {
      case 0:
        setCategory([true, false, false, false, false]);
        break;
      case 1:
        setCategory([false, true, false, false, false]);
        break;
      case 2:
        setCategory([false, false, true, false, false]);
        break;
      case 3:
        setCategory([false, false, false, true, false]);
        break;
      case 4:
        setCategory([false, false, false, false, true]);
        break;
      // case 5:
      //   setCategory([false, false, false, false, false, true]);
      //   break;
      default:
        break;
    }
  };

  // 로그아웃 요청
  const logoutRequest = useMutation(["logout"], () => logout(), {
    onSuccess: () => {
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
        title: "로그아웃 되었습니다.",
      });
      localStorage.clear();
      setIsLogin(false);
    },
  });

  // 로그아웃
  const handleLogout = () => {
    logoutRequest.mutate();
  };

  return (
    <div className="w-[100%] h-full bg-LightHeader1 flex flex-col relative dark:bg-DarkHeader1">
      <div className="w-full h-[6rem] bg-LightMain flex flex-row dark:bg-DarkMain">
        {isDark ? (
          <img className="w-[100px] h-[100px]" src={DarkLogo} alt="" />
        ) : (
          <img className="w-[100px] h-[100px]" src={LightLogo} alt="" />
        )}
        <span className="text-[3rem] py-[10px] text-white font-bold">
          냥그릇
        </span>
      </div>
      {isLogin ? (
        <>
          <div
            className={`${
              category[0] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
            } h-[5rem] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
            onClick={() => handleHeaderMenu(0)}
          >
            <Dash sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            <div className="h-[60px] text-[1.5rem] text-white mt-2">
              대시보드
            </div>
          </div>
          <div
            className={`${
              category[1] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
            } h-[5rem] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
            onClick={() => handleHeaderMenu(1)}
          >
            <User sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            <div className="h-[60px] text-[1.5rem] text-white mt-2">
              사용자 관리
            </div>
          </div>
          <div
            className={`${
              category[2] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
            } h-[5rem] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
            onClick={() => handleHeaderMenu(2)}
          >
            <DishManage sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            <div className="h-[60px] text-[1.5rem] text-white mt-2">
              냥그릇 관리
            </div>
          </div>
          {/* <div
            className={`${
              category[3] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
            } h-[5rem] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
            onClick={() => handleHeaderMenu(3)}
          >
            <DishDetail sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            <div className="h-[60px] text-[1.5rem] text-white mt-2">
              개체수 관리
            </div>
          </div> */}
          <div
            className={`${
              category[3] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
            } h-[5rem] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
            onClick={() => handleHeaderMenu(3)}
          >
            <Chart sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            <div className="h-[60px] text-[1.5rem] text-white mt-2">차트</div>
          </div>
          <div
            className={`${
              category[4] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
            } h-[5rem] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
            onClick={() => handleHeaderMenu(4)}
          >
          <Report sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            <div className="h-[60px] text-[1.5rem] text-white mt-2">
              민원 관리
            </div>          </div>
          <div className="w-[100%] h-[100px] bg-LightHeader2 flex flex-row absolute bottom-0 dark:bg-DarkHeader2">
            <div
              title="로그아웃"
              className="basis-1/2 flex justify-center items-center w-[50%] h-full py-[25px] cursor-pointer hover:bg-LightHeader1 dark:hover:bg-DarkHeader1"
              onClick={handleLogout}
            >
              <Logout sx={{ fontSize: "50px", color: "#FFFFFF" }} />
            </div>
            <div
              className="basis-1/2 flex justify-center items-center w-[50%] h-full py-[25px] cursor-pointer hover:bg-LightHeader1 dark:hover:bg-DarkHeader1"
              onClick={() => setIsDark((cur: boolean) => !cur)}
            >
              {isDark ? (
                <div title="라이트모드">
                  <Light sx={{ fontSize: "50px", color: "#FFFFFF" }} />
                </div>
              ) : (
                <div title="다크모드">
                  <Dark sx={{ fontSize: "50px", color: "#FFFFFF" }} />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          className="
          h-[90px] flex flex-row gap-5 relative p-[15px] cursor-pointer bg-LightHeader2"
          onClick={() => handleHeaderMenu(0)}
        >
          <AccountCircleIcon sx={{ fontSize: "50px", color: "#FFFFFF" }} />
          <div className="h-[60px] text-[1.5rem] text-white mt-2">로그인</div>
        </div>
      )}
    </div>
  );
}
