import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Swal from "sweetalert2";
import { Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { selectManageId } from "../../recoil/manage";
import { useQuery, useMutation } from "react-query";
import {
  getManagementItem,
  registComment,
  deleteComment,
  deleteManagement,
} from "../../apis/api/manage";
import DefaultButton from "../common/DefaultButton";
import "../../css/SweetAlert.css";

interface comment {
  managementCommentId: number;
  client: {
    clientId: number;
    clientEmail: string;
    clientName: string;
    clientNickname: string;
    clientProfileImagePath: string;
    clientAddress: string;
    clientPhone: string;
    userCode: string;
    locationCode: string;
    isDeleted: false;
    lastPostingDate: string;
    createdDate: string;
    updatedDate: string;
  };
  managementCommentContent: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
}

export default function LogDetail({
  setModalOpen,
  isRegist,
  setIsRegist,
}: any) {
  const isDark = useRecoilState(darkState)[0];
  const manageId = useRecoilState(selectManageId)[0];
  const [comment, setComment] = useState("");

  // 등록될 댓글
  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록 API
  const registMutation = useMutation(
    ["registComment"],
    (formData: FormData) => registComment(manageId, formData),
    {
      onSuccess: () => {
        setIsRegist((cur: boolean) => !cur);
        setComment("");
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
          title: "댓글이 등록되었습니다.",
        });
      },
    }
  );

  // 댓글 삭제 API
  const deleteMutation = useMutation(
    ["deleteComment"],
    (managementCommentId: number) =>
      deleteComment(manageId, managementCommentId),
    {
      onSuccess: () => {
        setIsRegist((cur: boolean) => !cur);
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
          title: "댓글이 삭제되었습니다.",
        });
      },
    }
  );

  // 게시글 삭제 API
  const deleteLogMutation = useMutation(
    ["deleteManagement"],
    () => deleteManagement(manageId),
    {
      onSuccess: () => {
        setIsRegist((cur: boolean) => !cur);
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
          title: "관리일지가 삭제되었습니다.",
        });
      },
    }
  );

  // 댓글 등록
  const handlecomment = () => {
    const formData = new FormData();
    // clientId 변경 필요
    formData.append("clientId", "1");
    formData.append("managementCommentContent", comment);
    formData.append("managementId", manageId.toString());

    Swal.fire({
      title: "댓글을 등록 하시겠습니까?",
      icon: "info",
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
        registMutation.mutate(formData);
      }
    });
  };

  // 댓글 삭제
  const handleDeleteComment = (managementCommentId: number) => {
    Swal.fire({
      title: "해당 댓글을 삭제 하시겠습니까?",
      icon: "info",
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
        deleteMutation.mutate(managementCommentId);
      }
    });
  };

  // 관리일지 삭제
  const handleLogDelete = () => {
    Swal.fire({
      title: "해당 관리 일지를 삭제 하시겠습니까?",
      width: "580px",
      icon: "info",
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
        setModalOpen(false);
        deleteLogMutation.mutate();
      }
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getManagementItem", manageId, isRegist],
    queryFn: () => getManagementItem(manageId),
  });

  if (isLoading || data === undefined) return null;

  return (
    <div className="flex flex-col relative">
      <div className="absolute right-0">
        <button
          className="bg-State3 px-4 py-2 text-white opacity-80 hover:opacity-100"
          onClick={() => handleLogDelete()}
        >
          삭제
        </button>
      </div>
      <div className="flex flex-row gap-5 ml-5">
        <div className="text-[2rem] font-bold">
          {data.data.data.dish.dishName}
        </div>
        {data.data.data.dish.dishState === "0030001" ? (
          <div className="w-5 h-5 mt-4 rounded-[50%] bg-State1"></div>
        ) : data.data.data.dish.dishState === "0030002" ? (
          <div className="w-5 h-5 mt-4 rounded-[50%] bg-State2"></div>
        ) : data.data.data.dish.dishState === "0030003" ? (
          <div className="w-5 h-5 mt-4 rounded-[50%] bg-State3"></div>
        ) : (
          <div className="w-5 h-5 mt-4 rounded-[50%] bg-State4"></div>
        )}
      </div>
      <div className="flex flex-row text-[number.2rem] gap-2 ml-5 relative">
        <div className="">{data.data.data.client.clientName}</div>
        <div className="text-CancelBtn">
          {data.data.data.client.clientEmail}
        </div>
        <div className="absolute text-CancelBtn right-20">
          {data.data.data.updatedDate.split("T")[0]}
        </div>
      </div>
      <div className="flex flex-col gap-2 mx-auto mt-2">
        {data.data.data.managementImageList.length === 0 ? null : (
          <div className="w-[600px] h-[400px] m-auto">
            <Carousel autoPlay={false}>
              {data.data.data.managementImageList.map(
                (item: string, index: number) => (
                  <Paper>
                    <img key={index} src={item} alt="" />
                  </Paper>
                )
              )}
            </Carousel>
          </div>
        )}
        <div className="w-[600px] mt-8 bg-LightGray px-2 py-4 rounded-xl dark:bg-DarkBackground2">
          {data.data.data.managementContent}
        </div>
        <div className="w-[600px] bg-LightGray px-2 py-4 flex flex-col gap-5 rounded-xl dark:bg-DarkBackground2">
          {data.data.data.managementCommentList.length === 0 ? (
            <div className="ml-3 mt-2">등록된 댓글이 없습니다.</div>
          ) : (
            data.data.data.managementCommentList.map((item: comment) => (
              <div
                key={item.managementCommentId}
                className="flex flex-col gap-5 relative"
              >
                <div className="flex flex-row gap-3">
                  <img
                    className="w-16 h-16 rounded-[50%]"
                    src="https://cdn.pixabay.com/photo/2020/07/04/05/24/cat-5368270__480.jpg"
                    alt=""
                  />
                  <div className="flex flex-col mt-1">
                    <div className="flex flex-row gap-3">
                      <div className="text-[1.2rem] font-bold">
                        {item.client.clientName}
                      </div>
                      <div className="text-CancelBtn mt-[2px]">
                        {item.client.clientEmail}
                      </div>
                    </div>
                    <div className="text-CancelBtn">
                      {item.client.clientAddress}
                    </div>
                  </div>
                </div>
                <div className="mx-16">{item.managementCommentContent}</div>
                <div className="absolute right-5 text-CancelBtn mt-[2px]">
                  {item.updatedDate.split("T")[0]}
                </div>
                <div
                  className="absolute bottom-0 right-0"
                  onClick={() => handleDeleteComment(item.managementCommentId)}
                >
                  <DefaultButton content="삭제" />
                </div>
              </div>
            ))
          )}

          <hr className="my-3" />
          <div className="flex flex-row gap-5">
            <input
              className="w-[510px] h-10 ml-[10px] rounded-lg outline-none pl-2 dark:bg-DarkInput"
              type="text"
              onChange={handleComment}
              value={comment}
            />
            <button
              className="bg-LightMainHover rounded-[50%] p-2 hover:bg-LightMain dark:bg-DarkMainHover dark:hover:bg-DarkMain"
              onClick={handlecomment}
            >
              <SendIcon sx={{ color: "white", fontSize: "25px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
