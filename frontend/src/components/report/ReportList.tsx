import React from "react";
import ReportItem from "./ReportItem";
import ReportKakaoMap2 from "./ReportKakaoMap2";
import { useRecoilState } from "recoil";
import { reportDetailId } from "../../recoil/report";

export default function ReportList() {
  const selectedReportId = useRecoilState(reportDetailId)[0];

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-[1.3rem] font-bold">민원 조회</h1>
      {selectedReportId === 0 ? (
        <div className="w-full h-full">
          <ReportItem />
        </div>
      ) : (
        <div className="w-full h-full flex-flex-col">
          <div className="w-full h-[53%]">
            <ReportItem />
          </div>
          <div className="w-full h-[45%] mt-5">
            <ReportKakaoMap2 />
          </div>
        </div>
      )}
    </div>
  );
}
