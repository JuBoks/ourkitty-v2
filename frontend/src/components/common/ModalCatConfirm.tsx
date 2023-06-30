import tnrImage from "assets/TNR_IMAGE.png";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedIotImageState, selectedTnrState } from "recoil/chart";
import { darkState } from "recoil/page";
import Swal from "sweetalert2";

export default function ModalCatConfirm(props: any) {
  const isDark = useRecoilState(darkState)[0];
  const { open, close, header, tnrInfo } = props;
  const [selectedTnr, setSelectedTnr] = useRecoilState(selectedTnrState);
  const [selectedIotImage, setSelectedIotImage] = useRecoilState(selectedIotImageState);
  const [neutered, setNeutered] = useState(false);

  const Toast = Swal.mixin({
    toast: true, // 토스트 형식
    position: "bottom-end", // 알림 위치
    showConfirmButton: false, // 확인버튼 생성 유무
    timer: 1500, // 지속 시간
    timerProgressBar: true, // 지속시간바 생성 여부
    background: isDark ? "#262D33" : "white",
    color: isDark ? "white" : "black",
  });

  useEffect(() => {
    setNeutered(tnrInfo.is_tnr);
  }, [selectedIotImage]);

  const handleNeuteredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeutered(event.target.value === "yes");
  };

  const removeRepresentative = () => {
    const image = selectedIotImage.img;
    let _selectedTnr = JSON.parse(JSON.stringify(selectedTnr));

    // 대표이미지의 중성화 여부 확인
    let isTnr = false;
    for (let el of _selectedTnr.tnr_info) {
      const img = el[0];
      if (img === image) {
        isTnr = el[1];
        break;
      }
    }

    // 중성화된 고양이라면 tnr_count 감소하기
    if (isTnr && _selectedTnr.tnr_count > 0) _selectedTnr.tnr_count--;

    // 클러스터 개수 감소하기
    if (_selectedTnr.num_clusters > 0) _selectedTnr.num_clusters--;

    // 대표이미지에서 제거하기
    _selectedTnr.representative_images = _selectedTnr.representative_images.filter((el: any) => {
      return el[1] !== image;
    });

    // tnr_info에서 제거하기
    _selectedTnr.tnr_info = _selectedTnr.tnr_info.filter((el: any) => {
      return el[0] !== image;
    });

    // 반영하기
    _selectedTnr.status = 1;
    setSelectedTnr(_selectedTnr);
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
    })
      .then((result) => {
        if (result.isConfirmed) {
          // 대표 고양이 사진으로 추가하는 로직
          removeRepresentative();

          // Okay
          Toast.fire({
            icon: "success",
            title: "해당 대표 고양이를 삭제하였습니다.",
          });
        }
      })
      .finally(close);
  };

  const handleOkClick = () => {
    const image = selectedIotImage.img;
    let _selectedTnr = JSON.parse(JSON.stringify(selectedTnr));

    // tnr_info 변경하기
    let isDiff = false;
    for (let el of _selectedTnr.tnr_info) {
      if (el[0] !== image) continue;

      // 변경사항이 있는지
      if (el[1] !== neutered) isDiff = true;
      el[1] = neutered;
      break;
    }

    // 중성화 개체수 증가 및 감소하기
    if (isDiff) {
      let count = _selectedTnr.tnr_count;
      _selectedTnr.tnr_count = neutered ? count + 1 : count > 0 ? count - 1 : 0;
    }

    // 반영하기
    _selectedTnr.status = 1;
    setSelectedTnr(_selectedTnr);

    close();
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
              <img src={tnrInfo.img} className="w-full h-full" alt="cat" />
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
                <img src={tnrImage} width="250px" height="250px" alt="cat" />
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
              onClick={handleOkClick}
            >
              완료
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
