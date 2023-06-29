import { getClusterTnrInfo, modifyClusterInfo, resetClusterInfo } from "apis/api/cluster";
import ModalCatConfirm from "components/common/ModalCatConfirm";
import { useEffect, useState } from "react";
import { MutationFunction, useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  selectedDateState,
  selectedIotImageState,
  selectedSerialNumberState,
  selectedTnrState,
  tnrInfoInit,
} from "recoil/chart";
import { ClusterIotImage, ClusterModifyRequest, ClusterTnrInfo } from "types/Clusters";
import ChartIoTImage from "./ChartIoTImage";
import Swal from "sweetalert2";
import { darkState } from "recoil/page";

export default function ChartIoTImageList() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(selectedSerialNumberState);
  const [selectedTnr, setSelectedTnr] = useRecoilState(selectedTnrState);
  const [imageList, setImageList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIotImage, setSelectedIotImage] = useRecoilState(selectedIotImageState);
  const isDark = useRecoilState(darkState)[0];

  // useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["getClusterTnrInfo", selectedSerialNumber, selectedDate, isUpdated],
    queryFn: () => getClusterTnrInfo(selectedSerialNumber, selectedDate),
  });

  const Toast = Swal.mixin({
    toast: true, // 토스트 형식
    position: "bottom-end", // 알림 위치
    showConfirmButton: false, // 확인버튼 생성 유무
    timer: 1500, // 지속 시간
    timerProgressBar: true, // 지속시간바 생성 여부
    background: isDark ? "#262D33" : "white",
    color: isDark ? "white" : "black",
  });

  // useEffect
  useEffect(() => {
    if (data === undefined || data === null) {
      setSelectedTnr(tnrInfoInit);
      setImageList([]);
      return;
    }

    setSelectedTnr(data);
  }, [data]);

  useEffect(() => {
    setImageList(selectedTnr.tnr_info);
  }, [selectedTnr]);

  // mutate
  const modifyClusterMutationFunc: MutationFunction<any, [string, string, ClusterTnrInfo]> = async (args) => {
    const [selectedSerialNumber, selectedDate, body] = args;
    return modifyClusterInfo(selectedSerialNumber, selectedDate, body);
  };
  const modifyCluster = useMutation(["modifyClusterInfo"], modifyClusterMutationFunc, {
    onSuccess: async () => {
      // get cluster info
      setIsUpdated(!isUpdated);
    },
  });

  const resetClusterMutationFunc: MutationFunction<any, [string, string]> = async (args) => {
    const [selectedSerialNumber, selectedDate] = args;
    return resetClusterInfo(selectedSerialNumber, selectedDate);
  };
  const resetCluster = useMutation(["resetClusterInfo"], resetClusterMutationFunc, {
    onSuccess: async () => {
      // get cluster info
      setIsUpdated(!isUpdated);
    },
  });

  // events
  const closeModal = (e: React.MouseEvent) => {
    e && e.stopPropagation();
    setModalOpen(false);
  };
  const onClickInfoHandle = (el: ClusterIotImage) => {
    setSelectedIotImage(el);
    setModalOpen(true);
  };

  const onInspectHandle = () => {
    Swal.fire({
      title: "검수한 내용을 반영하시겠습니까?",
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
        // 저장하기
        modifyCluster.mutate([selectedSerialNumber, selectedDate, selectedTnr]);

        // Okay
        Toast.fire({
          icon: "success",
          title: "반영되었습니다.",
        });
      }
    });
  };

  const onResetHandle = () => {
    Swal.fire({
      title: "해당 날짜의 결과를 초기화하시겠습니까?",
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
        // 초기화하기
        resetCluster.mutate([selectedSerialNumber, selectedDate]);
        // Okay
        Toast.fire({
          icon: "success",
          title: "초기화 되었습니다.",
        });
      }
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="font-bold">촬영된 고양이</div>
        {isLoading || data === undefined || selectedTnr.status >= 0 ? (
          <div>
            <button className="mr-[1rem] text-[0.8rem] text-gray-400" onClick={onResetHandle}>
              다시하기
            </button>
            <button className="finish text-[0.8rem] text-gray-400" onClick={onInspectHandle}>
              검수완료
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-[90%] p-1 flex flex-row gap-4 overflow-auto">
        {isLoading || data === undefined || imageList.length === 0 ? (
          <>
            <div>이미지가 없습니다.</div>
          </>
        ) : (
          <>
            {imageList.map((info, index) => {
              const el: ClusterIotImage = {
                img: info[0],
                is_tnr: info[1],
              };
              return (
                <ChartIoTImage
                  onClickInfo={() => {
                    onClickInfoHandle(el);
                  }}
                  imgUrl={el.img}
                  key={index}
                />
              );
            })}
          </>
        )}

        <ModalCatConfirm open={modalOpen} close={closeModal} tnrInfo={selectedIotImage} header="중성화 여부 파악" />
      </div>
    </>
  );
}
