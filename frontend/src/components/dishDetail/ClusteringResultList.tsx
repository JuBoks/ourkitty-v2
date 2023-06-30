import {
  getClusterInfo,
  getClusterStatus,
  modifyClusterInfo,
} from "apis/api/cluster";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  selectedClusterOriginalState,
  selectedClusterState,
  selectedDateState,
  selectedSerialNumberState,
  statusInfoState,
} from "recoil/chart";
import { darkState } from "recoil/page";
import Swal from "sweetalert2";
import { ClusterModifyRequest, ClusterRepresentative } from "types/Clusters";
import ClusteringChartImage from "./ClusteringChartImage";
import ClusteringChartModal from "./ClusteringChartModal";

type Props = {
  data?: ClusterRepresentative[];
};

export default function ClusteringResultList({ data }: Props) {
  const isDark = useRecoilState(darkState)[0];
  const [selectedClusterOriginal, setSelectedClusterOriginal] = useRecoilState(
    selectedClusterOriginalState
  );
  const [selectedButton, setSelectedButton] = useRecoilState(selectedDateState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(
    selectedSerialNumberState
  );
  const [selectedCluster, setSelectedCluster] =
    useRecoilState(selectedClusterState);
  const [statusInfo, setStatusInfo] = useRecoilState(statusInfoState);

  const Toast = Swal.mixin({
    toast: true, // 토스트 형식
    position: "bottom-end", // 알림 위치
    showConfirmButton: false, // 확인버튼 생성 유무
    timer: 1500, // 지속 시간
    timerProgressBar: true, // 지속시간바 생성 여부
    background: isDark ? "#262D33" : "white",
    color: isDark ? "white" : "black",
  });

  // const modifyCluster = useMutation(
  //   ["modifyClusterInfo"],
  //   (body: ClusterModifyRequest) => modifyClusterInfo(body),
  //   {
  //     onSuccess: async () => {
  //       // get cluster info
  //       const response = await getClusterInfo(selectedSerialNumber, selectedButton)
  //       setSelectedClusterOriginal(response.original);
  //       setSelectedCluster(response.refined);

  //       const response_status = await getClusterStatus(selectedSerialNumber)
  //       setStatusInfo(response_status);
  //     }
  //   }
  // )

  const removeRepresentative = async (image: string) => {
    let _selectedOriginal = JSON.parse(JSON.stringify(selectedClusterOriginal));
    // 1) status: 1
    _selectedOriginal.status = 1;
    // 2) tnr_info에서 tnr여부 확인
    let isTnr = false;
    const newTnrInfo = _selectedOriginal.tnr_info.filter((el: any) => {
      if (el[0] === image) {
        if (el[1]) {
          isTnr = true;
        }
      }
      return el[0] !== image;
    });
    _selectedOriginal.tnr_info = newTnrInfo;
    // 3) tnr이면 tnr 감소시키기
    isTnr && _selectedOriginal.tnr_count--;
    // 4) representatives 제거
    const newRepresentatives = _selectedOriginal.representative_images.filter(
      (el: any) => {
        return el[1] !== image;
      }
    );
    _selectedOriginal.representative_images = newRepresentatives;
    // 5) 개체 수 제거
    _selectedOriginal.num_clusters--;
    // 6) file feature info에서 해당 이미지 cls를 white(10)
    for (let el of _selectedOriginal.file_feature_info) {
      if (el[0] === image) {
        el[1] = 10;
        break;
      }
    }

    // 저장하기
    // const body: ClusterModifyRequest = {
    //   serial_number: selectedSerialNumber,
    //   date: selectedButton,
    //   result: _selectedOriginal,
    // };
    //modifyCluster.mutate(body);
  };

  const handleClick = (image: string) => {
    Swal.fire({
      title: "해당 대표 고양이를 삭제하시겠습니까?",
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
        // 대표 고양이 사진으로 추가하는 로직
        let isSuccess = removeRepresentative(image);

        // Okay
        Toast.fire({
          icon: "success",
          title: "해당 대표 고양이를 삭제하였습니다.",
        });
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 pb-4 overflow-scroll">
      {!data || data.length === 0 ? (
        <div className="grid grid-cols-3 gap-2 p-3">사진 없음</div>
      ) : (
        data.map((el, index) => (
          <div key={index} className="w-full">
            <img
              src={el.image}
              onClick={() => handleClick(el.image)}
              className="w-full h-full cursor-pointer"
            />
          </div>
        ))
      )}
    </div>
  );
}
