import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { isLoginState, userInfoState } from "../../recoil/states/user";
import { categoryState, darkModeState } from "../../recoil/states/page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import BarChartIcon from "@mui/icons-material/BarChart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header() {
  const [categories, setCategories] = useRecoilState(categoryState);

  const isLogin = useRecoilState(isLoginState)[0];
  const userInfo = useRecoilState(userInfoState)[0];
  const [isDark, setIsDark] = useRecoilState(darkModeState);

  return (
    <div>
      {isLogin ? (
        <div className="flex flex-col gap-10 pt-10 pl-10 h-screen bg-WebMain w-80 dark:bg-WebDarkMain">
          <div className="flex flex-row gap-4 cursor-pointer">
            {categories[0] ? (
              <>
                <AppsIcon sx={{ color: "#5D6DBE", fontSize: "50px" }} />
                <span className="text-[#5D6DBE] text-[32px] font-bold">
                  대시보드
                </span>
              </>
            ) : (
              <>
                <AppsIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
                <span
                  className="text-white text-[32px] font-bold"
                  onClick={() =>
                    setCategories([true, false, false, false, false])
                  }
                >
                  대시보드
                </span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-4 cursor-pointer">
            {categories[1] ? (
              <>
                <PersonIcon sx={{ color: "#5D6DBE", fontSize: "50px" }} />
                <span className="text-[#5D6DBE] text-[32px] font-bold">
                  사용자 관리
                </span>
              </>
            ) : (
              <>
                <PersonIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
                <span
                  className="text-white text-[32px] font-bold"
                  onClick={() =>
                    setCategories([false, true, false, false, false])
                  }
                >
                  사용자 관리
                </span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-4 cursor-pointer">
            {categories[2] ? (
              <>
                <HomeIcon sx={{ color: "#5D6DBE", fontSize: "50px" }} />
                <span className="text-[#5D6DBE] text-[32px] font-bold">
                  냥그릇 관리
                </span>
              </>
            ) : (
              <>
                <HomeIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
                <span
                  className="text-white text-[32px] font-bold"
                  onClick={() =>
                    setCategories([false, false, true, false, false])
                  }
                >
                  냥그릇 관리
                </span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-4 cursor-pointer">
            {categories[3] ? (
              <>
                <CampaignIcon sx={{ color: "#5D6DBE", fontSize: "50px" }} />
                <span className="text-[#5D6DBE] text-[32px] font-bold">
                  민원 관리
                </span>
              </>
            ) : (
              <>
                <CampaignIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
                <span
                  className="text-white text-[32px] font-bold"
                  onClick={() =>
                    setCategories([false, false, false, true, false])
                  }
                >
                  민원 관리
                </span>
              </>
            )}
          </div>
          <div className="flex flex-row gap-4 cursor-pointer">
            {categories[4] ? (
              <>
                <BarChartIcon sx={{ color: "#5D6DBE", fontSize: "50px" }} />
                <span className="text-[#5D6DBE] text-[32px] font-bold">
                  차트
                </span>
              </>
            ) : (
              <>
                <BarChartIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
                <span
                  className="text-white text-[32px] font-bold"
                  onClick={() =>
                    setCategories([false, false, false, false, true])
                  }
                >
                  차트
                </span>
              </>
            )}
          </div>
          <div
            className="fixed bottom-[20px] left-[250px]"
            onClick={() => setIsDark((cur: boolean) => !cur)}
          >
            {isDark ? (
              <LightModeIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4 cursor-pointer pt-10 pl-10 h-screen bg-WebMain w-80 dark:bg-WebDarkMain">
          <AccountCircleIcon sx={{ color: "#FFFFFF", fontSize: "50px" }} />
          <span className="text-white text-[32px] font-bold">로그인</span>
        </div>
      )}
    </div>
  );
}
