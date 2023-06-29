import React, { useState, useEffect } from "react";
import tnrImage from "assets/TNR_IMAGE.png";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { darkState } from "recoil/page";
import { selectedClusterOriginalState, selectedDateState, selectedSerialNumberState } from "recoil/chart";
import { MutationFunction, useMutation } from "react-query";
import { ClusterModifyRequest } from "types/Clusters";
import { modifyClusterInfo } from "apis/api/cluster";

export default function ModalCatConfirm(props: any) {
  const isDark = useRecoilState(darkState)[0];
  const { open, close, header, imageUrl } = props;
  const [selectedClusterOriginal, setSelectedClusterOriginal] = useRecoilState(selectedClusterOriginalState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(selectedSerialNumberState);
  const [neutered, setNeutered] = useState(false);

  const mutationFunction: MutationFunction<any, [string, string, ClusterModifyRequest]> = async (args) => {
    const [selectedSerialNumber, selectedDate, body] = args;
    return modifyClusterInfo(selectedSerialNumber, selectedDate, body);
  };

  const modifyCluster = useMutation(["modifyClusterInfo"], mutationFunction, {
    onSuccess: async () => {
      // get cluster info
      // const response = await getClusterInfo(
      //   selectedSerialNumber,
      //   selectedButton
      // );
      // setSelectedClusterOriginal(response.original);
      // setSelectedCluster(response.refined);
      // const response_status = await getClusterStatus(selectedSerialNumber);
      // setStatusInfo(response_status);
    },
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

  const handleNeuteredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeutered(event.target.value === "yes");
  };

  useEffect(() => {
    console.log("?", selectedClusterOriginal);
  }, []);

  const removeRepresentative = async (image: string) => {
    // let _selectedOriginal = JSON.parse(JSON.stringify(selectedClusterOriginal));
    // // 1) status: 1
    // _selectedOriginal.status = 1;
    // // 2) tnr_info에서 tnr여부 확인
    // let isTnr = false;
    // const newTnrInfo = _selectedOriginal.tnr_info.filter((el: any) => {
    //   if (el[0] === image) {
    //     if (el[1]) {
    //       isTnr = true;
    //     }
    //   }
    //   return el[0] !== image;
    // });
    // _selectedOriginal.tnr_info = newTnrInfo;
    // // 3) tnr이면 tnr 감소시키기
    // isTnr && _selectedOriginal.tnr_count--;
    // // 4) representatives 제거
    // const newRepresentatives = _selectedOriginal.representative_images.filter((el: any) => {
    //   return el[1] !== image;
    // });
    // _selectedOriginal.representative_images = newRepresentatives;
    // // 5) 개체 수 제거
    // _selectedOriginal.num_clusters--;
    // // 6) file feature info에서 해당 이미지 cls를 white(10)
    // for (let el of _selectedOriginal.file_feature_info) {
    //   if (el[0] === image) {
    //     el[1] = 10;
    //     break;
    //   }
    // }
    // 저장하기
    const body: ClusterModifyRequest = {
      serial_number: selectedSerialNumber,
      date: selectedDate,
      status: 1,
    };
    modifyCluster.mutate([selectedSerialNumber, selectedDate, body]);
  };

  const handleRemoveClick = () => {
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
        let isSuccess = removeRepresentative(imageUrl);

        // Okay
        Toast.fire({
          icon: "success",
          title: "해당 대표 고양이를 삭제하였습니다.",
        });
      }
    });
  };

  return (
    <div className={open ? "openModal modal relative" : "modal relative"}>
      {open ? (
        <section className="w-[60%] h-[80%] flex flex-col bg-white rounded-lg dark:bg-DarkBackground2">
          <header className="h-[50px] text-[1.5rem] bg-gray-100 dark:bg-DarkMain flex items-center justify-between px-4">
            <span>{header}</span>
            <button className="close" onClick={close}>
              x
            </button>
          </header>
          <main className="flex flex-row flex-grow dark:text-white">
            <div className="w-[60%] h-[90%]  p-4">
              <img src={imageUrl} className="w-full h-full" alt="cat" />
            </div>
            <div className="flex flex-col justify-center px-4 gap-4 ml-8">
              <div className="text-[2rem] font-medium mb-2">중성화 됐나요?</div>
              <div className="flex flex-row gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" checked={neutered === true} onChange={handleNeuteredChange} />
                  <span className="ml-2">예</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" checked={neutered === false} onChange={handleNeuteredChange} />
                  <span className="ml-2">아니요</span>
                </label>
              </div>
              <div>
                <img src={tnrImage} />
              </div>
            </div>
          </main>
          <footer className="h-[70px] bg-gray-100 dark:bg-DarkBackground2 flex justify-end items-center px-4">
            <button
              className="w-[80px] h-[50px] close bg-LightMain opacity-70 hover:opacity-100 dark:bg-DarkMain mr-4"
              onClick={handleRemoveClick}
            >
              삭제
            </button>
            <button
              className="w-[80px] h-[50px] close bg-LightMain opacity-70 hover:opacity-100 dark:bg-DarkMain"
              onClick={close}
            >
              완료
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
