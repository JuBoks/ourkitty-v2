import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { reportDetailId, isReportStateChange } from "../../recoil/report";
import { useQuery, useMutation } from "react-query";
import { getReportItem, registReportComment } from "../../apis/api/report";

interface reportImage {
  reportImageId: number;
  imagePath: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
}
export default function ReportDetail() {
  const isDark = useRecoilState(darkState)[0];
  const [detailId, setDetailId] = useRecoilState(reportDetailId);
  const [isChange, setIsChange] = useRecoilState(isReportStateChange);

  const [reportComment, setReportComment] = useState("");

  const registComment = useMutation(
    ["registReportComment"],
    (formData: FormData) => registReportComment(detailId, formData),
    {
      onSuccess: () => {
        setIsChange((cur: boolean) => !cur);
        setDetailId(0);
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
          title: "완료처리 되었습니다.",
        });
      },
    }
  );

  const handleReportComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportComment(e.target.value);
  };

  const handleRegistComment = () => {
    const formData = new FormData();
    formData.append("reportDescription", reportComment);

    Swal.fire({
      title: "해당 민원을 완료 처리 하시겠습니까?",
      icon: "info",
      width: "600px",
      background: isDark ? "#262D33" : "white",
      color: isDark ? "white" : "black",
      showCancelButton: true,
      confirmButtonColor: isDark ? "#29325B" : "#9FA9D8",
      cancelButtonColor: "#B0B0B0",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        registComment.mutate(formData);
      }
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getReportItem", detailId],
    queryFn: () => getReportItem(detailId),
  });

  useEffect(() => {
    if (data !== undefined) {
      setReportComment(data.data.data.reportDescription);
    }
  }, [data]);

  if (isLoading || data === undefined) return null;

  console.log(data.data.data);
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-[1.3rem] font-bold">민원 상세</h1>
      <div className="flex flex-row gap-10 justify-center mt-3">
        <div className="w-60 h-60">
          {data.data.data.client.clientProfileImagePath === "" ? (
            <AccountCircleIcon
              sx={{
                fontSize: "220px",
                color: `${isDark ? "#29325B" : "#9FA9D8"}`,
              }}
            />
          ) : (
            <img src={data.data.data.client.clientProfileImagePath} alt="" />
          )}
        </div>
        <div className="flex flex-row gap-12 text-[1.2rem] mt-5">
          <div className="flex flex-col gap-2">
            <div>이름(닉네임)</div>
            <div>핸드폰 번호</div>
            <div>이메일</div>
            <div>거주지</div>
            <div>최근 접속 날짜</div>
          </div>
          <div className="flex flex-col gap-2 font-bold">
            <div className="">
              : {data.data.data.client.clientName}
              <span className="text-CancelBtn">
                ({data.data.data.client.clientNickname})
              </span>
            </div>
            <div>: {data.data.data.client.clientPhone}</div>
            <div>: {data.data.data.client.clientEmail}</div>
            <div>: {data.data.data.client.clientAddress}</div>
            <div>: {data.data.data.client.lastPostingDate.split("T")[0]}</div>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="w-full h-full flex flex-col p-3">
        <div className="text-[1.8rem] font-bold">
          {data.data.data.reportTitle}
        </div>
        <div className="flex flex-row gap-3 ml-1 relative">
          <div>{data.data.data.client.clientName}</div>
          <div className="text-CancelBtn">
            {data.data.data.client.clientEmail}
          </div>
          <div className="absolute right-2 text-CancelBtn">
            {data.data.data.createdDate.split("T")[0]}
          </div>
        </div>
        <div className="w-full h-[60%] flex flex-row gap-5 mt-3">
          <div className="w-[50%] h-full rounded-lg">
            {data.data.data.reportImageList.length === 0 ? (
              <div className="w-full h-full bg-zinc-100 rounded-lg flex flex-row justify-center pt-[40%] dark:bg-DarkBackground">
                등록된 사진이 없습니다.
              </div>
            ) : (
              <Carousel autoPlay={false}>
                {data.data.data.reportImageList.map((item: reportImage) => (
                  <Paper>
                    <img
                      key={item.reportImageId}
                      src={item.imagePath}
                      alt=""
                      className="w-full h-full"
                    />
                  </Paper>
                ))}
              </Carousel>
            )}
          </div>
          <div className="w-[50%] h-full p-3 rounded-lg bg-zinc-100 text-[1.2rem] dark:bg-DarkBackground">
            {data.data.data.reportContent}
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <textarea
            className="w-[85%] h-[100px] p-2 border-2 border-black mt-5 rounded-lg resize-none dark:bg-DarkBackground dark:border-white"
            value={reportComment}
            onChange={handleReportComment}
          />
          <button
            className="w-[15%] h-[100px] bg-LightMainHover mt-5 rounded-lg text-white text-[1.5rem] font-bold hover:bg-LightMain dark:bg-DarkMainHover dark:hover:bg-DarkMain"
            onClick={handleRegistComment}
          >
            {data.data.data.reportState === "0050001" ? "완료" : "수정"}
          </button>
        </div>
      </div>
    </div>
  );
}
