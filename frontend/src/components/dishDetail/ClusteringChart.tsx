import React, { useEffect, useState, useRef } from "react";
import * as d3 from 'd3';
import { useRecoilState } from "recoil";
import "css/Cluster.css";
import ClusteringChartImage from "./ClusteringChartImage";
import ClusteringChartModal from "./ClusteringChartModal";
import Swal from "sweetalert2";
import { darkState } from "recoil/page";
import { Cluster } from "types";

type Props = {
  data?: Cluster;
};

export default function ClusteringChart({ data }: Props) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const isDark = useRecoilState(darkState)[0];

  const openModal = () => {
    setModalOpen(true);
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

        // Okay
        Toast.fire({
          icon: "success",
          title: "대표 고양이로 추가되었습니다.",
        });

        // close modal
        setModalOpen(false);
      }
    });
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
  }, [resultRef.current]);

  return (
    <div className="w-full h-full gap-1">
      <div className="w-full h-full">
        <h1 className="text-[1.3rem] font-bold" >클러스터링 결과</h1>
        <div className="w-full h-[calc(100%-30px)]" ref={resultRef}></div>
      </div>
      <ClusteringChartModal okay={modalOkay} open={modalOpen} close={closeModal} header="대표 고양이 추가">
        <ClusteringChartImage selectedImg={selectedImg} />
      </ClusteringChartModal>
    </div>
  );
}
