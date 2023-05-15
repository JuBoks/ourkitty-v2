import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { useRecoilState } from "recoil";
import { selectedButtonState, selectedDateState } from "../../recoil/chart";
import { useQuery } from "react-query";
import { getClusterInfo } from "apis/api/cluster";

export default function ClusteringChart() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [selectedButton, setSelectedButton] = useRecoilState(selectedDateState);
  const [selectedDish, setSelectedDish] = useRecoilState(selectedButtonState);

  // 클러스터 정보 가져오기
  const dishSerialNum = "EZZwEhRzzs9LvyZ";
  const dishDate = "2023-05-10";
  const { data, isLoading } = useQuery({
    queryKey: ["getClusterInfo", dishSerialNum, dishDate],
    queryFn: () => getClusterInfo(dishSerialNum, dishDate),
  });

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

      // 이미지 파일 로드
      // const image = svg.append("svg:image")
      //   .attr("xlink:href", "point.png")
      //   .attr("width", 60)
      //   .attr("height", 80);

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
          // 클릭 이벤트 핸들러 함수
          console.log("click!", d)
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
        {/* <div>{selectedButton}, {selectedDish}</div> */}
        <div className="w-full h-[calc(100%-30px)]" ref={resultRef}></div>
      </div>
    </div>
  );
}
