import React from "react";
import Dash from "@mui/icons-material/Dashboard";
import User from "@mui/icons-material/AccountCircle";
import Dish from "@mui/icons-material/Pets";
import Report from "@mui/icons-material/Campaign";
import Chart from "@mui/icons-material/Leaderboard";
import Logout from "@mui/icons-material/ExitToApp";
import Light from "@mui/icons-material/WbSunny";
import Dark from "@mui/icons-material/DarkMode";
import LightLogo from "../../assets/logo_light.png";
import DarkLogo from "../../assets/logo_dark.png";
import { useRecoilState } from "recoil";
import { darkState, categoryState } from "../../recoil/page";

export default function Header() {
  const [isDark, setIsDark] = useRecoilState(darkState);
  const [category, setCategory] = useRecoilState(categoryState);

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
      default:
        break;
    }
  };

  return (
    <div className="w-[300px] h-full bg-LightHeader1 flex flex-col relative dark:bg-DarkHeader1">
      <div className="w-full h-[100px] bg-LightMain flex flex-row dark:bg-DarkMain">
        {isDark ? (
          <img className="w-[100px] h-[100px]" src={DarkLogo} alt="" />
        ) : (
          <img className="w-[100px] h-[100px]" src={LightLogo} alt="" />
        )}
        <span className="text-[3rem] py-[10px] text-white font-bold">
          냥그릇
        </span>
      </div>
      <div
        className={`${
          category[0] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
        } h-[90px] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
        onClick={() => handleHeaderMenu(0)}
      >
        <Dash sx={{ fontSize: "50px", color: "#FFFFFF" }} />
        <div className="h-[60px] text-[1.5rem] text-white mt-2">대시보드</div>
      </div>
      <div
        className={`${
          category[1] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
        } h-[90px] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
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
        } h-[90px] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
        onClick={() => handleHeaderMenu(2)}
      >
        <Dish sx={{ fontSize: "50px", color: "#FFFFFF" }} />
        <div className="h-[60px] text-[1.5rem] text-white mt-2">
          냥그릇 관리
        </div>
      </div>
      <div
        className={`${
          category[3] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
        } h-[90px] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
        onClick={() => handleHeaderMenu(3)}
      >
        <Report sx={{ fontSize: "50px", color: "#FFFFFF" }} />
        <div className="h-[60px] text-[1.5rem] text-white mt-2">민원 관리</div>
      </div>
      <div
        className={`${
          category[4] ? "bg-LightHeader2 dark:bg-DarkHeader2" : ""
        } h-[90px] flex flex-row gap-5 relative p-[15px] cursor-pointer hover:bg-LightHeader2 dark:hover:bg-DarkHeader2`}
        onClick={() => handleHeaderMenu(4)}
      >
        <Chart sx={{ fontSize: "50px", color: "#FFFFFF" }} />
        <div className="h-[60px] text-[1.5rem] text-white mt-2">차트</div>
      </div>
      <div className="w-full h-[100px] bg-LightHeader2 flex flex-row absolute bottom-0 dark:bg-DarkHeader2">
        <div
          title="로그아웃"
          className="basis-1/2 w-full h-full px-[50px] py-[25px] cursor-pointer hover:bg-LightHeader1 dark:hover:bg-DarkHeader1"
        >
          <Logout sx={{ fontSize: "50px", color: "#FFFFFF" }} />
        </div>
        <div className="basis-1/2 w-full h-full px-[50px] py-[25px] cursor-pointer hover:bg-LightHeader1 dark:hover:bg-DarkHeader1">
          {isDark ? (
            <div title="라이트모드">
              <Light
                sx={{ fontSize: "50px", color: "#FFFFFF" }}
                onClick={() => setIsDark((cur: boolean) => !cur)}
              />
            </div>
          ) : (
            <div title="다크모드">
              <Dark
                sx={{ fontSize: "50px", color: "#FFFFFF" }}
                onClick={() => setIsDark((cur: boolean) => !cur)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
