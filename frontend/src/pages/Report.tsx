import React from "react";
import ReportList from "../components/report/ReportList";
import { useRecoilState } from "recoil";
import { reportDetailId } from "../recoil/report";
import ReportKakaoMap from "../components/report/ReportKakaoMap";
import ReportDetail from "../components/report/ReportDetail";

export default function Report() {
  const detailId = useRecoilState(reportDetailId)[0];

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      {detailId === 0 ? (
        <>
          <div className="w-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <ReportList />
          </div>
          <div className="w-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <ReportKakaoMap />
          </div>
        </>
      ) : (
        <>
          <div className="w-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <ReportList />
          </div>

          <div className="w-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <ReportDetail />
          </div>
        </>
      )}
    </div>
  );
}
