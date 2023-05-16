import React, { useEffect, useState, useRef } from "react";
import * as d3 from 'd3';
import { useRecoilState } from "recoil";
import "css/Cluster.css";
import ClusteringChartImage from "./ClusteringChartImage";
import ClusteringChartModal from "./ClusteringChartModal";
import Swal from "sweetalert2";
import { darkState } from "recoil/page";
import { Cluster, ClusterFeature } from "types";
import { ClusterModifyRequest, ClusterRepresentative } from "types/Clusters";
import { selectedClusterOriginalState, selectedClusterState, selectedDateState, selectedSerialNumberState } from "recoil/chart";
import { useMutation } from "react-query";
import { getClusterInfo, modifyClusterInfo } from "apis/api/cluster";

type Props = {
  data?: Cluster;
};

export default function ClusteringChart({ data }: Props) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<ClusterFeature>();
  const [tnrRadioValue, setTnrRadioValue] = useState("no-tnr");
  const [selectedCluster, setSelectedCluster] = useRecoilState(selectedClusterState);
  const [selectedClusterOriginal, setSelectedClusterOriginal] = useRecoilState(selectedClusterOriginalState);
  const [selectedButton, setSelectedButton] = useRecoilState(selectedDateState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(selectedSerialNumberState);
  const isDark = useRecoilState(darkState)[0];

  const openModal = () => {
    setModalOpen(true);
    setTnrRadioValue("no-tnr")
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const Toast = Swal.mixin({
    toast: true, // 토스트 형식
    position: "bottom-end", // 알림 위치
    showConfirmButton: false, // 확인버튼 생성 유무
    timer: 1500, // 지속 시간
    timerProgressBar: true, // 지속시간바 생성 여부
    background: isDark ? "#262D33" : "white",
    color: isDark ? "white" : "black",
  });

  const modalOkay = () => {
    Swal.fire({
      title: "대표 고양이로 등록하시겠습니까?",
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
        let isSuccess = addRepresentative();

        if (!isSuccess) {
          Swal.fire('이미 대표로 추가된 사진입니다.', '', 'error');
          return;
        }

        // Okay
        Toast.fire({
          icon: "success",
          title: "대표 고양이로 추가되었습니다.",
        });

        console.log('[modified] clusterData', selectedCluster)
      }
    }).finally(() => {
      // close modal
      setModalOpen(false);
    });
  }

  const modifyCluster = useMutation(
    ["modifyClusterInfo"],
    (body: ClusterModifyRequest) => modifyClusterInfo(body),
    {
      onSuccess: () => {
        console.log("Success!!!")
      }
    }
  )

  const addRepresentative = async () => {
    // 1. 해당 이미지의 url이 이미 추가된 url인지 확인
    console.log('selectedImg', selectedImg)
    console.log('clusterData', selectedCluster)
    if (selectedImg && selectedCluster) {
      for (let el of selectedCluster.represetatives) {
        if (el.image === selectedImg.image) {
          return false;
        }
      }
    }

    // 2. 추가된 것이 아니면 representatives에 해당 이미지 추가
    if (selectedImg) {
      let _selectedCluster: Cluster = { ...selectedCluster, represetatives: [...selectedCluster.represetatives] };
      _selectedCluster?.represetatives.push({
        cls: selectedImg.cls,
        image: selectedImg.image,
      });
      setSelectedCluster(_selectedCluster);
    }

    // 3. 추가된 고양이로 update
    let _selectedOriginal = {
      ...selectedClusterOriginal,
      representative_images: [...selectedClusterOriginal.representative_images],
      file_feature_info: [...selectedClusterOriginal.file_feature_info],
      closest_images: [...selectedClusterOriginal.closest_images],
      tnr_info: [...selectedClusterOriginal.tnr_info],
    }

    if (selectedImg) {
      let isTnr = tnrRadioValue === "no-tnr" ? false : true;
      // 1) status: 1
      _selectedOriginal.status = 1;
      // 2) tnr_info
      _selectedOriginal.tnr_info.push([selectedImg.image, isTnr]);
      // 3) tnr_count
      if (isTnr) {
        _selectedOriginal.tnr_count++;
      }
      // 3) representative_images
      _selectedOriginal.representative_images.push(
        [_selectedOriginal.num_clusters, selectedImg.image]
      );
      _selectedOriginal.num_clusters++;

      const body: ClusterModifyRequest = {
        serial_number: 'string',
        date: 'string',
        result: _selectedOriginal,
      };
      modifyCluster.mutate(body);
      console.log("updateing...", _selectedOriginal)
    }

    // 4. get cluster info
    const response = await getClusterInfo(selectedSerialNumber, selectedButton)
    console.log("Updated!! >> ", response);

    return true;
  }


  useEffect(() => {
    // 초기화
    const result = d3.select(resultRef.current);
    result.selectAll("svg").remove(); // SVG 요소를 모두 삭제

    const width = resultRef.current?.clientWidth; // 너비 가져오기
    const height = resultRef.current?.clientHeight; // 높이 가져오기

    if (data && width && height) {
      const xScale = d3.scaleLinear()
        .domain([0, data.width])
        .range([0, width - 100]);

      const yScale = d3.scaleLinear()
        .domain([0, data.height])
        .range([height - 120, 0]);

      // scatter plot 생성
      const svg = d3.select(resultRef.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

      // 데이터 점 생성
      const points = svg.selectAll("image")
        .data(data.features)
        .enter()
        .append("image")
        .attr("x", function (d) { return xScale(d.x); })
        .attr("y", function (d) { return yScale(d.y); })
        .attr("xlink:href", function (d) { return d.image; })
        .attr("width", 100)
        .attr("height", 120)
        .on("click", function (d) {
          // 1. selected image 갱신
          setSelectedImg(d.target.__data__);
          // imgsrc = d.target.__data__.image;
          openModal();
        })
        .on("mouseover", function () {
          d3.select(this).classed("hovered", true);
        })
        .on("mouseout", function () {
          d3.select(this).classed("hovered", false);
        });
    }
  }, [resultRef.current, selectedCluster]);

  return (
    <div className="w-full h-full gap-1">
      <div className="w-full h-full">
        <h1 className="text-[1.3rem] font-bold" >클러스터링 결과: {data?.clusters}마리</h1>
        <div className="w-full h-[calc(100%-30px)]" ref={resultRef}></div>
      </div>
      <ClusteringChartModal okay={modalOkay} open={modalOpen} close={closeModal} header="대표 고양이 추가">
        <ClusteringChartImage selectedImg={selectedImg} />
        <div className="flex flex-row">
          <div className="w-[50%] flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input checked={tnrRadioValue === 'no-tnr'} onChange={() => setTnrRadioValue('no-tnr')} id="bordered-radio-2" type="radio" value="no-tnr" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">중성화가 진행되지 않은 고양이입니다.</label>
          </div>
          <div className="w-[50%] flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input checked={tnrRadioValue === 'tnr'} onChange={() => setTnrRadioValue('tnr')} id="bordered-radio-1" type="radio" value="tnr" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="bordered-radio-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">중성화 된 고양이입니다.</label>
          </div>
        </div>
      </ClusteringChartModal>
    </div>
  );
}
